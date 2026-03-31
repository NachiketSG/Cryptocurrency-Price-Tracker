const API_KEY = 'CG-qGTVkcp7DGtJx9svMkiF4KtM';
const BASE_URL = 'https://api.coingecko.com/api/v3';

// Helper function for API calls
const fetchWithKey = async (url) => {
  try {
    const response = await fetch(url, {
      headers: {
        'x-cg-demo-api-key': API_KEY,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.warn('Rate limit hit, waiting 60 seconds...');
        await new Promise(resolve => setTimeout(resolve, 60000));
        return fetchWithKey(url);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API call failed:', error);
    return null;
  }
};

// Get top cryptocurrencies
export const getTopCryptos = async (perPage = 100) => {
  const url = `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false&price_change_percentage=24h`;
  return await fetchWithKey(url);
};

// Get historical data for any coin
export const getHistoricalData = async (coinId, days = 7) => {
  try {
    const options = {
      method: 'GET',
      headers: {
        'x-cg-demo-api-key': API_KEY,
        'Content-Type': 'application/json'
      }
    };

    const response = await fetch(
      `${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
      options
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    return null;
  }
};

// Get Bitcoin historical data
export const getBitcoinHistoricalData = async (days = 7) => {
  return await getHistoricalData('bitcoin', days);
};

// Get multiple coins prices
export const getMultiplePrices = async (coinIds = 'bitcoin,ethereum,dogecoin') => {
  const url = `${BASE_URL}/simple/price?ids=${coinIds}&vs_currencies=usd,inr&include_24hr_change=true`;
  return await fetchWithKey(url);
};