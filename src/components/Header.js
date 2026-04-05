import React from 'react';
import { styles } from './styles';

const Header = ({ lastUpdated }) => {
  const formatTime = (time) => {
    return new Date(time).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div style={styles.header}>
      <h1 style={styles.title}>
        Crypto{''}
        <span style={{WebkitTextFillColor:'initial'}}>💲</span>{''}
        Pulse
      </h1>

      <p style={styles.subtitle}>
        Introducing the Real-time Cryptocurrency Price Tracker, Charts, and Market Data
      </p>

      {lastUpdated && (
        <p style={styles.lastUpdated}>
          Last Updated: {formatTime(lastUpdated)}
        </p>
      )}
    </div>
  );
};

export default Header;