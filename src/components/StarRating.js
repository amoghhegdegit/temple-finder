import React, { useState } from 'react';
import './StarRating.css';

const StarRating = ({ 
  rating = 0, 
  onRatingChange = null, 
  size = 'medium', 
  readonly = false,
  showText = true 
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleStarClick = (starValue) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starValue);
    }
  };

  const handleStarHover = (starValue) => {
    if (!readonly) {
      setHoverRating(starValue);
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
      setIsHovering(false);
    }
  };

  const displayRating = isHovering ? hoverRating : rating;
  const ratingText = getRatingText(displayRating);

  return (
    <div className={`star-rating ${size} ${readonly ? 'readonly' : 'interactive'}`}>
      <div className="stars" onMouseLeave={handleMouseLeave}>
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= displayRating;
          const isPartial = !isFilled && star - 0.5 <= displayRating;
          
          return (
            <span
              key={star}
              className={`star ${
                isFilled ? 'filled' : isPartial ? 'partial' : 'empty'
              } ${!readonly ? 'clickable' : ''}`}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
            >
              {isFilled ? '★' : isPartial ? '☆' : '☆'}
            </span>
          );
        })}
      </div>
      
      {showText && (
        <div className="rating-info">
          <span className="rating-value">{displayRating.toFixed(1)}</span>
          {!readonly && isHovering && (
            <span className="rating-text">{ratingText}</span>
          )}
        </div>
      )}
    </div>
  );
};

const getRatingText = (rating) => {
  if (rating === 0) return 'No rating';
  if (rating <= 1) return 'Poor';
  if (rating <= 2) return 'Fair';
  if (rating <= 3) return 'Good';
  if (rating <= 4) return 'Very Good';
  return 'Excellent';
};

export default StarRating;