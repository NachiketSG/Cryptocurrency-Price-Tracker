import React from 'react';
import { styles } from './styles';

const LoadingSpinner = () => {
  return (
    <div style={styles.spinnerContainer}>
      <div style={styles.spinner}></div>
    </div>
  );
};

export default LoadingSpinner;