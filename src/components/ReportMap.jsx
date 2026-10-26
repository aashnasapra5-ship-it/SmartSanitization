// ReportMap Component

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function ReportMap({ selectedCoordinates, onSelectCoordinates, existingComplaints = [] }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const selectionMarkerRef = useRef(null);

  // Default center: Bangalore civic center
  const defaultCenter = [12.9352, 77.6245];
  const initialCenter = selectedCoordinates
    ? [selectedCoordinates.lat, selectedCoordinates.lng]
    : defaultCenter;

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // Prevent double initialization in React StrictMode

    // Initialize Leaflet Map
    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: 12,
      scrollWheelZoom: false, // Prevent page scroll interference
    });

    // Add OpenStreetMap Free Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    mapInstanceRef.current = map;

    // Render markers for existing nearby complaints
    existingComplaints.forEach((item) => {
      if (item.coordinates && item.coordinates.lat && item.coordinates.lng) {
        const statusColors = {
          Pending: '#d97706',
          Assigned: '#0284c7',
          'In Progress': '#c026d3',
          Resolved: '#059669',
        };
        const color = statusColors[item.status] || '#10b981';

        const customDotIcon = L.divIcon({
          className: 'custom-map-marker',
          html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.4);"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });

        const marker = L.marker([item.coordinates.lat, item.coordinates.lng], { icon: customDotIcon });
        marker.bindPopup(
          `<div style="font-size: 12px; line-height: 1.4;">
            <strong>${item.id}</strong><br/>
            <span>${item.garbageType}</span><br/>
            <span style="color: ${color}; font-weight: bold;">${item.status}</span><br/>
            <small>${item.location}</small>
          </div>`
        );
        marker.addTo(map);
      }
    });

    // Handle Map Clicks to Pin Location
    map.on('click', (e) => {
      const lat = Number(e.latlng.lat.toFixed(4));
      const lng = Number(e.latlng.lng.toFixed(4));

      if (onSelectCoordinates) {
        onSelectCoordinates({ lat, lng });
      }

      // Update or create user selection pin
      if (selectionMarkerRef.current) {
        selectionMarkerRef.current.setLatLng([lat, lng]);
      } else {
        const pinIcon = L.divIcon({
          className: 'user-pin-marker',
          html: `<div style="font-size: 24px; text-shadow: 0 2px 4px rgba(0,0,0,0.3); transform: translate(-10px, -24px);">📍</div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 24],
        });
        selectionMarkerRef.current = L.marker([lat, lng], { icon: pinIcon }).addTo(map);
      }

      selectionMarkerRef.current.bindPopup(
        `<div style="font-size: 12px;"><strong>Report Location Selected</strong><br/>Lat: ${lat}, Lng: ${lng}</div>`
      ).openPopup();
    });

    // Cleanup on unmount
    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []); // Run once on mount

  // Sync external coordinates selection with map marker
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedCoordinates) return;
    const { lat, lng } = selectedCoordinates;

    if (selectionMarkerRef.current) {
      selectionMarkerRef.current.setLatLng([lat, lng]);
    } else {
      const pinIcon = L.divIcon({
        className: 'user-pin-marker',
        html: `<div style="font-size: 24px; text-shadow: 0 2px 4px rgba(0,0,0,0.3); transform: translate(-10px, -24px);">📍</div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 24],
      });
      selectionMarkerRef.current = L.marker([lat, lng], { icon: pinIcon }).addTo(mapInstanceRef.current);
    }
  }, [selectedCoordinates]);

  return (
    <div className="report-map-wrapper" style={{ marginTop: '16px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>
          🗺️ Pin Location on City Map (Optional)
        </span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Click anywhere to select coordinates
        </span>
      </div>

      <div
        ref={mapContainerRef}
        style={{
          width: '100%',
          height: '240px',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          zIndex: 1,
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        <span>Colored dots: Nearby reported complaints</span>
        <span>
          {selectedCoordinates
            ? `Selected: ${selectedCoordinates.lat}, ${selectedCoordinates.lng}`
            : 'No pin dropped yet'}
        </span>
      </div>
    </div>
  );
}

export default ReportMap;
