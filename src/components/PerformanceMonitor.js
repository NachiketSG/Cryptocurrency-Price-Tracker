import React, { useEffect, useState } from 'react';

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    renderCount: 0,
    lastRenderTime: null,
    apiCalls: 0
  });

  useEffect(() => {
    // Track render count
    setMetrics(prev => ({
      ...prev,
      renderCount: prev.renderCount + 1,
      lastRenderTime: new Date().toLocaleTimeString()
    }));

    // Track API calls
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      if (args[0]?.includes('coingecko')) {
        setMetrics(prev => ({
          ...prev,
          apiCalls: prev.apiCalls + 1
        }));
      }
      return originalFetch.apply(this, args);
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: '#0f0',
      padding: '8px',
      borderRadius: '5px',
      fontSize: '10px',
      fontFamily: 'monospace',
      zIndex: 9999
    }}>
      <div>Renders: {metrics.renderCount}</div>
      <div>API Calls: {metrics.apiCalls}</div>
      <div>Last: {metrics.lastRenderTime}</div>
    </div>
  );
};

export default PerformanceMonitor;