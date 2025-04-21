import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const apiKey = "ZWYIQDSLZXZH8R3Y";
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=your_api_key`,
      );
    
      const matches = response.data.bestMatches || [];
      const newStocks = matches.map(match => ({
        symbol: match['1. symbol'],
        name: match['2. name'],
        price: Math.random() * 1000,
        change: (Math.random() * 10) - 5
      }));
      console.log(matches)

      setStocks(newStocks);
      localStorage.setItem('recentStocks', JSON.stringify(newStocks));
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to StockGroww</h1>
        <p>Your gateway to smarter stock market investments</p>
        
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search stocks by name or symbol..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="search-results">
          <div className="stocks-grid">
            {stocks.map((stock) => (
              <Link to={`/news/${stock.symbol}`} key={stock.symbol} className="stock-card">
                <div className="stock-info">
                  <h3>{stock.symbol}</h3>
                  <p className="stock-name">{stock.name}</p>
                </div>
                <div className="stock-price">
                  <span className="price">${stock.price.toFixed(2)}</span>
                  <span className={`change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;