import React, { memo } from 'react';
import { styles } from './styles';

const CryptoCard = memo(({ crypto, onClick, isFavorite, onFavoriteClick }) => {
  const priceChange = crypto.price_change_percentage_24h || 0;
  const isPositive = priceChange >= 0;

  // Bull 📈 (up) or Bear 📉 (down) symbol
  const MarketSymbol = () => {
    if (isPositive) {
      return (
        <span style={{ ...styles.marketIcon, ...styles.bullIcon }} title="Bull Market (Up)">
          📈
        </span>
      );
    } else {
      return (
        <span style={{ ...styles.marketIcon, ...styles.bearIcon }} title="Bear Market (Down)">
          📉
        </span>
      );
    }
  };

  return (
    <div style={styles.cardWrapper}>
      <div style={styles.card} onClick={() => onClick(crypto)}>
        <div style={styles.coinHeader}>
          <div style={styles.coinInfo}>
            <img src={crypto.image} alt={crypto.name} style={styles.coinIcon} />
            <div style={styles.coinText}>
              <h3 style={styles.coinName}>{crypto.name}</h3>
              <span style={styles.coinSymbol}>{crypto.symbol.toUpperCase()}</span>
            </div>
          </div>
          <div style={styles.priceChangeBadge}>
            <span
              style={{
                ...styles.priceChange,
                ...(isPositive ? styles.positive : styles.negative)
              }}
            >
              {isPositive ? '▲' : '▼'} {Math.abs(priceChange).toFixed(2)}%
            </span>
            <MarketSymbol />
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
          <div style={styles.statRow}>
            <span style={styles.statLabel}>Market Cap:</span>
            <span style={styles.statValue}>${crypto.market_cap?.toLocaleString()}</span>
          </div>
          <div style={styles.statRow}>
            <span style={styles.statLabel}>24h Volume:</span>
            <span style={styles.statValue}>${crypto.total_volume?.toLocaleString()}</span>
          </div>
          <div style={styles.statRow}>
            <span style={styles.statLabel}>Supply:</span>
            <span style={styles.statValue}>{crypto.circulating_supply?.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {onFavoriteClick && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteClick(crypto);
          }}
          style={{
            ...styles.starButton,
            color: isFavorite ? '#ffc107' : '#ddd'
          }}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          ★
        </button>
      )}
    </div>
  );
});

export default CryptoCard;