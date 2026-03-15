import { useEffect, useState } from 'react';
import { getBitcoinPrice } from './services/cryptoAPI';

function App() {
  const [priceUSD, setPriceUSD] = useState(null);
  const [priceINR, setPriceINR] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBitcoinPrice()
      .then(data => {
        console.log('API Response:', data);
        setPriceUSD(data.bitcoin.usd);
        setPriceINR(data.bitcoin.inr);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>💰 Cryptocurrency Price Tracker</h1>
      
      {loading ? (
        <p>Loading prices...</p>
      ) : (
        <div style={{
          border: '1px solid #ccc',
          padding: '20px',
          borderRadius: '10px',
          maxWidth: '400px'
        }}>
          <h2>Bitcoin (BTC)</h2>
          <p>US USD: <strong>${priceUSD?.toLocaleString()}</strong></p>
          <p>IND INR: <strong>₹{priceINR?.toLocaleString()}</strong></p>
        </div>
      )}
    </div>
  );
}

export default App;