import React from 'react';
import { styles } from './styles';

const Header = ({ lastUpdated }) => {
  return (
    <div style={styles.header}>
      <h1 style={styles.title}>
        🚀 Cryptocurrency Price Tracker
      </h1>
      <p style={styles.subtitle}>
        Real-time cryptocurrency prices, charts, and market data
      </p>
      {lastUpdated && (
        <p style={styles.lastUpdated}>
          Last Updated: {new Date(lastUpdated).toLocaleTimeString()}
        </p>
      )}
    </div>
  );
};

export default Header;