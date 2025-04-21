import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StockChart = ({ symbol }) => {
  const generateMockData = () => {
    const labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
    const data = Array.from({ length: 30 }, () => 
      Math.floor(Math.random() * 100) + 100
    );
    return { labels, data };
  };

  const { labels, data } = generateMockData();

  const chartData = {
    labels,
    datasets: [
      {
        label: `${symbol} Stock Price`,
        data: data,
        borderColor: '#00d09c',
        backgroundColor: 'rgba(0, 208, 156, 0.1)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${symbol} Price Chart`,
      },
    },
  };

  return (
    <div className="stock-chart">
      <Line options={options} data={chartData} />
    </div>
  );
};

export default StockChart;