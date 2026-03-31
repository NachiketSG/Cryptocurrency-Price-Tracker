import React, { useState, useEffect, useCallback } from 'react';
import { getTopCryptos, getHistoricalData } from './services/cryptoAPI';
import Header from './components/Header';
import CryptoCard from './components/CryptoCard';
import FilterSortBar from './components/FilterSortBar';
import LoadingSpinner from './components/LoadingSpinner';
import ChartModal from './components/ChartModal'; // Import modal
import { styles } from './components/styles';

function App() {
  // State Management
  const [cryptos, setCryptos] = useState([]);
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [selectedDays, setSelectedDays] = useState(7);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('market_cap_desc');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Fetch top cryptocurrencies
  const fetchCryptos = useCallback(async () => {
    try {
      const data = await getTopCryptos(100);
      if (data) {
        setCryptos(data);
        setFilteredCryptos(data);
        setLastUpdated(new Date());
        setError(null);
      }
    } catch (err) {
      setError('Failed to fetch cryptocurrency data');
      console.error(err);
    }
  }, []);

  // Fetch historical data for selected crypto
  const fetchHistoricalData = useCallback(async (coinId, days) => {
    try {
      const data = await getHistoricalData(coinId, days);
      if (data) {
        setHistoricalData(data);
      }
    } catch (err) {
      console.error('Error fetching historical data:', err);
    }
  }, []);

  // Apply filters and sorting
  const applyFiltersAndSorting = useCallback(() => {
    let filtered = [...cryptos];

    // Apply filters
    switch (filter) {
      case 'gainers':
        filtered = filtered.filter(c => c.price_change_percentage_24h > 5);
        break;
      case 'losers':
        filtered = filtered.filter(c => c.price_change_percentage_24h < -5);
        break;
      case 'top100':
        filtered = filtered.slice(0, 100);
        break;
      default:
        break;
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'market_cap_desc':
          return b.market_cap - a.market_cap;
        case 'market_cap_asc':
          return a.market_cap - b.market_cap;
        case 'volume_desc':
          return b.total_volume - a.total_volume;
        case 'volume_asc':
          return a.total_volume - b.total_volume;
        case 'price_desc':
          return b.current_price - a.current_price;
        case 'price_asc':
          return a.current_price - b.current_price;
        case 'change_desc':
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case 'change_asc':
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        default:
          return 0;
      }
    });

    setFilteredCryptos(filtered);
  }, [cryptos, filter, sortBy]);

  // Initial data load
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchCryptos();
      setLoading(false);
    };
    init();
  }, [fetchCryptos]);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('🔄 Refreshing data...');
      fetchCryptos();
    }, 60000);

    return () => clearInterval(interval);
  }, [fetchCryptos]);

  // Apply filters and sorting when dependencies change
  useEffect(() => {
    if (cryptos.length > 0) {
      applyFiltersAndSorting();
    }
  }, [cryptos, filter, sortBy, applyFiltersAndSorting]);

  // Fetch historical data when selected crypto changes
  useEffect(() => {
    if (selectedCrypto) {
      fetchHistoricalData(selectedCrypto.id, selectedDays);
    }
  }, [selectedCrypto, selectedDays, fetchHistoricalData]);

  // Handle crypto card click - opens modal
  const handleCryptoClick = (crypto) => {
    setSelectedCrypto(crypto);
    setIsModalOpen(true); // Open modal
    fetchHistoricalData(crypto.id, selectedDays);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCrypto(null);
    setHistoricalData(null);
    setSelectedDays(7);
  };

  if (loading && cryptos.length === 0) {
    return (
      <div style={styles.appContainer}>
        <div style={styles.mainContainer}>
          <Header />
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div style={styles.appContainer}>
      <div style={styles.mainContainer}>
        {/* Header Component */}
        <Header lastUpdated={lastUpdated} />

        {error && (
          <div style={{
            background: '#ff4444',
            color: 'white',
            padding: '10px',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            ⚠️ {error}. Please refresh the page.
          </div>
        )}

        {/* Filter & Sort Bar */}
        <FilterSortBar
          filter={filter}
          setFilter={setFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Crypto List Grid */}
        <div style={styles.cryptoGrid}>
          {filteredCryptos.map(crypto => (
            <CryptoCard
              key={crypto.id}
              crypto={crypto}
              onClick={handleCryptoClick}
            />
          ))}
        </div>

        {/* Chart Modal - Opens in new window */}
        <ChartModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          historicalData={historicalData}
          coinName={selectedCrypto}
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
        />
      </div>
    </div>
  );
}

export default App;