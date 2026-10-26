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
        (pos) => {
          setIsLocating(false);
          const coords = {
            lat: Number(pos.coords.latitude.toFixed(4)),
            lng: Number(pos.coords.longitude.toFixed(4)),
          };
          if (onCoordinatesChange) onCoordinatesChange(coords);
          onLocationChange('Central Civic Sector');
          onCityChange('Bangalore');
          onAddressChange(`Lat: ${coords.lat}, Lng: ${coords.lng} (Device GPS Detected)`);
        },
        (_err) => {
          // Graceful fallback to simulated smart city coordinates
          setIsLocating(false);
          const demoCoords = { lat: 12.9352, lng: 77.6245 };
          if (onCoordinatesChange) onCoordinatesChange(demoCoords);
          onLocationChange('Koramangala 5th Block');
          onCityChange('Bangalore');
          onAddressChange('Near BMTC Bus Depot (Demo Coordinates Applied)');
        },
        { timeout: 4000 }
      );
    } else {
      setIsLocating(false);
      const demoCoords = { lat: 12.9352, lng: 77.6245 };
      if (onCoordinatesChange) onCoordinatesChange(demoCoords);
      onLocationChange('Koramangala 5th Block');
      onCityChange('Bangalore');
      onAddressChange('Near BMTC Bus Depot (Demo Coordinates Applied)');
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
