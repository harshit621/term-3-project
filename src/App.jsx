import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import NewsPage from './pages/NewsPage';
import NewsListPage from './pages/NewsListPage';
import About from './pages/About';
import './App.css';

const App = () => {


  
  return ( 
    <Router>
      <div className="groww-style">
        <header className="groww-header">
          <div className="header-content">
            <Link to="/" className="logo">
              <span className="logo-icon">📈</span>
              StockGroww
            </Link>
            
            <nav className="main-nav">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/news" className="nav-link">News</Link>
              <Link to="/about" className="nav-link">About</Link>
            </nav>
          </div>
        </header>

        <main className="page-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<NewsListPage />} />
            <Route path="/news/:symbol" element={<NewsPage />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;