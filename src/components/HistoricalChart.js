import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
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
import { styles } from './styles';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const HistoricalChart = ({ historicalData, coinName, selectedDays, setSelectedDays }) => {
  const [chartData, setChartData] = useState(null);

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
            label: `${coinName} Price (USD)`,
            data: data,
            borderColor: 'rgb(102, 126, 234)',
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: selectedDays === 1 ? 2 : 0,
            pointHoverRadius: 5
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
      },
      title: {
        display: true,
        text: `${coinName} Price Chart`,
        font: {
          size: 16
        }
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
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      }
    }
  };

  if (!chartData) {
    return <div style={styles.spinnerContainer}>Loading chart...</div>;
  }

  return (
    <div style={styles.chartContainer}>
      <h3 style={styles.chartTitle}>📈 Price History</h3>
      <div style={styles.chartControls}>
        {timeRanges.map(range => (
          <button
            key={range.days}
            style={{
              ...styles.timeButton,
              ...(selectedDays === range.days ? styles.activeTimeButton : {})
            }}
            onClick={() => setSelectedDays(range.days)}
          >
            {range.label}
          </button>
        ))}
      </div>
      <div style={{ height: '400px' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default HistoricalChart;