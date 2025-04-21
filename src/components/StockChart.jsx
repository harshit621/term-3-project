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
    const timestamps = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setMinutes(date.getMinutes() - (29 - i));
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    });

    const prices = Array.from({ length: 30 }, (_, i) => {
      const volatility = 0.02; // 2% volatility
      const time = i / 29;
      const trend = Math.sin(time * Math.PI) * 10;
      const noise = (Math.random() - 0.5) * volatility * basePrice;
      return basePrice + trend + noise;
    });

    const newChartData = {
      labels: timestamps,
      datasets: [
        {
          label: `${symbol} Price`,
          data: prices,
          borderColor: '#00d09c',
          backgroundColor: 'rgba(0, 208, 156, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointRadius: 1,
          pointHoverRadius: 5,
          pointBackgroundColor: '#00d09c',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#00d09c',
          pointHoverBorderWidth: 2,
        },
      ],
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
        position: 'top',
        labels: {
          color: '#fff',
          font: { size: 12, weight: '600' }
        }
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
          display: false,
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#888',
          maxTicksLimit: 8
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#888',
          callback: (value) => `$${value.toFixed(2)}`
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    animation: {
      duration: 1000
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