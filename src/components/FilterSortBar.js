import React from 'react';
import { styles } from './styles';

const FilterSortBar = ({ filter, setFilter, sortBy, setSortBy }) => {
  const filterOptions = [
    { value: 'all', label: 'All Coins' },
    { value: 'top100', label: 'Top 100' },
    { value: 'gainers', label: 'Top Gainers' },
    { value: 'losers', label: 'Top Losers' }
  ];

  const sortOptions = [
    { value: 'market_cap_desc', label: 'Market Cap (High to Low)' },
    { value: 'market_cap_asc', label: 'Market Cap (Low to High)' },
    { value: 'volume_desc', label: 'Volume (High to Low)' },
    { value: 'price_desc', label: 'Price (High to Low)' },
    { value: 'price_asc', label: 'Price (Low to High)' },
    { value: 'change_desc', label: '24h Change (High to Low)' },
    { value: 'change_asc', label: '24h Change (Low to High)' }
  ];

  return (
    <div style={styles.filterSortBar}>
      <div style={styles.filterGroup}>
        <span>🔍 Filter:</span>
        {filterOptions.map(opt => (
          <button
            key={opt.value}
            style={{
              ...styles.button,
              ...(filter === opt.value ? styles.activeButton : {})
            }}
            onClick={() => setFilter(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div style={styles.sortGroup}>
        <span>📊 Sort by:</span>
        <select
          style={styles.select}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSortBar;