import React, { useState } from 'react';
import StarRating from './StarRating';
import { deleteReview } from '../services/reviewsService';
import './ReviewList.css';

const ReviewList = ({ reviews, onReviewDeleted, showDeleteOption = false }) => {
  const [expandedReviews, setExpandedReviews] = useState(new Set());

  const handleDeleteReview = (templeId, reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      const success = deleteReview(templeId, reviewId);
      if (success && onReviewDeleted) {
        onReviewDeleted(reviewId);
      }
    }
  };

  const toggleExpanded = (reviewId) => {
    const newExpanded = new Set(expandedReviews);
    if (newExpanded.has(reviewId)) {
      newExpanded.delete(reviewId);
    } else {
      newExpanded.add(reviewId);
    }
    setExpandedReviews(newExpanded);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className="review-list empty">
        <div className="empty-reviews">
          <div className="empty-icon">💭</div>
          <h3>No reviews yet</h3>
          <p>Be the first to share your experience!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="review-list">
      <h3>Reviews ({reviews.length})</h3>
      
      <div className="reviews-container">
        {reviews.map((review) => {
          const isExpanded = expandedReviews.has(review.id);
          const shouldTruncate = review.comment.length > 150;
          const displayComment = isExpanded || !shouldTruncate 
            ? review.comment 
            : truncateText(review.comment);

          return (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    {review.userName ? review.userName.charAt(0).toUpperCase() : 'A'}
                  </div>
                  <div className="reviewer-details">
                    <h4 className="reviewer-name">
                      {review.userName || 'Anonymous'}
                    </h4>
                    <div className="review-meta">
                      <StarRating 
                        rating={review.rating} 
                        readonly={true} 
                        size="small" 
                        showText={false}
                      />
                      <span className="review-date">
                        {formatDate(review.date)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {showDeleteOption && (
                  <button
                    onClick={() => handleDeleteReview(review.templeId, review.id)}
                    className="delete-btn"
                    title="Delete review"
                  >
                    🗑️
                  </button>
                )}
              </div>
              
              <div className="review-content">
                <p className="review-comment">
                  {displayComment}
                </p>
                
                {shouldTruncate && (
                  <button
                    onClick={() => toggleExpanded(review.id)}
                    className="expand-btn"
                  >
                    {isExpanded ? 'Show less' : 'Read more'}
                  </button>
                )}
              </div>
              
              {review.updatedAt && (
                <div className="review-updated">
                  <small>Updated: {formatDate(review.updatedAt)}</small>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewList;