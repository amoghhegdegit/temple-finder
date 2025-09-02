import React, { useState, useEffect } from 'react';
import { isFavorite, toggleFavorite } from '../services/favoritesService';
import './FavoriteButton.css';

const FavoriteButton = ({ templeId, size = 'medium', showText = true }) => {
  const [favorite, setFavorite] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(templeId));
  }, [templeId]);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAnimating(true);
    const success = toggleFavorite(templeId);
    
    if (success) {
      setFavorite(!favorite);
      
      // Show a brief animation
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    } else {
      setIsAnimating(false);
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small': return 'favorite-btn-small';
      case 'large': return 'favorite-btn-large';
      default: return 'favorite-btn-medium';
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={`favorite-button ${getSizeClass()} ${
        favorite ? 'favorite-active' : 'favorite-inactive'
      } ${isAnimating ? 'favorite-animating' : ''}`}
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      title={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <span className="favorite-icon">
        {favorite ? '❤️' : '🤍'}
      </span>
      {showText && (
        <span className="favorite-text">
          {favorite ? 'Favorited' : 'Add to Favorites'}
        </span>
      )}
    </button>
  );
};

export default FavoriteButton;