import React, { useEffect, useState } from 'react';
import { 
  getBitcoinPrice, 
  getMultiplePrices, 
  getBitcoinHistoricalData,
  getTopCryptos 
} from './services/cryptoAPI';

function App() {
  const [loading, setLoading] = useState(true);
  const [bitcoinPrice, setBitcoinPrice] = useState({ usd: null, inr: null });
  const [multiplePrices, setMultiplePrices] = useState({});
  const [historicalData, setHistoricalData] = useState(null);
  const [topCryptos, setTopCryptos] = useState([]);

  useEffect(() => {
    // Sabhi API calls ek saath karte hain
    const fetchAllData = async () => {
      setLoading(true);
      
      try {
        // 1. Bitcoin price (USD & INR)
        const btcPrice = await getBitcoinPrice();
        if (btcPrice && btcPrice.bitcoin) {
          setBitcoinPrice({
            usd: btcPrice.bitcoin.usd,
            inr: btcPrice.bitcoin.inr
          });
        }

        // 2. Multiple coins prices
        const multiPrices = await getMultiplePrices();
        if (multiPrices) {
          setMultiplePrices(multiPrices);
        }

        // 3. Historical data (7 days)
        const history = await getBitcoinHistoricalData(7);
        if (history) {
          setHistoricalData(history);
        }

        // 4. Top 10 cryptocurrencies
        const top10 = await getTopCryptos(10);
        if (top10) {
          setTopCryptos(top10);
        }

      } catch (error) {
        console.error('Error in fetchAllData:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();

    // Har 60 second mein data refresh karo (real-time effect ke liye)
    const interval = setInterval(() => {
      console.log('🔄 Refreshing data...');
      fetchAllData();
    }, 60000); // 60 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Historical data se pichle 7 din ki prices nikalna
  const getLastSevenDaysPrices = () => {
    if (!historicalData || !historicalData.prices) return [];
    
    // Sirf 7 din ke prices chahiye
    const prices = historicalData.prices;
    const last7Days = [];
    
    for (let i = prices.length - 8; i < prices.length; i++) {
      if (i >= 0) {
        const date = new Date(prices[i][0]).toLocaleDateString();
        const price = prices[i][1];
        last7Days.push({ date, price });
      }
    }
    
    return last7Days;
  };

  const lastSevenDays = getLastSevenDaysPrices();

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>💰 Cryptocurrency Price Tracker</h1>
      
      {loading ? (
        <div style={styles.loading}>
          <h2>Loading cryptocurrency data...</h2>
          <p>Fetching from CoinGecko API 🔄</p>
        </div>
      ) : (
        <>
          {/* Bitcoin Price Card */}
          <div style={styles.card}>
            <h2 style={styles.coinTitle}>Bitcoin (BTC)</h2>
            <div style={styles.priceContainer}>
              <div style={styles.priceBox}>
                <span style={styles.currency}>🇺🇸 USD</span>
                <span style={styles.price}>${bitcoinPrice.usd?.toLocaleString()}</span>
              </div>
              <div style={styles.priceBox}>
                <span style={styles.currency}>🇮🇳 INR</span>
                <span style={styles.price}>₹{bitcoinPrice.inr?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Multiple Coins Prices */}
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>🪙 Multiple Coins</h2>
            <div style={styles.coinsGrid}>
              {Object.keys(multiplePrices).map(coinId => (
                <div key={coinId} style={styles.coinItem}>
                  <h3 style={styles.coinName}>{coinId.toUpperCase()}</h3>
                  <p style={styles.coinPriceUSD}>${multiplePrices[coinId].usd?.toLocaleString()}</p>
                  <p style={styles.coinPriceINR}>₹{multiplePrices[coinId].inr?.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Historical Data (Last 7 Days) */}
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>📊 Bitcoin Historical Data (Last 7 Days)</h2>
            <div style={styles.historicalContainer}>
              {lastSevenDays.map((day, index) => (
                <div key={index} style={styles.historicalItem}>
                  <span style={styles.historicalDate}>{day.date}</span>
                  <span style={styles.historicalPrice}>${day.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top 10 Cryptocurrencies */}
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>🏆 Top 10 Cryptocurrencies</h2>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeader}>
                    <th>#</th>
                    <th>Coin</th>
                    <th>Symbol</th>
                    <th>Price (USD)</th>
                    <th>24h Change</th>
                  </tr>
                </thead>
                <tbody>
                  {topCryptos.map((crypto, index) => (
                    <tr key={crypto.id} style={styles.tableRow}>
                      <td>{index + 1}</td>
                      <td style={styles.coinInfo}>
                        <img src={crypto.image} alt={crypto.name} style={styles.coinIcon} />
                        {crypto.name}
                      </td>
                      <td>{crypto.symbol.toUpperCase()}</td>
                      <td>${crypto.current_price.toLocaleString()}</td>
                      <td style={{
                        color: crypto.price_change_percentage_24h > 0 ? '#00ff00' : '#ff0000'
                      }}>
                        {crypto.price_change_percentage_24h?.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Console Log Testing Message */}
          <div style={styles.consoleMessage}>
            <p>📢 Check Browser Console (F12) for detailed API responses</p>
          </div>
        </>
      )}
    </div>
  );
}

// Styles object
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh'
  },
  header: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px',
    fontSize: '2.5em'
  },
  loading: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '1.2em',
    color: '#666'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  coinTitle: {
    margin: '0 0 15px 0',
    color: '#f7931a',
    fontSize: '1.8em'
  },
  priceContainer: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap'
  },
  priceBox: {
    flex: '1',
    minWidth: '200px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    textAlign: 'center'
  },
  currency: {
    display: 'block',
    fontSize: '1.1em',
    color: '#666',
    marginBottom: '10px'
  },
  price: {
    display: 'block',
    fontSize: '1.8em',
    fontWeight: 'bold',
    color: '#333'
  },
  sectionTitle: {
    margin: '0 0 20px 0',
    color: '#444',
    fontSize: '1.5em'
  },
  coinsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px'
  },
  coinItem: {
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    textAlign: 'center'
  },
  coinName: {
    margin: '0 0 10px 0',
    color: '#666',
    fontSize: '1.2em'
  },
  coinPriceUSD: {
    margin: '5px 0',
    fontWeight: 'bold',
    color: '#28a745'
  },
  coinPriceINR: {
    margin: '5px 0',
    color: '#666'
  },
  historicalContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  historicalItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '5px'
  },
  historicalDate: {
    color: '#666'
  },
  historicalPrice: {
    fontWeight: 'bold',
    color: '#333'
  },
  tableContainer: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeader: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '12px',
    textAlign: 'left'
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
    '&:hover': {
      backgroundColor: '#f5f5f5'
    }
  },
  coinInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  coinIcon: {
    width: '24px',
    height: '24px'
  },
  consoleMessage: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#e7f3ff',
    borderRadius: '8px',
    marginTop: '20px',
    color: '#0066cc'
  }
};

export default App;