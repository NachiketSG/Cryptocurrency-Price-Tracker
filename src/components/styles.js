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
    padding: '20px'
  },
  
  // Header
  header: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    padding: '20px',
    marginBottom: '30px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  
  title: {
    margin: 0,
    fontSize: '2.5em',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  
  subtitle: {
    color: '#666',
    marginTop: '10px'
  },
  
  lastUpdated: {
    fontSize: '12px',
    color: '#999',
    marginTop: '10px'
  },
  
  // Crypto Grid
  cryptoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  
  // Card
  card: {
    background: 'white',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 12px rgba(0,0,0,0.15)'
    }
  },
  
  coinHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '15px'
  },
  
  coinInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  
  coinIcon: {
    width: '40px',
    height: '40px'
  },
  
  coinName: {
    fontSize: '1.2em',
    fontWeight: 'bold',
    margin: 0
  },
  
  coinSymbol: {
    color: '#999',
    fontSize: '0.9em'
  },
  
  priceContainer: {
    marginBottom: '15px'
  },
  
  priceUSD: {
    fontSize: '1.8em',
    fontWeight: 'bold',
    color: '#333',
    margin: '5px 0'
  },
  
  priceINR: {
    fontSize: '1.2em',
    color: '#666',
    margin: '5px 0'
  },
  
  priceChange: {
    fontSize: '0.9em',
    padding: '3px 8px',
    borderRadius: '20px',
    display: 'inline-block'
  },
  
  positive: {
    color: '#00ff00',
    backgroundColor: 'rgba(0,255,0,0.1)'
  },
  
  negative: {
    color: '#ff0000',
    backgroundColor: 'rgba(255,0,0,0.1)'
  },
  
  marketStats: {
    borderTop: '1px solid #eee',
    paddingTop: '10px',
    marginTop: '10px',
    fontSize: '0.85em',
    color: '#666'
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
    justifyContent: 'space-between'
  },
  
  filterGroup: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  
  sortGroup: {
    display: 'flex',
    gap: '10px'
  },
  
  select: {
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    cursor: 'pointer'
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
    '&:hover': {
      backgroundColor: '#5a67d8'
    }
  },
  
  activeButton: {
    backgroundColor: '#764ba2'
  },
  
  // Chart Container
  chartContainer: {
    background: 'white',
    borderRadius: '15px',
    padding: '20px',
    marginBottom: '30px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  
  chartTitle: {
    marginTop: 0,
    marginBottom: '20px',
    color: '#333'
  },
  
  chartControls: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  
  timeButton: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  
  activeTimeButton: {
    backgroundColor: '#667eea',
    color: 'white',
    borderColor: '#667eea'
  },
  
  // Loading Spinner
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
  
  // Responsive Design
  '@media (max-width: 768px)': {
    cryptoGrid: {
      gridTemplateColumns: '1fr'
    },
    filterSortBar: {
      flexDirection: 'column',
      alignItems: 'stretch'
    },
    priceUSD: {
      fontSize: '1.4em'
    }
  }
};