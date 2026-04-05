import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div style={styles.container}>
      <div style={styles.searchBox}>
        <span style={styles.searchIcon}>🔍</span>
        <input
          type="text"
          placeholder="Search cryptocurrency by name or symbol..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            style={styles.clearButton}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    marginBottom: '20px'
  },
  searchBox: {
    position: 'relative',
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto'
  },
  searchIcon: {
    position: 'absolute',
    left: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '18px',
    color: '#999',
    pointerEvents: 'none'
  },
  input: {
    width: '100%',
    padding: '12px 40px 12px 45px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '25px',
    outline: 'none',
    transition: 'all 0.3s',
    backgroundColor: 'white',
    boxSizing: 'border-box'
  },
  clearButton: {
    position: 'absolute',
    right: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    color: '#999',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

// Add hover effect
styles.input[':focus'] = {
  borderColor: '#667eea',
  boxShadow: '0 0 0 2px rgba(102,126,234,0.2)'
};

export default SearchBar;