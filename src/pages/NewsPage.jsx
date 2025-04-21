import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import StockChart from '../components/StockChart';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { symbol } = useParams();
  const NEWS_API_KEY = '68dff322675b4e0e80a48f87e41db9f8';

  useEffect(() => {
    // Add to recently viewed stocks
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    if (!recentlyViewed.includes(symbol)) {
      const updatedRecent = [symbol, ...recentlyViewed.slice(0, 4)];
      localStorage.setItem('recentlyViewed', JSON.stringify(updatedRecent));
    }

    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${symbol} stock market&apiKey=${NEWS_API_KEY}`
        );
        console.log(response)

        
        const articles = response.data.articles.slice(0, 10);
        setNews(articles);
        
        // Store news in localStorage with timestamp
        localStorage.setItem(`news_${symbol}`, JSON.stringify({
          articles,
          timestamp: new Date().getTime()
        }));
      } catch (error) {
        // Try to load cached news if API fails
        const cachedNews = localStorage.getItem(`news_${symbol}`);
        if (cachedNews) {
          const { articles, timestamp } = JSON.parse(cachedNews);
          // Use cached news if less than 1 hour old
          if (new Date().getTime() - timestamp < 3600000) {
            setNews(articles);
          }
        }
        console.error('Error fetching news:', error);
      }
      setLoading(false);
    };

    fetchNews();
  }, [symbol]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="stock-page">
      <div className="stock-header">
        <h2 className="stock-title">{symbol} Overview</h2>
      </div>
      
      <div className="stock-content">
        <div className="chart-section">
          <StockChart symbol={symbol} />
        </div>

        <div className="news-section">
          <h3>Latest News</h3>
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
        </div>
      </div>
    </div>
  );
};

export default NewsPage;