import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register all plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  zoomPlugin
);

// Spinner style (inline instead of importing styles)
const spinnerStyle = {
  width: '40px',
  height: '40px',
  border: '4px solid #f3f3f3',
  borderTop: '4px solid #667eea',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  margin: '0 auto'
};

const ChartModal = ({ isOpen, onClose, historicalData, coinName, selectedDays, setSelectedDays }) => {
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef();

  const timeRanges = [
    { days: 1, label: '24H' },
    { days: 7, label: '7D' },
    { days: 30, label: '30D' },
    { days: 90, label: '90D' },
    { days: 365, label: '1Y' }
  ];

  useEffect(() => {
    if (historicalData && historicalData.prices) {
      const prices = historicalData.prices;
      const labels = prices.map(price => {
        const date = new Date(price[0]);
        if (selectedDays === 1) {
          return date.toLocaleTimeString();
        }
        return date.toLocaleDateString();
      });
      
      const data = prices.map(price => price[1]);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: `${coinName?.name || 'Coin'} Price (USD)`,
            data: data,
            borderColor: 'rgb(102, 126, 234)',
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: selectedDays === 1 ? 2 : 0,
            pointHoverRadius: 5,
            pointBackgroundColor: 'rgb(102, 126, 234)',
            pointBorderColor: 'white',
            pointBorderWidth: 2
          }
        ]
      });
    }
  }, [historicalData, selectedDays, coinName]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: `${coinName?.name || 'Coin'} Price Chart - Click and drag to zoom, double-click to reset`,
        font: {
          size: 14,
          weight: 'normal'
        },
        color: '#666'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
          modifierKey: 'ctrl',
        },
        zoom: {
          wheel: {
            enabled: true,
            speed: 0.1,
          },
          pinch: {
            enabled: true
          },
          mode: 'x',
        }
      }
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          autoSkip: true,
          maxTicksLimit: 10
        },
        title: {
          display: true,
          text: selectedDays === 1 ? 'Time (Hours)' : 'Date',
          font: {
            size: 12
          }
        }
      },
      y: {
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        },
        title: {
          display: true,
          text: 'Price (USD)',
          font: {
            size: 12
          }
        }
      }
    }
  };

  // Reset zoom function
  const resetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  if (!isOpen) return null;

  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      animation: 'fadeIn 0.3s ease'
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '15px',
      width: '90%',
      maxWidth: '1200px',
      maxHeight: '90vh',
      overflow: 'auto',
      padding: '20px',
      position: 'relative',
      animation: 'slideUp 0.3s ease'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      paddingBottom: '10px',
      borderBottom: '2px solid #eee'
    },
    title: {
      margin: 0,
      fontSize: '1.5em',
      color: '#333'
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#999',
      padding: '5px 10px',
      borderRadius: '5px',
      transition: 'all 0.3s'
    },
    chartContainer: {
      height: '500px',
      marginTop: '20px'
    },
    controls: {
      display: 'flex',
      gap: '10px',
      marginBottom: '20px',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    timeButtons: {
      display: 'flex',
      gap: '10px',
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
    resetButton: {
      padding: '8px 16px',
      borderRadius: '8px',
      border: '1px solid #667eea',
      backgroundColor: 'white',
      color: '#667eea',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    coinInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '15px',
      padding: '10px',
      backgroundColor: '#f8f9fa',
      borderRadius: '10px'
    },
    coinIcon: {
      width: '40px',
      height: '40px'
    },
    coinDetails: {
      flex: 1
    },
    coinName: {
      margin: 0,
      fontSize: '1.2em',
      fontWeight: 'bold'
    },
    coinSymbol: {
      margin: 0,
      color: '#666',
      fontSize: '0.9em'
    },
    instructions: {
      fontSize: '12px',
      color: '#999',
      marginTop: '10px',
      textAlign: 'center',
      padding: '8px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px'
    }
  };

  return (
    <div style={modalStyles.overlay} onClick={onClose}>
      <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={modalStyles.header}>
          <h2 style={modalStyles.title}>📊 Price Chart</h2>
          <button 
            style={modalStyles.closeButton} 
            onClick={onClose}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            ✕
          </button>
        </div>

        <div style={modalStyles.coinInfo}>
          <img 
            src={coinName?.image} 
            alt={coinName?.name} 
            style={modalStyles.coinIcon} 
          />
          <div style={modalStyles.coinDetails}>
            <h3 style={modalStyles.coinName}>{coinName?.name}</h3>
            <p style={modalStyles.coinSymbol}>{coinName?.symbol?.toUpperCase()}</p>
          </div>
        </div>

        <div style={modalStyles.controls}>
          <div style={modalStyles.timeButtons}>
            {timeRanges.map(range => (
              <button
                key={range.days}
                style={{
                  ...modalStyles.timeButton,
                  ...(selectedDays === range.days ? modalStyles.activeTimeButton : {})
                }}
                onClick={() => setSelectedDays(range.days)}
              >
                {range.label}
              </button>
            ))}
          </div>
          <button 
            style={modalStyles.resetButton}
            onClick={resetZoom}
          >
            🔄 Reset Zoom
          </button>
        </div>

        <div style={modalStyles.chartContainer}>
          {chartData ? (
            <Line 
              ref={chartRef}
              data={chartData} 
              options={options} 
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <div style={spinnerStyle}></div>
              <p style={{ marginTop: '10px' }}>Loading chart data...</p>
            </div>
          )}
        </div>

        <div style={modalStyles.instructions}>
          💡 Tip: Hold Ctrl + Click and drag to pan | Use mouse wheel to zoom | Click Reset Zoom to restore
        </div>
      </div>
    </div>
  );
};

export default ChartModal;