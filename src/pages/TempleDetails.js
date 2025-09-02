import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTempleById } from '../data/templesData';
import { getCurrentLocation, calculateDistance } from '../services/geolocationService';
import { getTempleReviews, getTempleAverageRating } from '../services/reviewsService';
import FavoriteButton from '../components/FavoriteButton';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import StarRating from '../components/StarRating';
import PhotoGallery from '../components/PhotoGallery';
import ShareButton from '../components/ShareButton';
import './TempleDetails.css';

const TempleDetails = () => {
  const { id } = useParams();
  const [temple, setTemple] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState({ average: 0, count: 0 });
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    const templeData = getTempleById(id);
    setTemple(templeData);
    
    if (templeData) {
      // Load reviews and ratings
      const templeReviews = getTempleReviews(parseInt(id));
      const rating = getTempleAverageRating(parseInt(id));
      setReviews(templeReviews);
      setAverageRating(rating);
    }

    // Get user location to calculate distance
    getCurrentLocation()
      .then(location => {
        setUserLocation(location);
        if (templeData) {
          const dist = calculateDistance(
            location.latitude,
            location.longitude,
            templeData.latitude,
            templeData.longitude
          );
          setDistance(dist.toFixed(1));
        }
      })
      .catch(err => {
        console.log('Could not get user location:', err.message);
      });
  }, [id]);

  if (!temple) {
    return (
      <div className="temple-details">
        <div className="container">
          <div className="not-found">
            <h2>Temple not found</h2>
            <Link to="/" className="back-btn">← Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  const openDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${temple.latitude},${temple.longitude}`;
    window.open(url, '_blank');
  };

  const handleReviewAdded = (newReview) => {
    setReviews(prev => [newReview, ...prev]);
    const newRating = getTempleAverageRating(parseInt(id));
    setAverageRating(newRating);
    setShowReviewForm(false);
  };

  const handleReviewDeleted = (reviewId) => {
    setReviews(prev => prev.filter(review => review.id !== reviewId));
    const newRating = getTempleAverageRating(parseInt(id));
    setAverageRating(newRating);
  };

  return (
    <div className="temple-details">
      <div className="container">
        <Link to="/" className="back-btn">← Back to Home</Link>
        
        <div className="temple-header">
          <div className="header-content">
            <h1>{temple.name}</h1>
            <div className="temple-meta">
              <span className="religion">{temple.religion}</span>
              {distance && <span className="distance">{distance} km away</span>}
              {averageRating.count > 0 && (
                <div className="rating-display">
                  <StarRating 
                    rating={averageRating.average} 
                    readonly={true} 
                    size="medium" 
                    showText={false}
                  />
                  <span className="rating-text">
                    {averageRating.average} ({averageRating.count} review{averageRating.count !== 1 ? 's' : ''})
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="header-actions">
            <FavoriteButton templeId={temple.id} size="large" />
            <ShareButton temple={temple} />
          </div>
        </div>

        <div className="temple-content">
          <PhotoGallery 
            images={temple.images} 
            templeName={temple.name}
          />

          <div className="temple-info">
            <div className="info-section">
              <h3>About</h3>
              <p>{temple.description}</p>
            </div>

            <div className="info-section">
              <h3>Details</h3>
              <div className="detail-item">
                <strong>📍 Address:</strong>
                <p>{temple.address}</p>
              </div>
              <div className="detail-item">
                <strong>⏰ Timings:</strong>
                <p>{temple.timings}</p>
              </div>
              <div className="detail-item">
                <strong>📞 Contact:</strong>
                <p>{temple.contact}</p>
              </div>
              <div className="detail-item">
                <strong>🙏 Religion:</strong>
                <p>{temple.religion}</p>
              </div>
            </div>

            <div className="action-buttons">
              <button onClick={openDirections} className="directions-btn">
                🗺️ Get Directions
              </button>
              <a href={`tel:${temple.contact}`} className="call-btn">
                📞 Call Temple
              </a>
              <FavoriteButton templeId={temple.id} size="medium" />
            </div>
          </div>
          
          {/* Reviews Section */}
          <div className="reviews-section">
            <div className="reviews-header">
              <h2>Reviews & Ratings</h2>
              <button 
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="add-review-btn"
              >
                {showReviewForm ? 'Cancel' : '✍️ Write a Review'}
              </button>
            </div>
            
            {showReviewForm && (
              <ReviewForm 
                templeId={parseInt(id)}
                onReviewAdded={handleReviewAdded}
                onCancel={() => setShowReviewForm(false)}
              />
            )}
            
            <ReviewList 
              reviews={reviews}
              onReviewDeleted={handleReviewDeleted}
              showDeleteOption={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempleDetails;