import React, { useEffect, useState, useCallback } from 'react';
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

const StockChart = ({ symbol }) => {
  const [chartData, setChartData] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);

  const updateChartData = useCallback(() => {
    // Try to get cached data first
    const cachedData = localStorage.getItem(`chart_${symbol}`);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      // Use cached data if less than 5 minutes old
      if (new Date().getTime() - timestamp < 300000) {
        setChartData(data);
        setCurrentPrice(data.datasets[0].data[data.datasets[0].data.length - 1]);
        return;
      }
    }

    const basePrice = 100 + Math.random() * 50;
    const timestamps = Array.from({ length: 50 }, (_, i) => {
      const date = new Date();
      date.setMinutes(date.getMinutes() - (49 - i));
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    });

    const prices = (() => {
      const result = [];
      let lastPrice = basePrice;
      const volatility = 0.008; // Reduced volatility for more realistic movements
      const trendStrength = 0.3;
      
      for (let i = 0; i < 50; i++) {
        // Create market momentum
        const momentum = Math.sin(i / 10) * trendStrength;
        // Random walk with momentum
        const change = (Math.random() - 0.5) * volatility * lastPrice + momentum;
        lastPrice = lastPrice + change;
        result.push(Math.max(lastPrice, 1)); // Prevent negative prices
      }
      return result;
    })();

    const newChartData = {
      labels: timestamps,
      datasets: [{
        label: `${symbol} Price`,
        data: prices,
        borderColor: '#00d09c',
        backgroundColor: 'rgba(0, 208, 156, 0.1)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointBackgroundColor: '#00d09c',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#00d09c',
        pointHoverBorderWidth: 2,
      }],
    };

    // Store in localStorage with timestamp
    localStorage.setItem(`chart_${symbol}`, JSON.stringify({
      data: newChartData,
      timestamp: new Date().getTime()
    }));

    setChartData(newChartData);
    setCurrentPrice(prices[prices.length - 1]);
  }, [symbol]);

  useEffect(() => {
    updateChartData();
    const interval = setInterval(updateChartData, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, [symbol, updateChartData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: `${symbol} Live Price: $${currentPrice?.toFixed(2) || '0.00'}`,
        color: '#00d09c',
        font: { size: 16, weight: 'bold' }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => `$${context.parsed.y.toFixed(2)}`
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#888',
          maxTicksLimit: 6,
          font: {
            size: 11
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        },
        ticks: {
          color: '#888',
          callback: (value) => `$${value.toFixed(2)}`,
          font: {
            size: 11
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    animation: {
      duration: 750
    }
  };

  if (!chartData) return (
    <div className="chart-loading">
      <div className="loading-spinner"></div>
      <p>Loading chart data...</p>
    </div>
  );

  return (
    <div className="chart-wrapper">
      <div className="chart-container">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

export default StockChart;