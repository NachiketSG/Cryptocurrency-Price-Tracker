import React from 'react';
import { styles } from './styles';

const CryptoCard = ({ crypto, onClick }) => {
  const priceChange = crypto.price_change_percentage_24h || 0;
  const isPositive = priceChange >= 0;

  return (
    <div style={styles.card} onClick={() => onClick(crypto)}>
      <div style={styles.coinHeader}>
        <div style={styles.coinInfo}>
          <img src={crypto.image} alt={crypto.name} style={styles.coinIcon} />
          <div>
            <h3 style={styles.coinName}>{crypto.name}</h3>
            <span style={styles.coinSymbol}>{crypto.symbol.toUpperCase()}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <span
            style={{
              ...styles.priceChange,
              ...(isPositive ? styles.positive : styles.negative)
            }}
          >
            {isPositive ? '▲' : '▼'} {Math.abs(priceChange).toFixed(2)}%
          </span>
          <span style={{ fontSize: '20px', marginLeft: '5px' }}>📈</span>
        </div>
      </div>

      <div style={styles.priceContainer}>
        <div style={styles.priceUSD}>
          ${crypto.current_price?.toLocaleString()}
        </div>
        <div style={styles.priceINR}>
          ₹{(crypto.current_price * 83).toLocaleString()}
        </div>
      </div>

      <div style={styles.marketStats}>
        <div>📊 Market Cap: ${crypto.market_cap?.toLocaleString()}</div>
        <div>📈 24h Volume: ${crypto.total_volume?.toLocaleString()}</div>
        <div>🔄 Supply: {crypto.circulating_supply?.toLocaleString()}</div>
      </div>
    </div>
  );
};

export default CryptoCard;