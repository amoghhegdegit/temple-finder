import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = ({ size = 'medium', showText = true }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className={`theme-toggle ${size} ${isDarkMode ? 'dark' : 'light'}`}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <div className="toggle-container">
        <div className="toggle-icon">
          {isDarkMode ? '🌙' : '☀️'}
        </div>
        {showText && (
          <span className="toggle-text">
            {isDarkMode ? 'Dark' : 'Light'}
          </span>
        )}
      </div>
      <div className="toggle-slider">
        <div className="toggle-thumb"></div>
      </div>
    </button>
  );
};

export default ThemeToggle;