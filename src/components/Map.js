import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Map = ({ userLocation, temples, onTempleClick }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapInstanceRef.current && userLocation) {
      // Initialize map
      mapInstanceRef.current = L.map(mapRef.current).setView(
        [userLocation.latitude, userLocation.longitude], 
        12
      );

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);

      // Add user location marker
      const userIcon = L.divIcon({
        html: '📍',
        iconSize: [30, 30],
        className: 'user-location-marker'
      });

      L.marker([userLocation.latitude, userLocation.longitude], { icon: userIcon })
        .addTo(mapInstanceRef.current)
        .bindPopup('Your Location')
        .openPopup();
    }

    // Add temple markers
    if (mapInstanceRef.current && temples) {
      // Clear existing temple markers
      mapInstanceRef.current.eachLayer((layer) => {
        if (layer.options && layer.options.isTemple) {
          mapInstanceRef.current.removeLayer(layer);
        }
      });

      // Add new temple markers
      temples.forEach((temple) => {
        const templeIcon = L.divIcon({
          html: '🏛️',
          iconSize: [25, 25],
          className: 'temple-marker'
        });

        const marker = L.marker([temple.latitude, temple.longitude], { 
          icon: templeIcon,
          isTemple: true
        })
          .addTo(mapInstanceRef.current)
          .bindPopup(`
            <div class="temple-popup">
              <h3>${temple.name}</h3>
              <p>${temple.religion}</p>
              <button onclick="window.selectTemple(${temple.id})">View Details</button>
            </div>
          `);
      });
    }
  }, [userLocation, temples]);

  useEffect(() => {
    // Global function for popup button clicks
    window.selectTemple = (templeId) => {
      if (onTempleClick) {
        onTempleClick(templeId);
      }
    };

    return () => {
      delete window.selectTemple;
    };
  }, [onTempleClick]);

  return <div ref={mapRef} className="map-container"></div>;
};

export default Map;