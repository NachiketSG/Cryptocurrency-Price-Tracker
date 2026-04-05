import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react';
import { getTopCryptos, getHistoricalData } from '../services/cryptoAPI';

// Initial state
const initialState = {
  cryptos: [],
  filteredCryptos: [],
  loading: false,
  error: null,
  lastUpdated: null,
  filter: 'all',
  sortBy: 'market_cap_desc',
  user: null,
  favorites: []
};

// Actions
const ACTIONS = {
  SET_CRYPTOS: 'SET_CRYPTOS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_FILTER: 'SET_FILTER',
  SET_SORT: 'SET_SORT',
  SET_USER: 'SET_USER',
  SET_FAVORITES: 'SET_FAVORITES',
  UPDATE_LAST_UPDATED: 'UPDATE_LAST_UPDATED'
};

// Reducer function
const cryptoReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_CRYPTOS:
      return { ...state, cryptos: action.payload, filteredCryptos: action.payload };
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    case ACTIONS.SET_FILTER:
      return { ...state, filter: action.payload };
    case ACTIONS.SET_SORT:
      return { ...state, sortBy: action.payload };
    case ACTIONS.SET_USER:
      return { ...state, user: action.payload };
    case ACTIONS.SET_FAVORITES:
      return { ...state, favorites: action.payload };
    case ACTIONS.UPDATE_LAST_UPDATED:
      return { ...state, lastUpdated: action.payload };
    default:
      return state;
  }
};

// Create Context
const CryptoContext = createContext();

// Provider component
export const CryptoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cryptoReducer, initialState);

  // Memoized actions
  const fetchCryptos = useCallback(async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: ACTIONS.SET_ERROR, payload: null });
    
    try {
      const data = await getTopCryptos(100);
      if (data) {
        dispatch({ type: ACTIONS.SET_CRYPTOS, payload: data });
        dispatch({ type: ACTIONS.UPDATE_LAST_UPDATED, payload: new Date() });
      }
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: 'Failed to fetch data' });
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  }, []);

  // Memoized filtered and sorted data
  const getFilteredAndSortedCryptos = useCallback(() => {
    let filtered = [...state.cryptos];

    // Apply filter
    switch (state.filter) {
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
      switch (state.sortBy) {
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

    return filtered;
  }, [state.cryptos, state.filter, state.sortBy]);

  // Memoized value
  const value = useMemo(() => ({
    state,
    dispatch,
    ACTIONS,
    fetchCryptos,
    getFilteredAndSortedCryptos
  }), [state, fetchCryptos, getFilteredAndSortedCryptos]);

  return (
    <CryptoContext.Provider value={value}>
      {children}
    </CryptoContext.Provider>
  );
};

// Custom hook
export const useCrypto = () => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error('useCrypto must be used within CryptoProvider');
  }
  return context;
};