import React, { useState, useEffect } from 'react';
import './PhotoGallery.css';

const PhotoGallery = ({ images = [], templeName = 'Temple' }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(new Set());

  useEffect(() => {
    // Preload images for better performance
    if (images.length > 0) {
      images.forEach((image, index) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, index]));
          if (index === 0) {
            setIsLoading(false);
          }
        };
        img.src = image;
      });
    }
  }, [images]);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    } else if (e.key === 'ArrowLeft') {
      goToPrevious();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isModalOpen]);

  if (!images || images.length === 0) {
    return (
      <div className="photo-gallery">
        <div className="no-images">
          <div className="no-images-icon">📷</div>
          <p>No images available for this temple</p>
        </div>
      </div>
    );
  }

  return (
    <div className="photo-gallery">
      <div className="gallery-header">
        <h3>📸 Photo Gallery ({images.length} photos)</h3>
      </div>

      <div className="gallery-grid">
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`gallery-item ${loadedImages.has(index) ? 'loaded' : 'loading'}`}
            onClick={() => openModal(index)}
          >
            {!loadedImages.has(index) && (
              <div className="image-placeholder">
                <div className="loading-spinner"></div>
              </div>
            )}
            <img 
              src={image} 
              alt={`${templeName} - Photo ${index + 1}`}
              className="gallery-thumbnail"
              loading="lazy"
            />
            <div className="image-overlay">
              <div className="zoom-icon">🔍</div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for full-size image viewing */}
      {isModalOpen && (
        <div className="photo-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              ✕
            </button>
            
            <div className="image-container">
              <img 
                src={images[currentImageIndex]} 
                alt={`${templeName} - Photo ${currentImageIndex + 1}`}
                className="modal-image"
              />
            </div>

            {images.length > 1 && (
              <>
                <button className="nav-btn prev-btn" onClick={goToPrevious}>
                  ‹
                </button>
                <button className="nav-btn next-btn" onClick={goToNext}>
                  ›
                </button>
              </>
            )}

            <div className="image-info">
              <span className="image-counter">
                {currentImageIndex + 1} of {images.length}
              </span>
              <span className="image-title">
                {templeName} - Photo {currentImageIndex + 1}
              </span>
            </div>

            {/* Thumbnail navigation */}
            {images.length > 1 && (
              <div className="thumbnail-nav">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail-item ${
                      index === currentImageIndex ? 'active' : ''
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img 
                      src={image} 
                      alt={`Thumbnail ${index + 1}`}
                      className="thumbnail-image"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;