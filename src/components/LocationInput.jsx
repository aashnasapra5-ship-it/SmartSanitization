/* ========================================
   LocationInput Component
   ========================================
   Demonstrates: Props (controlled inputs), semantic HTML (<label>, <input>),
   reusable form section
   ======================================== */

function LocationInput({ location, city, address, onLocationChange, onCityChange, onAddressChange }) {
  /*
    Props are used for controlled inputs — the parent component
    manages the state, and this component receives values via props
    and reports changes back via callback functions.
  */

  function handleUseMyLocation() {
    // For Evaluation 1, this uses mock/demo location data
    // In future evaluations, this will use real GPS via navigator.geolocation
    onLocationChange('Sector 12, Near Central Park');
    onCityChange('Rajpura');
    onAddressChange('Auto-detected location (demo)');
  }

  return (
    <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
      <legend className="form-label" style={{ marginBottom: '16px' }}>Location Details *</legend>

      <div className="form-group">
        <label className="form-label" htmlFor="location-area">
          Area / Locality
        </label>
        <input
          type="text"
          id="location-area"
          className="form-input"
          placeholder="e.g. Sector 4, Market Road"
          value={location}
          onChange={function (e) { onLocationChange(e.target.value); }}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="location-city">
          City
        </label>
        <input
          type="text"
          id="location-city"
          className="form-input"
          placeholder="e.g. Rajpura"
          value={city}
          onChange={function (e) { onCityChange(e.target.value); }}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="location-address">
          Address / Landmark
        </label>
        <input
          type="text"
          id="location-address"
          className="form-input"
          placeholder="e.g. Near City Hospital, Gate No. 3"
          value={address}
          onChange={function (e) { onAddressChange(e.target.value); }}
        />
      </div>

      <button
        type="button"
        className="btn btn-secondary btn-sm"
        onClick={handleUseMyLocation}
      >
        📍 Use My Location (Demo)
      </button>
    </fieldset>
  );
}

export default LocationInput;
