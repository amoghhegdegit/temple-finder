// Favorites service for managing favorite temples
const FAVORITES_KEY = 'temple_favorites';

export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

export const addToFavorites = (templeId) => {
  try {
    const favorites = getFavorites();
    if (!favorites.includes(templeId)) {
      favorites.push(templeId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    return false;
  }
};

export const removeFromFavorites = (templeId) => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(id => id !== templeId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return true;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    return false;
  }
};

export const isFavorite = (templeId) => {
  const favorites = getFavorites();
  return favorites.includes(templeId);
};

export const toggleFavorite = (templeId) => {
  if (isFavorite(templeId)) {
    return removeFromFavorites(templeId);
  } else {
    return addToFavorites(templeId);
  }
};

export const getFavoriteTemples = () => {
  const favorites = getFavorites();
  // This would typically fetch temple data from your data source
  // For now, we'll import and filter from templesData
  return favorites;
};

export const clearAllFavorites = () => {
  try {
    localStorage.removeItem(FAVORITES_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing favorites:', error);
    return false;
  }
};

// Get favorite temples with full data
export const getFavoriteTemplesData = async () => {
  try {
    const { templesData } = await import('../data/templesData');
    const favoriteIds = getFavorites();
    return templesData.filter(temple => favoriteIds.includes(temple.id));
  } catch (error) {
    console.error('Error getting favorite temples data:', error);
    return [];
  }
};