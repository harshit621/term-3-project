import React, { useState, useEffect } from 'react';
import StockChart from '../components/StockChart';

const PriceChart = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStock, setSelectedStock] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Common stock symbols for suggestions
  const stocksList = [
    'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META', 'TSLA', 'NVDA', 'JPM', 'BAC', 'WMT'
  ];

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = stocksList.filter(stock => 
        stock.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery) {
      setError('Please enter a stock symbol');
      return;
    }

    const stockSymbol = searchQuery.toUpperCase();
    setIsLoading(true);
    setError('');

    // Simulate API validation
    if (stocksList.includes(stockSymbol)) {
      setTimeout(() => {
        setSelectedStock(stockSymbol);
        setIsLoading(false);
      }, 500);
    } else {
      setIsLoading(false);
      setError('Invalid stock symbol. Please try again.');
      setSelectedStock(null);
    }
  };

  const selectSuggestion = (stock) => {
    setSearchQuery(stock);
    setSuggestions([]);
  };

  return (
    <div className="price-chart-container">
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <div className="search-input-wrapper">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter stock symbol (e.g., AAPL)"
              className="stock-search"
            />
            {suggestions.length > 0 && (
              <div className="suggestions-dropdown">
                {suggestions.map(stock => (
                  <div
                    key={stock}
                    className="suggestion-item"
                    onClick={() => selectSuggestion(stock)}
                  >
                    {stock}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="chart-view">
        {isLoading ? (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <span>Loading chart...</span>
          </div>
        ) : selectedStock ? (
          <StockChart symbol={selectedStock} />
        ) : (
          <div className="empty-state">
            Enter a stock symbol to view its price chart
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceChart;
