import React from 'react';
import { styles } from './styles';

const FavoritesList = ({ favorites, onCryptoClick }) => {
  if (!favorites || favorites.length === 0) {
    return (
      <div style={styles.card}>
        <p style={{ textAlign: 'center', color: '#666' }}>
          ⭐ No favorites yet. Click the ⭐ on any crypto to add!
        </p>
      </div>
    );
  }

  return (
    <div style={styles.card}>
      <h3 style={{ marginBottom: '15px' }}>⭐ Your Favorites</h3>
      <div style={styles.cryptoGrid}>
        {favorites.map(crypto => (
          <div
            key={crypto.id}
            style={{
              ...styles.card,
              cursor: 'pointer',
              padding: '10px',
              marginBottom: '0'
            }}
            onClick={() => onCryptoClick(crypto)}
          >
            <div style={styles.coinInfo}>
              <img src={crypto.image} alt={crypto.name} style={styles.coinIcon} />
              <div>
                <h4 style={{ margin: 0 }}>{crypto.name}</h4>
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                  {crypto.symbol.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;