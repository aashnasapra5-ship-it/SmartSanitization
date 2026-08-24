/* ========================================
   ComplaintForm Component
   ========================================
   Demonstrates: useState (multiple form fields, errors, success),
   form validation, event handling (onSubmit), conditional rendering,
   controlled inputs, props composition (uses ImageUploader, LocationInput)
   
   This is one of the most important components for Evaluation 1.
   ======================================== */

import { useState } from 'react';
import ImageUploader from './ImageUploader';
import LocationInput from './LocationInput';
import Button from './Button';
import { generateComplaintId, addComplaint } from '../utils/helpers';

function ComplaintForm() {
  // --- Form State (useState) ---
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [garbageType, setGarbageType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  // --- Validation Errors State ---
  const [errors, setErrors] = useState({});

  // --- Success State ---
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState('');

  // Garbage type options
  const garbageTypes = [
    'Household Waste',
    'Plastic Waste',
    'Construction Waste',
    'Food Waste',
    'Mixed Waste',
    'Other',
  ];

  // Handle image change from ImageUploader
  function handleImageChange(imageData, fileName) {
    setImage(imageData);
    setImageName(fileName || '');
    // Clear image error when image is added
    if (imageData && errors.image) {
      const newErrors = { ...errors };
      delete newErrors.image;
      setErrors(newErrors);
    }
  }

  // --- Form Validation ---
  function validateForm() {
    const newErrors = {};

    if (!image) {
      newErrors.image = 'Please upload a garbage image.';
    }
    if (!garbageType) {
      newErrors.garbageType = 'Please select a garbage type.';
    }
    if (!description.trim()) {
      newErrors.description = 'Please provide a description.';
    } else if (description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters.';
    }
    if (!location.trim()) {
      newErrors.location = 'Please enter the area or locality.';
    }
    if (!city.trim()) {
      newErrors.city = 'Please enter the city.';
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  }

  // --- Form Submit Handler ---
  function handleSubmit(event) {
    event.preventDefault();

    // Validate before submitting
    if (!validateForm()) {
      return;
    }

    // Generate a unique complaint ID
    const complaintId = generateComplaintId();

    // Create the complaint object
    const complaint = {
      id: complaintId,
      image: image,
      garbageType: garbageType,
      description: description.trim(),
      location: location.trim(),
      city: city.trim(),
      address: address.trim(),
      status: 'Pending',
      assignedEmployee: null,
      vehicle: null,
      createdAt: new Date().toISOString(),
      afterImage: null,
    };

    // Save to localStorage
    addComplaint(complaint);

    // Show success state
    setSubmittedId(complaintId);
    setIsSubmitted(true);
  }

  // --- Reset form for new submission ---
  function handleNewReport() {
    setImage(null);
    setImageName('');
    setGarbageType('');
    setDescription('');
    setLocation('');
    setCity('');
    setAddress('');
    setErrors({});
    setIsSubmitted(false);
    setSubmittedId('');
  }

  // --- Success State ---
  if (isSubmitted) {
    return (
      <div className="success-message">
        <div style={{ fontSize: '3rem', marginBottom: '8px' }}>✅</div>
        <h3>Report Submitted Successfully!</h3>
        <p>Your garbage complaint has been registered.</p>
        <div className="complaint-id">{submittedId}</div>
        <p style={{ fontSize: '0.9rem', marginBottom: '16px' }}>
          Save this Complaint ID to track your report.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" onClick={handleNewReport}>
            Submit Another Report
          </Button>
          <Button
            variant="secondary"
            onClick={function () { window.location.href = '/track'; }}
          >
            Track Complaint
          </Button>
        </div>
      </div>
    );
  }

  // --- Form UI ---
  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Image Upload */}
      <ImageUploader image={image} onImageChange={handleImageChange} />
      {errors.image && <p className="form-error">{errors.image}</p>}

      {/* Garbage Type Dropdown */}
      <div className="form-group">
        <label className="form-label" htmlFor="garbage-type">
          Garbage Type *
        </label>
        <select
          id="garbage-type"
          className={'form-select' + (errors.garbageType ? ' error' : '')}
          value={garbageType}
          onChange={function (e) { setGarbageType(e.target.value); }}
        >
          <option value="">Select garbage type</option>
          {garbageTypes.map(function (type) {
            return (
              <option key={type} value={type}>{type}</option>
            );
          })}
        </select>
        {errors.garbageType && <p className="form-error">{errors.garbageType}</p>}
      </div>

      {/* Description Textarea */}
      <div className="form-group">
        <label className="form-label" htmlFor="description">
          Description *
        </label>
        <textarea
          id="description"
          className={'form-textarea' + (errors.description ? ' error' : '')}
          placeholder="Describe the garbage problem — location details, severity, how long it has been there..."
          value={description}
          onChange={function (e) { setDescription(e.target.value); }}
          rows={4}
        ></textarea>
        {errors.description && <p className="form-error">{errors.description}</p>}
      </div>

      {/* Location Inputs */}
      <LocationInput
        location={location}
        city={city}
        address={address}
        onLocationChange={setLocation}
        onCityChange={setCity}
        onAddressChange={setAddress}
      />
      {errors.location && <p className="form-error">{errors.location}</p>}
      {errors.city && <p className="form-error">{errors.city}</p>}

      {/* Submit Button */}
      <div style={{ marginTop: '24px' }}>
        <Button variant="primary" size="lg" type="submit">
          📋 Submit Report
        </Button>
      </div>
    </form>
  );
}

export default ComplaintForm;
