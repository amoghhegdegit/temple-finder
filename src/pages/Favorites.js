import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TempleList from '../components/TempleList';
import { getFavoriteTemplesData, clearAllFavorites } from '../services/favoritesService';
import { getCurrentLocation } from '../services/geolocationService';
import './Favorites.css';

const Favorites = () => {
  const [favoriteTemples, setFavoriteTemples] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
    getUserLocation();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const temples = await getFavoriteTemplesData();
      setFavoriteTemples(temples);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUserLocation = async () => {
    try {
      const location = await getCurrentLocation();
      setUserLocation(location);
    } catch (error) {
      console.log('Could not get user location:', error.message);
      // Set default location (Delhi) if geolocation fails
      setUserLocation({ latitude: 28.6139, longitude: 77.2090 });
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all temples from favorites?')) {
      const success = clearAllFavorites();
      if (success) {
        setFavoriteTemples([]);
      }
    }
  };

  if (loading) {
    return (
      <div className="favorites">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading your favorites...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites">
      <div className="container">
        <div className="favorites-header">
          <Link to="/" className="back-btn">← Back to Home</Link>
          <h1>Your Favorite Temples</h1>
          <p>Temples you've saved for easy access</p>
        </div>

        {favoriteTemples.length === 0 ? (
          <div className="empty-favorites">
            <div className="empty-icon">💔</div>
            <h2>No favorite temples yet</h2>
            <p>Start exploring temples and add them to your favorites by clicking the heart icon.</p>
            <Link to="/" className="explore-btn">
              Explore Temples
            </Link>
          </div>
        ) : (
          <div className="favorites-content">
            <div className="favorites-actions">
              <div className="favorites-count">
                <span>{favoriteTemples.length} temple{favoriteTemples.length !== 1 ? 's' : ''} saved</span>
              </div>
              <button onClick={handleClearAll} className="clear-all-btn">
                Clear All Favorites
              </button>
            </div>
            
            <TempleList temples={favoriteTemples} userLocation={userLocation} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;