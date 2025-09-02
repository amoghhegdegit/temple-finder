import React, { useState } from 'react';
import StarRating from './StarRating';
import { addReview, validateReview } from '../services/reviewsService';
import './ReviewForm.css';

const ReviewForm = ({ templeId, onReviewAdded, onCancel }) => {
  const [formData, setFormData] = useState({
    rating: 0,
    comment: '',
    userName: ''
  });
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingChange = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
    // Clear rating-related errors
    setErrors(prev => prev.filter(error => !error.includes('Rating')));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field-specific errors
    if (name === 'comment') {
      setErrors(prev => prev.filter(error => !error.includes('Comment')));
    } else if (name === 'userName') {
      setErrors(prev => prev.filter(error => !error.includes('Name')));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate the review
    const validation = validateReview(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    setIsSubmitting(true);
    setErrors([]);
    
    try {
      const newReview = addReview(templeId, formData);
      
      if (newReview) {
        // Reset form
        setFormData({
          rating: 0,
          comment: '',
          userName: ''
        });
        
        // Notify parent component
        if (onReviewAdded) {
          onReviewAdded(newReview);
        }
      } else {
        setErrors(['Failed to add review. Please try again.']);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setErrors(['An error occurred while submitting your review.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      rating: 0,
      comment: '',
      userName: ''
    });
    setErrors([]);
    
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="review-form">
      <h3>Write a Review</h3>
      
      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((error, index) => (
            <div key={index} className="error-message">
              {error}
            </div>
          ))}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your Rating *</label>
          <StarRating
            rating={formData.rating}
            onRatingChange={handleRatingChange}
            size="large"
            showText={true}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="userName">Your Name (Optional)</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            placeholder="Enter your name"
            maxLength={50}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="comment">Your Review *</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            placeholder="Share your experience visiting this temple..."
            rows={4}
            maxLength={500}
            required
          />
          <div className="character-count">
            {formData.comment.length}/500 characters
          </div>
        </div>
        
        <div className="form-actions">
          <button
            type="button"
            onClick={handleCancel}
            className="cancel-btn"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting || formData.rating === 0 || !formData.comment.trim()}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;