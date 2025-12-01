import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import DashboardPage from '@/app/dashboard/page';

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
    
    await waitFor(() => {
      expect(screen.getAllByText('Test User').length).toBeGreaterThan(0);
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });
    
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
      expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    });
  });

  it('switches to edit mode when edit button is clicked', async () => {
    localStorage.getItem.mockReturnValue('mock_token_123');
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: mockUser }),
    });
    
    render(<DashboardPage />);
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    });
    
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    });
    
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
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    });
    
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    });
    
    await waitFor(() => {
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });
    
    await act(async () => {
      fireEvent.click(screen.getByText('Cancel'));
    });
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    });
  });

  it('displays loading spinner while fetching data', () => {
    localStorage.getItem.mockReturnValue('mock_token_123');
    
    fetch.mockImplementation(() => new Promise(() => {}));
    
    render(<DashboardPage />);
    
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });
});
