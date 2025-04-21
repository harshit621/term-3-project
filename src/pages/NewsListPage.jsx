import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const NEWS_API_KEY = '68dff322675b4e0e80a48f87e41db9f8';
  // const NewsKey = "83UNGUtjBLS1YMGAVzXtTzaiqtYXlYAg0VL_6L6ElGNBkHb8";

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${searchQuery} stock market&apiKey=${NEWS_API_KEY}`
      );
      const articles = response.data.articles.slice(0, 10);
      setNews(articles);
      
      // Store in localStorage with timestamp
      localStorage.setItem(`news_${searchQuery}`, JSON.stringify({
        articles,
        timestamp: new Date().getTime()
      }));
    } catch (error) {
      console.error('Error fetching news:', error);
    }
    setLoading(false);
  };

  return (
    <div className="news-list-page">
      <h2>Stock Market News</h2>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search news by stock symbol..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="search-btn" onClick={handleSearch}>
          Search News
        </button>
      </div>

      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="news-grid">
          {news.map((article, index) => (
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="news-card" 
              key={index}
            >
              {article.urlToImage && (
                <div className="news-image">
                  <img src={article.urlToImage} alt={article.title} />
                </div>
              )}
              <div className="news-content">
                <h3 className="news-title">{article.title}</h3>
                <p className="news-desc">{article.description}</p>
                <div className="news-footer">
                  <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                  <span>{article.source.name}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsListPage;