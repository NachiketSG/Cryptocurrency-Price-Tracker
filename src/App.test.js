import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock API calls
jest.mock('./services/cryptoAPI', () => ({
  getTopCryptos: jest.fn(),
  getHistoricalData: jest.fn()
}));

describe('Cryptocurrency Price Tracker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders app header', () => {
    render(<App />);
    const headerElement = screen.getByText(/Cryptocurrency Price Tracker/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('shows loading state initially', () => {
    render(<App />);
    const loadingElement = screen.getByText(/Loading/i);
    expect(loadingElement).toBeInTheDocument();
  });

  test('displays cryptocurrency data after loading', async () => {
    const mockCryptos = [
      { id: 'bitcoin', name: 'Bitcoin', symbol: 'btc', current_price: 50000 }
    ];
    
    const { getTopCryptos } = require('./services/cryptoAPI');
    getTopCryptos.mockResolvedValue(mockCryptos);

    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    });
  });

  test('filter functionality works', async () => {
    render(<App />);
    
    const filterButton = screen.getByText(/Gainers/i);
    userEvent.click(filterButton);
    
    await waitFor(() => {
      expect(filterButton).toHaveStyle({ backgroundColor: '#764ba2' });
    });
  });
});