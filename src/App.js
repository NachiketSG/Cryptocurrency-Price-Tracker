import React, { useState, useEffect, useCallback } from 'react';
import { getTopCryptos, getHistoricalData } from './services/cryptoAPI';
import { auth, addToFavorites, removeFromFavorites, getFavorites } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import Header from './components/Header';
import CryptoCard from './components/CryptoCard';
import FilterSortBar from './components/FilterSortBar';
import LoadingSpinner from './components/LoadingSpinner';
import ChartModal from './components/ChartModal';
import AuthModal from './components/AuthModal';
import FavoritesList from './components/FavoritesList';
import SearchBar from './components/SearchBar';
import { styles } from './components/styles';

function App() {
  // Existing states
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New search state
  const [searchTerm, setSearchTerm] = useState('');
  
  // Auth states
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

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

  // Fetch historical data
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

  // Load user favorites
  const loadFavorites = useCallback(async (userId) => {
    const result = await getFavorites(userId);
    if (result.success) {
      setFavorites(result.favorites);
    }
  }, []);

  // Add to favorites
  const handleAddToFavorites = async (crypto) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    const result = await addToFavorites(user.uid, crypto);
    if (result.success) {
      await loadFavorites(user.uid);
    }
  };

  // Remove from favorites
  const handleRemoveFromFavorites = async (cryptoId) => {
    if (!user) return;
    const result = await removeFromFavorites(user.uid, cryptoId);
    if (result.success) {
      await loadFavorites(user.uid);
    }
  };

  // Apply filters, sorting, and search
  const applyFiltersAndSorting = useCallback(() => {
    let filtered = [...cryptos];

    // Apply search filter first
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(crypto => 
        crypto.name.toLowerCase().includes(term) ||
        crypto.symbol.toLowerCase().includes(term)
      );
    }

    // Apply favorites filter
    if (showFavorites && favorites.length > 0) {
      filtered = filtered.filter(c => favorites.some(f => f.id === c.id));
    }

    // Apply category filter
    switch (filter) {
      case 'gainers':
        filtered = filtered.filter(c => c.price_change_percentage_24h > 5);
        break;
      case 'losers':
        filtered = filtered.filter(c => c.price_change_percentage_24h < -5);
        break;
      default:
        break;
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'market_cap_desc': return b.market_cap - a.market_cap;
        case 'market_cap_asc': return a.market_cap - b.market_cap;
        case 'volume_desc': return b.total_volume - a.total_volume;
        case 'price_desc': return b.current_price - a.current_price;
        case 'price_asc': return a.current_price - b.current_price;
        case 'change_desc': return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case 'change_asc': return a.price_change_percentage_24h - b.price_change_percentage_24h;
        default: return 0;
      }
    });

    setFilteredCryptos(filtered);
  }, [cryptos, filter, sortBy, showFavorites, favorites, searchTerm]);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await loadFavorites(currentUser.uid);
      } else {
        setFavorites([]);
        setShowFavorites(false);
      }
    });
    return () => unsubscribe();
  }, [loadFavorites]);

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

  // Apply filters, sorting, and search when dependencies change
  useEffect(() => {
    if (cryptos.length > 0) {
      applyFiltersAndSorting();
    }
  }, [cryptos, filter, sortBy, applyFiltersAndSorting, showFavorites, favorites, searchTerm]);

  // Fetch historical data
  useEffect(() => {
    if (selectedCrypto) {
      fetchHistoricalData(selectedCrypto.id, selectedDays);
    }
  }, [selectedCrypto, selectedDays, fetchHistoricalData]);

  const handleCryptoClick = (crypto) => {
    setSelectedCrypto(crypto);
    setIsModalOpen(true);
    fetchHistoricalData(crypto.id, selectedDays);
  };

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
        {/* Header with Auth */}
        <div style={styles.headerSection}>
          <Header lastUpdated={lastUpdated} />
          <div style={styles.authButtons}>
            {user ? (
              <div style={styles.userInfo}>
                <span style={styles.userName}>🔒 {user.email?.split('@')[0]}</span>
                <button
                  onClick={() => setShowFavorites(!showFavorites)}
                  style={{
                    ...styles.favoritesButton,
                    ...(showFavorites ? styles.activeFavoritesButton : {})
                  }}
                >
                  ★ {showFavorites ? 'Show All' : 'Favorites'}
                </button>
                <button
                  onClick={() => {
                    auth.signOut();
                    setShowFavorites(false);
                  }}
                  style={styles.logoutButton}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                style={styles.button}
              >
                🔐 Login / Sign Up
              </button>
            )}
          </div>
        </div>

        {error && (
          <div style={styles.errorMessage}>
            ⚠️ {error}
          </div>
        )}

        {/* Search Bar - New Feature */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Show search results count */}
        {searchTerm && (
          <div style={{
            textAlign: 'center',
            marginBottom: '15px',
            color: '#666',
            fontSize: '14px'
          }}>
            Found {filteredCryptos.length} result(s) for "{searchTerm}"
          </div>
        )}

        {/* Favorites Section */}
        {showFavorites && user && favorites.length > 0 && (
          <FavoritesList
            favorites={favorites}
            onCryptoClick={handleCryptoClick}
          />
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
            <div key={crypto.id} style={styles.cardWrapper}>
              <CryptoCard
                crypto={crypto}
                onClick={handleCryptoClick}
                isFavorite={user && favorites.some(f => f.id === crypto.id)}
                onFavoriteClick={user ? (crypto) => {
                  const isFav = favorites.some(f => f.id === crypto.id);
                  if (isFav) {
                    handleRemoveFromFavorites(crypto.id);
                  } else {
                    handleAddToFavorites(crypto);
                  }
                } : null}
              />
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredCryptos.length === 0 && !loading && (
          <div style={{
            textAlign: 'center',
            padding: '50px',
            background: 'white',
            borderRadius: '15px',
            color: '#666'
          }}>
            🔍 No cryptocurrencies found matching "{searchTerm}"
          </div>
        )}

        {/* Auth Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={(user) => {
            setUser(user);
            loadFavorites(user.uid);
          }}
        />

        {/* Chart Modal */}
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