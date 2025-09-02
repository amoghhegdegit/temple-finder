import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Map from '../components/Map';
import TempleList from '../components/TempleList';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import { getCurrentLocation } from '../services/geolocationService';
import { getNearbyTemples, searchTemples } from '../data/templesData';
import './Home.css';

const Home = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyTemples, setNearbyTemples] = useState([]);
  const [filteredTemples, setFilteredTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchRadius, setSearchRadius] = useState(50);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUserLocationAndTemples();
  }, []);

  useEffect(() => {
    if (userLocation) {
      findNearbyTemples();
    }
  }, [userLocation, searchRadius]);

  const getUserLocationAndTemples = async () => {
    try {
      setLoading(true);
      setError(null);
      const location = await getCurrentLocation();
      setUserLocation(location);
    } catch (err) {
      setError(err.message);
      // Set a default location (Delhi) if geolocation fails
      setUserLocation({ latitude: 28.6139, longitude: 77.2090 });
    } finally {
      setLoading(false);
    }
  };

  const findNearbyTemples = () => {
    if (userLocation) {
      const temples = getNearbyTemples(
        userLocation.latitude,
        userLocation.longitude,
        searchRadius
      );
      setNearbyTemples(temples);
      setFilteredTemples(temples);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim()) {
      setIsSearchMode(true);
      const results = searchTemples(
        term,
        userLocation?.latitude,
        userLocation?.longitude
      );
      setNearbyTemples(results);
      setFilteredTemples(results);
    } else {
      setIsSearchMode(false);
      findNearbyTemples();
    }
  };

  const handleFiltersChange = (filtered) => {
    setFilteredTemples(filtered);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleTempleClick = (templeId) => {
    navigate(`/temple/${templeId}`);
  };

  const handleRetryLocation = () => {
    getUserLocationAndTemples();
  };

  if (loading) {
    return (
      <div className="home">
        <div className="loading">
          <div className="spinner"></div>
          <p>Getting your location...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="hero-section">
        <div className="container">
          <h1>Find Temples Near You</h1>
          <p>Discover beautiful temples in your area with detailed information and images</p>
          
          {error && (
            <div className="error-message">
              <p>⚠️ {error}</p>
              <button onClick={handleRetryLocation} className="retry-btn">
                Try Again
              </button>
              <p className="fallback-note">Showing temples near Delhi as fallback location</p>
            </div>
          )}

          <SearchBar onSearch={handleSearch} />
          
          {!isSearchMode && (
            <div className="search-controls">
              <label htmlFor="radius">Search Radius:</label>
              <select 
                id="radius"
                value={searchRadius} 
                onChange={(e) => setSearchRadius(Number(e.target.value))}
                className="radius-select"
              >
                <option value={10}>10 km</option>
                <option value={25}>25 km</option>
                <option value={50}>50 km</option>
                <option value={100}>100 km</option>
                <option value={500}>500 km</option>
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="container">
        <div className="results-info">
          <div className="results-header">
            {isSearchMode ? (
              <h2>Search Results for "{searchTerm}" ({filteredTemples.length} found)</h2>
            ) : (
              <h2>Nearby Temples ({filteredTemples.length} found within {searchRadius}km)</h2>
            )}
            <button onClick={toggleFilters} className="filter-toggle-btn">
              🔍 {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
        </div>

        {showFilters && (
          <FilterPanel
            temples={nearbyTemples}
            onFiltersChange={handleFiltersChange}
            userLocation={userLocation}
            isVisible={showFilters}
          />
        )}

        <div className="map-section">
          <h3>Map View</h3>
          <Map 
            userLocation={userLocation}
            temples={filteredTemples}
            onTempleClick={handleTempleClick}
          />
        </div>

        <TempleList temples={filteredTemples} userLocation={userLocation} />
      </div>
    </div>
  );
};

export default Home;