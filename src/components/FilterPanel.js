import React, { useState, useEffect } from 'react';
import { calculateDistance } from '../services/geolocationService';
import './FilterPanel.css';

const FilterPanel = ({ 
  temples, 
  onFiltersChange, 
  userLocation,
  isVisible = true 
}) => {
  const [filters, setFilters] = useState({
    religion: 'all',
    maxDistance: 50,
    openStatus: 'all',
    sortBy: 'distance'
  });

  const [availableReligions, setAvailableReligions] = useState([]);

  useEffect(() => {
    // Extract unique religions from temples
    if (temples && temples.length > 0) {
      const religions = [...new Set(temples.map(temple => temple.religion))];
      setAvailableReligions(religions.sort());
    }
  }, [temples]);

  useEffect(() => {
    // Apply filters whenever they change
    applyFilters();
  }, [filters, temples, userLocation]);

  const applyFilters = () => {
    if (!temples || temples.length === 0) {
      onFiltersChange([]);
      return;
    }

    let filteredTemples = [...temples];

    // Filter by religion
    if (filters.religion !== 'all') {
      filteredTemples = filteredTemples.filter(
        temple => temple.religion === filters.religion
      );
    }

    // Filter by distance
    if (userLocation && filters.maxDistance < 50) {
      filteredTemples = filteredTemples.filter(temple => {
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          temple.coordinates.lat,
          temple.coordinates.lng
        );
        return distance <= filters.maxDistance;
      });
    }

    // Filter by open status (simplified - assumes temples are open during certain hours)
    if (filters.openStatus !== 'all') {
      const currentHour = new Date().getHours();
      filteredTemples = filteredTemples.filter(temple => {
        if (filters.openStatus === 'open') {
          // Assume temples are open between 6 AM and 8 PM
          return currentHour >= 6 && currentHour <= 20;
        } else {
          // Closed
          return currentHour < 6 || currentHour > 20;
        }
      });
    }

    // Sort temples
    if (filters.sortBy === 'distance' && userLocation) {
      filteredTemples.sort((a, b) => {
        const distanceA = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          a.coordinates.lat,
          a.coordinates.lng
        );
        const distanceB = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          b.coordinates.lat,
          b.coordinates.lng
        );
        return distanceA - distanceB;
      });
    } else if (filters.sortBy === 'name') {
      filteredTemples.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filters.sortBy === 'religion') {
      filteredTemples.sort((a, b) => a.religion.localeCompare(b.religion));
    }

    onFiltersChange(filteredTemples);
  };



  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      religion: 'all',
      maxDistance: 50,
      openStatus: 'all',
      sortBy: 'distance'
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.religion !== 'all') count++;
    if (filters.maxDistance < 50) count++;
    if (filters.openStatus !== 'all') count++;
    if (filters.sortBy !== 'distance') count++;
    return count;
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>🔍 Filters</h3>
        {getActiveFiltersCount() > 0 && (
          <button onClick={resetFilters} className="reset-filters-btn">
            Clear All ({getActiveFiltersCount()})
          </button>
        )}
      </div>

      <div className="filter-groups">
        {/* Religion Filter */}
        <div className="filter-group">
          <label>Religion</label>
          <select 
            value={filters.religion} 
            onChange={(e) => handleFilterChange('religion', e.target.value)}
          >
            <option value="all">All Religions</option>
            {availableReligions.map(religion => (
              <option key={religion} value={religion}>{religion}</option>
            ))}
          </select>
        </div>

        {/* Distance Filter */}
        {userLocation && (
          <div className="filter-group">
            <label>Max Distance: {filters.maxDistance} km</label>
            <input
              type="range"
              min="1"
              max="50"
              value={filters.maxDistance}
              onChange={(e) => handleFilterChange('maxDistance', parseInt(e.target.value))}
              className="distance-slider"
            />
            <div className="slider-labels">
              <span>1 km</span>
              <span>50 km</span>
            </div>
          </div>
        )}

        {/* Open Status Filter */}
        <div className="filter-group">
          <label>Status</label>
          <select 
            value={filters.openStatus} 
            onChange={(e) => handleFilterChange('openStatus', e.target.value)}
          >
            <option value="all">All Temples</option>
            <option value="open">Open Now</option>
            <option value="closed">Closed Now</option>
          </select>
        </div>

        {/* Sort By Filter */}
        <div className="filter-group">
          <label>Sort By</label>
          <select 
            value={filters.sortBy} 
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          >
            <option value="distance">Distance</option>
            <option value="name">Name</option>
            <option value="religion">Religion</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;