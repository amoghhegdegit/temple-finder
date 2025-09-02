import React from 'react';
import { Link } from 'react-router-dom';
import { calculateDistance } from '../services/geolocationService';
import FavoriteButton from './FavoriteButton';
import StarRating from './StarRating';
import { getTempleAverageRating } from '../services/reviewsService';
import './TempleList.css';

const TempleList = ({ temples, userLocation }) => {
  const getTempleRating = (templeId) => {
    return getTempleAverageRating(templeId);
  };
  if (!temples || temples.length === 0) {
    return (
      <div className="temple-list">
        <h2>No temples found nearby</h2>
        <p>Try increasing the search radius or check your location permissions.</p>
      </div>
    );
  }

  return (
    <div className="temple-list">
      <h2>Temples Near You ({temples.length} found)</h2>
      <div className="temples-grid">
        {temples.map((temple) => {
          const distance = userLocation 
            ? calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                temple.latitude,
                temple.longitude
              ).toFixed(1)
            : 'N/A';

          return (
            <div key={temple.id} className="temple-card">
              <div className="temple-image">
                <img 
                  src={temple.images[0]} 
                  alt={temple.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Temple+Image';
                  }}
                />
                <div className="distance-badge">
                  {distance} km away
                </div>
                <div className="favorite-overlay">
                  <FavoriteButton templeId={temple.id} size="small" showText={false} />
                </div>
              </div>
              <div className="temple-info">
                <h3>{temple.name}</h3>
                <p className="religion">{temple.religion}</p>
                <p className="address">{temple.address}</p>
                <p className="timings">⏰ {temple.timings}</p>
                
                {(() => {
                  const rating = getTempleRating(temple.id);
                  return rating.count > 0 ? (
                    <div className="temple-rating">
                      <StarRating 
                        rating={rating.average} 
                        readonly={true} 
                        size="small" 
                        showText={false}
                      />
                      <span className="rating-count">({rating.count})</span>
                    </div>
                  ) : null;
                })()}
                
                <div className="temple-actions">
                  <Link to={`/temple/${temple.id}`} className="view-details-btn">
                    View Details
                  </Link>
                  <FavoriteButton templeId={temple.id} size="small" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TempleList;