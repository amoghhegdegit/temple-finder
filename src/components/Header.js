import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <h1>🏛️ Temple Finder</h1>
        </Link>
        <nav>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/favorites" className="nav-link">❤️ Favorites</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;