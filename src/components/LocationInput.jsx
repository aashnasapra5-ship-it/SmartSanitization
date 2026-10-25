// LocationInput Component

import { useState } from 'react';
import FormInput from './common/FormInput';

function LocationInput({
  location,
  city,
  address,
  coordinates,
  errors = {},
  onLocationChange,
  onCityChange,
  onAddressChange,
  onCoordinatesChange,
}) {
  const [isLocating, setIsLocating] = useState(false);

  function handleAutoLocation() {
    setIsLocating(true);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = Number(pos.coords.latitude.toFixed(4));
          const lng = Number(pos.coords.longitude.toFixed(4));
          const coords = { lat, lng };

          if (onCoordinatesChange) onCoordinatesChange(coords);

          // Reverse geocode any location worldwide via OpenStreetMap Nominatim
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
              { headers: { 'Accept-Language': 'en' } }
            );
            if (!res.ok) throw new Error('Geocoding service unavailable');
            const data = await res.json();
            const addr = data.address || {};

            const detectedCity =
              addr.city ||
              addr.town ||
              addr.village ||
              addr.state_district ||
              addr.county ||
              addr.state ||
              'Local Area';

            const detectedArea =
              addr.suburb ||
              addr.neighbourhood ||
              addr.residential ||
              addr.road ||
              addr.subdivision ||
              addr.hamlet ||
              'Civic Ward';

            const shortAddress = data.display_name
              ? data.display_name.split(',').slice(0, 3).join(',').trim()
              : `Lat: ${lat}, Lng: ${lng}`;

            onCityChange(detectedCity);
            onLocationChange(detectedArea);
            onAddressChange(shortAddress);
          } catch (_err) {
            onAddressChange(`Lat: ${lat}, Lng: ${lng} (GPS Coordinates Detected)`);
          } finally {
            setIsLocating(false);
          }
        },
        (_err) => {
          setIsLocating(false);
          alert('Could not access device GPS. Please grant browser location permission or pin your location on the map below.');
        },
        { timeout: 8000, enableHighAccuracy: true }
      );
    } else {
      setIsLocating(false);
      alert('Geolocation is not supported by your browser. Please search or pin your location on the map below.');
    }
  }

  return (
    <fieldset style={{ border: 'none', padding: 0, margin: '20px 0 0 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <legend className="form-label" style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>
          Location Details <span style={{ color: 'var(--danger)' }}>*</span>
        </legend>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={handleAutoLocation}
          disabled={isLocating}
          title="Auto-detect current location coordinates"
        >
          {isLocating ? '⏳ Locating...' : '📍 Auto-Detect Location'}
        </button>
      </div>

      <div className="grid-2">
        <FormInput
          label="Area / Locality"
          id="location-area"
          name="location"
          required
          placeholder="e.g. Koramangala 5th Block, Indiranagar"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          error={errors.location}
        />

        <FormInput
          label="City"
          id="location-city"
          name="city"
          required
          placeholder="e.g. Bangalore"
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          error={errors.city}
        />
      </div>

      <FormInput
        label="Specific Landmark or Street Address"
        id="location-address"
        name="address"
        placeholder="e.g. Opposite Community Park, Gate No. 2"
        value={address}
        onChange={(e) => onAddressChange(e.target.value)}
        helperText={
          coordinates
            ? `Selected GPS Coordinates: ${coordinates.lat}, ${coordinates.lng}`
            : 'Provide nearby landmarks to help sanitation workers locate the dump site quickly.'
        }
      />
    </fieldset>
  );
}

export default LocationInput;
