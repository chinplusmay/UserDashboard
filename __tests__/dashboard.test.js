/**
 * Dashboard Page Unit Tests
 * Tests for the dashboard functionality
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DashboardPage from '@/app/dashboard/page';

// Mock fetch API
global.fetch = jest.fn();

describe('Dashboard Page', () => {
  const mockUser = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('redirects to login if no token is present', async () => {
    localStorage.getItem.mockReturnValue(null);
    
    render(<DashboardPage />);
    
    // Should show loading initially then redirect
    await waitFor(() => {
      expect(localStorage.getItem).toHaveBeenCalledWith('token');
    });
  });

  it('fetches and displays user data when authenticated', async () => {
    localStorage.getItem.mockReturnValue('mock_token_123');
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: mockUser }),
    });
    
    render(<DashboardPage />);
    
    // Wait for user data to load
    await waitFor(() => {
      expect(screen.getByText('Test User')).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });
    
    // Check API was called with correct headers
    expect(fetch).toHaveBeenCalledWith('/api/user', {
      headers: { 'Authorization': 'Bearer mock_token_123' },
    });
  });

  it('displays "My Profile" heading', async () => {
    localStorage.getItem.mockReturnValue('mock_token_123');
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: mockUser }),
    });
    
    render(<DashboardPage />);
    
    await waitFor(() => {
      expect(screen.getByText('My Profile')).toBeInTheDocument();
    });
  });

  it('shows edit button when not in editing mode', async () => {
    localStorage.getItem.mockReturnValue('mock_token_123');
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: mockUser }),
    });
    
    render(<DashboardPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    });
  });

  it('switches to edit mode when edit button is clicked', async () => {
    localStorage.getItem.mockReturnValue('mock_token_123');
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: mockUser }),
    });
    
    render(<DashboardPage />);
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    });
    
    // Click edit button
    fireEvent.click(screen.getByText('Edit Profile'));
    
    // Should show save and cancel buttons
    await waitFor(() => {
      expect(screen.getByText('Save Changes')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });
  });

  it('cancels edit mode and restores original data', async () => {
    localStorage.getItem.mockReturnValue('mock_token_123');
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: mockUser }),
    });
    
    render(<DashboardPage />);
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    });
    
    // Click edit button
    fireEvent.click(screen.getByText('Edit Profile'));
    
    // Click cancel button
    await waitFor(() => {
      fireEvent.click(screen.getByText('Cancel'));
    });
    
    // Should return to view mode
    await waitFor(() => {
      expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    });
  });

  it('saves updated profile data', async () => {
    localStorage.getItem.mockReturnValue('mock_token_123');
    
    // Initial fetch
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: mockUser }),
    });
    
    // Update fetch
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        user: { ...mockUser, name: 'Updated Name' },
      }),
    });
    
    render(<DashboardPage />);
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    });
    
    // Click edit button
    fireEvent.click(screen.getByText('Edit Profile'));
    
    // Wait for edit mode
    await waitFor(() => {
      expect(screen.getByText('Save Changes')).toBeInTheDocument();
    });
    
    // Click save button
    fireEvent.click(screen.getByText('Save Changes'));
    
    // Wait for API call
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });

  it('displays loading spinner while fetching data', () => {
    localStorage.getItem.mockReturnValue('mock_token_123');
    
    // Don't resolve the fetch immediately
    fetch.mockImplementation(() => new Promise(() => {}));
    
    render(<DashboardPage />);
    
    // Should show loading spinner (the div with animate-spin class)
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('handles API error during profile update', async () => {
    localStorage.getItem.mockReturnValue('mock_token_123');
    
    // Initial fetch
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: mockUser }),
    });
    
    // Update fetch fails
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Update failed' }),
    });
    
    render(<DashboardPage />);
    
    // Wait for data to load and enter edit mode
    await waitFor(() => {
      expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Edit Profile'));
    
    await waitFor(() => {
      fireEvent.click(screen.getByText('Save Changes'));
    });
    
    // Should show error message
    await waitFor(() => {
      expect(screen.getByText('Update failed')).toBeInTheDocument();
    });
  });
});

