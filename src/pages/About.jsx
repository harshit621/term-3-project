import React from 'react';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About StockGroww</h1>
        <p className="subtitle">Your Personal Stock Market Companion</p>
      </div>
      
      <div className="features-grid">
        <div className="feature-card">
          <span className="feature-icon">📈</span>
          <h3>Real-Time Data</h3>
          <p>Get instant access to live stock market data and trending news</p>
        </div>

        <div className="feature-card">
          <span className="feature-icon">🔍</span>
          <h3>Smart Search</h3>
          <p>Find stocks quickly with our intelligent search functionality</p>
        </div>

        <div className="feature-card">
          <span className="feature-icon">📰</span>
          <h3>Market News</h3>
          <p>Stay updated with the latest market news and analysis</p>
        </div>
      </div>
    </div>
  );
};

export default About;