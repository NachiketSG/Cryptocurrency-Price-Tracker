// API Key - Teri apni key
const API_KEY = 'CG-qGTVkcp7DGtJx9svMkiF4KtM';

// Base URL
const BASE_URL = 'https://api.coingecko.com/api/v3';

// 1. Real-time price for single coin (USD & INR)
export const getBitcoinPrice = async () => {
  try {
    const options = {
      method: 'GET',
      headers: {
        'x-cg-demo-api-key': API_KEY,
        'Content-Type': 'application/json'
      }
    };

    const response = await fetch(
      `${BASE_URL}/simple/price?ids=bitcoin&vs_currencies=usd,inr`,
      options
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Real-time Price:', data);
    return data;
  } catch (error) {
    console.error('❌ Error fetching price:', error);
    return null;
  }
};

// 2. Multiple coins real-time price
export const getMultiplePrices = async (coinIds = 'bitcoin,ethereum,dogecoin') => {
  try {
    const options = {
      method: 'GET',
      headers: {
        'x-cg-demo-api-key': API_KEY,
        'Content-Type': 'application/json'
      }
    };

    const response = await fetch(
      `${BASE_URL}/simple/price?ids=${coinIds}&vs_currencies=usd,inr`,
      options
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Multiple Coins Prices:', data);
    return data;
  } catch (error) {
    console.error('❌ Error fetching multiple prices:', error);
    return null;
  }
};

// 3. Historical data for Bitcoin
export const getBitcoinHistoricalData = async (days = 7) => {
  try {
    const options = {
      method: 'GET',
      headers: {
        'x-cg-demo-api-key': API_KEY,
        'Content-Type': 'application/json'
      }
    };

    const response = await fetch(
      `${BASE_URL}/coins/bitcoin/market_chart?vs_currency=usd&days=${days}`,
      options
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`✅ Historical Data (${days} days):`, data);
    console.log(`📊 Total price points:`, data.prices.length);
    console.log(`📈 Latest price: $${data.prices[data.prices.length - 1][1]}`);
    return data;
  } catch (error) {
    console.error('❌ Error fetching historical data:', error);
    return null;
  }
};

// 4. Get list of top cryptocurrencies
export const getTopCryptos = async (perPage = 10) => {
  try {
    const options = {
      method: 'GET',
      headers: {
        'x-cg-demo-api-key': API_KEY,
        'Content-Type': 'application/json'
      }
    };

    const response = await fetch(
      `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false`,
      options
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Top Cryptocurrencies:', data);
    return data;
  } catch (error) {
    console.error('❌ Error fetching top cryptos:', error);
    return null;
  }
};