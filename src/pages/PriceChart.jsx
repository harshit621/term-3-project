import React, { useState } from 'react';
import StockChart from '../components/StockChart';

const PriceChart = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStock, setSelectedStock] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setSelectedStock(searchQuery.toUpperCase());
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="price-chart-container">
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter stock symbol (e.g., AAPL)"
            className="stock-search"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>

      <div className="chart-view">
        {isLoading ? (
          <div className="loading-indicator">Loading...</div>
        ) : selectedStock ? (
          <StockChart symbol={selectedStock} />
        ) : (
          <div className="empty-state">
            Search for a stock symbol to view its price chart
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceChart;
