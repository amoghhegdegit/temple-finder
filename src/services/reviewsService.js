// Reviews Service - Manages temple reviews and ratings using localStorage

const REVIEWS_STORAGE_KEY = 'templeFinderReviews';

// Get all reviews for a specific temple
export const getTempleReviews = (templeId) => {
  try {
    const allReviews = JSON.parse(localStorage.getItem(REVIEWS_STORAGE_KEY) || '{}');
    return allReviews[templeId] || [];
  } catch (error) {
    console.error('Error getting temple reviews:', error);
    return [];
  }
};

// Add a new review for a temple
export const addReview = (templeId, review) => {
  try {
    const allReviews = JSON.parse(localStorage.getItem(REVIEWS_STORAGE_KEY) || '{}');
    
    if (!allReviews[templeId]) {
      allReviews[templeId] = [];
    }
    
    const newReview = {
      id: Date.now().toString(),
      rating: review.rating,
      comment: review.comment,
      userName: review.userName || 'Anonymous',
      date: new Date().toISOString(),
      ...review
    };
    
    allReviews[templeId].unshift(newReview); // Add to beginning of array
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(allReviews));
    
    return newReview;
  } catch (error) {
    console.error('Error adding review:', error);
    return null;
  }
};

// Delete a review
export const deleteReview = (templeId, reviewId) => {
  try {
    const allReviews = JSON.parse(localStorage.getItem(REVIEWS_STORAGE_KEY) || '{}');
    
    if (allReviews[templeId]) {
      allReviews[templeId] = allReviews[templeId].filter(review => review.id !== reviewId);
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(allReviews));
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error deleting review:', error);
    return false;
  }
};

// Get average rating for a temple
export const getTempleAverageRating = (templeId) => {
  try {
    const reviews = getTempleReviews(templeId);
    
    if (reviews.length === 0) {
      return { average: 0, count: 0 };
    }
    
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const average = totalRating / reviews.length;
    
    return {
      average: Math.round(average * 10) / 10, // Round to 1 decimal place
      count: reviews.length
    };
  } catch (error) {
    console.error('Error calculating average rating:', error);
    return { average: 0, count: 0 };
  }
};

// Get all reviews across all temples (for admin purposes)
export const getAllReviews = () => {
  try {
    return JSON.parse(localStorage.getItem(REVIEWS_STORAGE_KEY) || '{}');
  } catch (error) {
    console.error('Error getting all reviews:', error);
    return {};
  }
};

// Clear all reviews (for admin purposes)
export const clearAllReviews = () => {
  try {
    localStorage.removeItem(REVIEWS_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing all reviews:', error);
    return false;
  }
};

// Update a review
export const updateReview = (templeId, reviewId, updatedReview) => {
  try {
    const allReviews = JSON.parse(localStorage.getItem(REVIEWS_STORAGE_KEY) || '{}');
    
    if (allReviews[templeId]) {
      const reviewIndex = allReviews[templeId].findIndex(review => review.id === reviewId);
      
      if (reviewIndex !== -1) {
        allReviews[templeId][reviewIndex] = {
          ...allReviews[templeId][reviewIndex],
          ...updatedReview,
          updatedAt: new Date().toISOString()
        };
        
        localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(allReviews));
        return allReviews[templeId][reviewIndex];
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error updating review:', error);
    return null;
  }
};

// Get reviews with pagination
export const getTempleReviewsPaginated = (templeId, page = 1, limit = 5) => {
  try {
    const allReviews = getTempleReviews(templeId);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return {
      reviews: allReviews.slice(startIndex, endIndex),
      totalReviews: allReviews.length,
      currentPage: page,
      totalPages: Math.ceil(allReviews.length / limit),
      hasMore: endIndex < allReviews.length
    };
  } catch (error) {
    console.error('Error getting paginated reviews:', error);
    return {
      reviews: [],
      totalReviews: 0,
      currentPage: 1,
      totalPages: 0,
      hasMore: false
    };
  }
};

// Validate review data
export const validateReview = (review) => {
  const errors = [];
  
  if (!review.rating || review.rating < 1 || review.rating > 5) {
    errors.push('Rating must be between 1 and 5 stars');
  }
  
  if (!review.comment || review.comment.trim().length < 10) {
    errors.push('Comment must be at least 10 characters long');
  }
  
  if (review.comment && review.comment.length > 500) {
    errors.push('Comment must be less than 500 characters');
  }
  
  if (review.userName && review.userName.length > 50) {
    errors.push('Name must be less than 50 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};