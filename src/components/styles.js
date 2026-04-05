export const styles = {
  // App Container
  appContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: 'Arial, sans-serif'
  },
  
  mainContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (max-width: 768px)': {
      padding: '10px'
    }
  },
  
  headerSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '10px',
    width: '100%',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'stretch'
    }
  },
  
  header: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    padding: '20px',
    marginBottom: '30px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center',
    width: '100%',
    '@media (max-width: 768px)': {
      padding: '15px',
      marginBottom: '15px'
    }
  },
  
  title: {
    margin: 0,
    fontSize: '2.5em',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    '@media (max-width: 768px)': {
      fontSize: '1.8em'
    }
  },
  
  subtitle: {
    fontSize: '14px',
    color: '#0f0707',
    marginTop: '10px',
    '@media (max-width: 768px)': {
      fontSize: '14px'
    }
  },
  
  lastUpdated: {
    fontSize: '14px',
    color: '#666',
    marginTop: '10px'
  },
  
  // Crypto Grid - Centered properly
  cryptoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'start',
    '@media (min-width: 769px) and (max-width: 1024px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '18px'
    },
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '15px'
    }
  },
  
  // Card Wrapper
  cardWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  
  // Card
  card: {
    background: 'white',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: '220px',
    overflow: 'hidden',
    wordWrap: 'break-word',
    wordBreak: 'break-word',
    width: '100%',
    '@media (max-width: 768px)': {
      padding: '15px',
      minHeight: '200px'
    }
  },
  
  coinHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '15px',
    flexWrap: 'wrap',
    gap: '8px',
    paddingRight: '35px',
    '@media (max-width: 768px)': {
      paddingRight: '30px'
    }
  },
  
  coinInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flex: 1,
    minWidth: 0,
    overflow: 'hidden'
  },
  
  coinIcon: {
    width: '40px',
    height: '40px',
    flexShrink: 0,
    '@media (max-width: 768px)': {
      width: '32px',
      height: '32px'
    }
  },
  
  coinText: {
    flex: 1,
    minWidth: 0,
    overflow: 'hidden'
  },
  
  coinName: {
    fontSize: '1.2em',
    fontWeight: 'bold',
    margin: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '@media (max-width: 768px)': {
      fontSize: '1em'
    }
  },
  
  coinSymbol: {
    color: '#999',
    fontSize: '0.9em',
    display: 'block',
    '@media (max-width: 768px)': {
      fontSize: '0.8em'
    }
  },
  
  priceChangeBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    flexShrink: 0
  },
  
  priceChange: {
    fontSize: '0.9em',
    padding: '3px 8px',
    borderRadius: '20px',
    display: 'inline-block',
    whiteSpace: 'nowrap'
  },
  
  positive: {
    color: '#00c853',
    backgroundColor: 'rgba(0,200,83,0.1)'
  },
  
  negative: {
    color: '#ff3b30',
    backgroundColor: 'rgba(255,59,48,0.1)'
  },
  
  chartIcon: {
    fontSize: '18px',
    cursor: 'pointer',
    flexShrink: 0,
    '@media (max-width: 768px)': {
      fontSize: '16px'
    }
  },
  
  priceContainer: {
    marginBottom: '15px'
  },
  
  priceUSD: {
    fontSize: '1.8em',
    fontWeight: 'bold',
    color: '#333',
    margin: '5px 0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '@media (max-width: 768px)': {
      fontSize: '1.4em'
    }
  },
  
  priceINR: {
    fontSize: '1.2em',
    color: '#666',
    margin: '5px 0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '@media (max-width: 768px)': {
      fontSize: '1em'
    }
  },
  
  marketStats: {
    borderTop: '1px solid #eee',
    paddingTop: '10px',
    marginTop: 'auto',
    fontSize: '0.85em',
    color: '#666'
  },
  
  statRow: {
    marginBottom: '5px',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '5px'
  },
  
  statLabel: {
    fontWeight: 'bold',
    color: '#888',
    flexShrink: 0
  },
  
  statValue: {
    color: '#333',
    textAlign: 'right',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  
  // Star Button
  starButton: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'none',
    border: 'none',
    fontSize: '22px',
    cursor: 'pointer',
    zIndex: 10,
    padding: '5px',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'all 0.2s',
    '@media (max-width: 768px)': {
      top: '10px',
      right: '10px',
      fontSize: '18px',
      width: '28px',
      height: '28px'
    }
  },
  
  // Filter & Sort Bar
  filterSortBar: {
    background: 'white',
    borderRadius: '15px',
    padding: '20px',
    marginBottom: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'stretch',
      padding: '15px',
      gap: '12px'
    }
  },
  
  filterGroup: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    '@media (max-width: 768px)': {
      justifyContent: 'center',
      gap: '8px'
    }
  },
  
  sortGroup: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      justifyContent: 'space-between',
      width: '100%'
    }
  },
  
  sortLabel: {
    fontSize: '14px',
    color: '#666',
    '@media (max-width: 768px)': {
      fontSize: '12px'
    }
  },
  
  select: {
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    cursor: 'pointer',
    backgroundColor: 'white',
    '@media (max-width: 768px)': {
      padding: '6px 10px',
      fontSize: '12px',
      flex: 1
    }
  },
  
  button: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#667eea',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background 0.3s',
    '@media (max-width: 768px)': {
      padding: '6px 12px',
      fontSize: '12px'
    }
  },
  
  activeButton: {
    backgroundColor: '#764ba2'
  },
  
  authButtons: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    flexWrap: 'wrap',
    '@media (max-width: 768px)': {
      justifyContent: 'center',
      width: '100%'
    }
  },
  
  userInfo: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    flexWrap: 'wrap',
    '@media (max-width: 768px)': {
      justifyContent: 'center'
    }
  },
  
  userName: {
    fontSize: '14px',
    color: '#0b0404',
    '@media (max-width: 768px)': {
      fontSize: '20px'
    }
  },
  
  favoritesButton: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#ffc107',
    color: '#333',
    cursor: 'pointer',
    fontSize: '14px',
    '@media (max-width: 768px)': {
      padding: '6px 12px',
      fontSize: '12px'
    }
  },
  
  activeFavoritesButton: {
    backgroundColor: '#764ba2',
    color: 'white'
  },
  
  logoutButton: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#dc3545',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    '@media (max-width: 768px)': {
      padding: '6px 12px',
      fontSize: '12px'
    }
  },
  
  chartContainer: {
    background: 'white',
    borderRadius: '15px',
    padding: '20px',
    marginBottom: '30px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    width: '100%',
    '@media (max-width: 768px)': {
      padding: '10px'
    }
  },
  
  chartTitle: {
    marginTop: 0,
    marginBottom: '20px',
    color: '#333',
    '@media (max-width: 768px)': {
      fontSize: '1.2em',
      marginBottom: '10px'
    }
  },
  
  chartControls: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap',
    '@media (max-width: 768px)': {
      gap: '8px',
      justifyContent: 'center'
    }
  },
  
  timeButton: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s',
    '@media (max-width: 768px)': {
      padding: '6px 12px',
      fontSize: '12px'
    }
  },
  
  activeTimeButton: {
    backgroundColor: '#667eea',
    color: 'white',
    borderColor: '#667eea'
  },
  
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px'
  },
  
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #667eea',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  
  errorMessage: {
    background: '#ff4444',
    color: 'white',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center',
    fontSize: '14px',
    width: '100%'
  },
  
  favoritesSection: {
    marginBottom: '20px',
    width: '100%'
  }
};