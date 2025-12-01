/**
 * Login Page Unit Tests
 * Tests for the login form functionality
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '@/app/login/page';

// Mock fetch API
global.fetch = jest.fn();

describe('Login Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.getItem.mockReturnValue(null);
  });

  it('renders login form with all required inputs', () => {
    render(<LoginPage />);
    
    // Check for heading
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
    
    // Check for input fields
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    
    // Check for submit button
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    
    // Check for sign up link
    expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument();
  });

  it('displays validation errors for empty form submission', async () => {
    render(<LoginPage />);
    
    // Submit empty form
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);
    
    // Wait for validation errors
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
    });
  });

  it('displays validation error for invalid email', async () => {
    render(<LoginPage />);
    
    // Fill in invalid email
    const emailInput = screen.getByPlaceholderText('you@example.com');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    // Fill in valid password
    const passwordInput = screen.getByPlaceholderText('••••••••');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);
    
    // Wait for validation error
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
    });
  });

  it('displays validation error for short password', async () => {
    render(<LoginPage />);
    
    // Fill in valid email
    const emailInput = screen.getByPlaceholderText('you@example.com');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    // Fill in short password
    const passwordInput = screen.getByPlaceholderText('••••••••');
    fireEvent.change(passwordInput, { target: { value: '12345' } });
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);
    
    // Wait for validation error
    await waitFor(() => {
      expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data and handles success', async () => {
    // Mock successful API response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        token: 'mock_token_123',
        user: { id: '1', name: 'Test User', email: 'test@example.com' },
      }),
    });
    
    render(<LoginPage />);
    
    // Fill in valid credentials
    const emailInput = screen.getByPlaceholderText('you@example.com');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    const passwordInput = screen.getByPlaceholderText('••••••••');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);
    
    // Wait for API call
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com', password: 'password123' }),
      });
    });
    
    // Check token was stored
    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'mock_token_123');
    });
  });

  it('displays error message on failed login', async () => {
    // Mock failed API response
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Invalid email or password' }),
    });
    
    render(<LoginPage />);
    
    // Fill in credentials
    const emailInput = screen.getByPlaceholderText('you@example.com');
    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    
    const passwordInput = screen.getByPlaceholderText('••••••••');
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
    });
  });
});

