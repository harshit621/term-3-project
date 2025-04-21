import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Review from './pages/Review';
import ContactForm from './pages/ContactForm';
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
              <Link to="/reviews" className="nav-link">Reviews</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
              <Link to="/about" className="nav-link">About</Link>
            </nav>
          </div>
        </header>

        <main className="page-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reviews" element={<Review />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;