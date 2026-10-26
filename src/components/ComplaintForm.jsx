// ComplaintForm Component

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useComplaints } from '../context/ComplaintContext';
import ImageUploader from './ImageUploader';
import LocationInput from './LocationInput';
import FormSelect from './common/FormSelect';
import FormTextarea from './common/FormTextarea';
import FormError from './common/FormError';
import Button from './Button';
import ReportMap from './ReportMap';

const GARBAGE_TYPES = [
  'Household Waste',
  'Plastic Waste',
  'Construction Waste',
  'Food Waste',
  'Mixed Waste',
  'Hazardous / Medical Waste',
  'Other',
];

const PRIORITY_LEVELS = [
  { value: 'low', label: '🟢 Low — Minor accumulation, no health risk' },
  { value: 'medium', label: '🟡 Medium — Moderate pile, mild odour' },
  { value: 'high', label: '🟠 High — Large dump, strong smell, pest activity' },
  { value: 'critical', label: '🔴 Critical — Hazardous, blocking road, public health risk' },
];

/* Reusable section wrapper */
function FormSection({ number, title, subtitle, children }) {
  return (
    <div style={{
      marginBottom: '32px', paddingBottom: '28px',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <span style={{
          width: '32px', height: '32px', borderRadius: '8px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--primary)',
          fontSize: '0.85rem', fontWeight: 800, flexShrink: 0,
        }}>
          {number}
        </span>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--dark)', margin: 0 }}>{title}</h3>
          {subtitle && <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

function ComplaintForm() {
  const navigate = useNavigate();
  const { addComplaint, isSubmitting, complaints } = useComplaints();

  // --- Form State ---
  const [image, setImage] = useState(null);
  const [_imageName, setImageName] = useState('');
  const [garbageType, setGarbageType] = useState('');
  const [priority, setPriority] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState(null);

  // --- UI & Validation State ---
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState('');
  const [copied, setCopied] = useState(false);

  // Clear specific error when user modifies input
  const clearFieldError = (fieldName) => {
    if (errors[fieldName]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      });
    }
  };

  const handleImageChange = (imageData, fileName) => {
    setImage(imageData);
    setImageName(fileName || '');
    if (imageData) clearFieldError('image');
  };

  // --- Validation ---
  const validate = () => {
    const newErrors = {};
    if (!image) newErrors.image = 'Please upload a photo of the garbage site.';
    if (!garbageType) newErrors.garbageType = 'Please select a garbage category.';
    if (!description.trim()) {
      newErrors.description = 'Please describe the garbage problem.';
    } else if (description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters long.';
    } else if (description.trim().length > 500) {
      newErrors.description = 'Description cannot exceed 500 characters.';
    }
    if (!location.trim()) newErrors.location = 'Please enter the neighborhood or locality.';
    if (!city.trim()) newErrors.city = 'Please enter the city name.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!validate()) return;

    try {
      const createdComplaint = await addComplaint({
        image,
        garbageType,
        priority: priority || 'medium',
        description: description.trim(),
        location: location.trim(),
        city: city.trim(),
        address: address.trim(),
        coordinates,
      });
      setSubmittedId(createdComplaint.id);
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err.message || 'Submission failed. Please check your details and try again.');
    }
  };

  const handleCopyId = () => {
    if (submittedId) {
      navigator.clipboard.writeText(submittedId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleReset = () => {
    setImage(null); setImageName(''); setGarbageType(''); setPriority('');
    setDescription(''); setLocation(''); setCity(''); setAddress('');
    setCoordinates(null); setErrors({}); setSubmitError('');
    setIsSubmitted(false); setSubmittedId('');
  };

  // --- Completed Fields Count (mini progress) ---
  const completedFields = [image, garbageType, description.trim().length >= 10, location.trim(), city.trim()].filter(Boolean).length;
  const totalRequired = 5;

  // --- Success State ---
  if (isSubmitted) {
    return (
      <div className="card" role="status" aria-live="polite" style={{ padding: '48px 32px', textAlign: 'center' }}>
        <div style={{
          width: '72px', height: '72px', borderRadius: '50%', margin: '0 auto 20px',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
        }}>
          <span style={{ fontSize: '2rem', color: 'white' }}>✓</span>
        </div>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--dark)', marginBottom: '8px' }}>
          Report Submitted Successfully
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '440px', margin: '0 auto', lineHeight: 1.6 }}>
          Your garbage complaint has been logged and sent to the municipal assignment queue.
          You can track real-time progress using the tracking ID below.
        </p>

        <div style={{
          margin: '28px auto', padding: '20px', maxWidth: '380px',
          backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid var(--border)',
        }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Complaint Tracking ID
          </span>
          <div style={{
            fontSize: '1.4rem', fontWeight: 800, color: 'var(--dark)', margin: '8px 0',
            fontFamily: 'monospace', letterSpacing: '1px',
          }}>
            {submittedId}
          </div>
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={handleCopyId}
          >
            {copied ? '✓ Copied!' : '📋 Copy ID'}
          </button>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '24px' }}>
          <Button variant="primary" onClick={handleReset}>📋 Submit Another Report</Button>
          <Button variant="secondary" onClick={() => navigate('/track')}>🔍 Track This Complaint</Button>
          <Button variant="secondary" onClick={() => navigate('/citizen')}>👤 My Dashboard</Button>
        </div>
      </div>
    );
  }

  // --- Form View ---
  return (
    <form onSubmit={handleSubmit} noValidate className="card" style={{ padding: '36px 32px' }}>
      {/* Submission-level error banner */}
      {submitError && (
        <div style={{
          padding: '14px 18px', marginBottom: '28px', borderRadius: '8px',
          backgroundColor: '#fef2f2', border: '1px solid #fca5a5',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <span style={{ fontSize: '1.2rem' }}>⚠️</span>
          <FormError message={submitError} />
        </div>
      )}

      {/* Progress bar */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Form Progress
          </span>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: completedFields === totalRequired ? 'var(--success)' : 'var(--text-muted)' }}>
            {completedFields}/{totalRequired} required fields
          </span>
        </div>
        <div style={{ height: '6px', borderRadius: '3px', backgroundColor: '#e2e8f0', overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: '3px',
            width: `${(completedFields / totalRequired) * 100}%`,
            backgroundColor: completedFields === totalRequired ? 'var(--success)' : 'var(--primary)',
            transition: 'width 0.4s ease',
          }} />
        </div>
      </div>

      {/* Section 1: Photo Evidence */}
      <FormSection number="1" title="Photo Evidence" subtitle="Upload a clear photo of the garbage site">
        <ImageUploader
          image={image}
          onImageChange={handleImageChange}
          error={errors.image}
        />
      </FormSection>

      {/* Section 2: Waste Classification */}
      <FormSection number="2" title="Waste Classification" subtitle="Help us route your report to the right team">
        <FormSelect
          label="Garbage Category"
          id="garbage-type"
          name="garbageType"
          required
          placeholder="Select waste category..."
          value={garbageType}
          options={GARBAGE_TYPES}
          onChange={(e) => {
            setGarbageType(e.target.value);
            clearFieldError('garbageType');
          }}
          error={errors.garbageType}
        />

        <div className="form-group" style={{ marginTop: '16px' }}>
          <label htmlFor="priority" style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '6px', color: 'var(--text-main)' }}>
            Severity Level <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.82rem' }}>(optional)</span>
          </label>
          <select
            id="priority"
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{
              width: '100%', padding: '10px 12px', borderRadius: '8px',
              border: '1px solid var(--border)', fontSize: '0.9rem',
              backgroundColor: 'white', color: 'var(--text-main)',
              cursor: 'pointer',
            }}
          >
            <option value="">Select severity...</option>
            {PRIORITY_LEVELS.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>

        <FormTextarea
          label="Problem Description"
          id="description"
          name="description"
          required
          placeholder="Describe the issue — approximate volume, smell, pest activity, road obstruction..."
          value={description}
          maxLength={500}
          onChange={(e) => {
            setDescription(e.target.value);
            clearFieldError('description');
          }}
          error={errors.description}
        />
      </FormSection>

      {/* Section 3: Location Details */}
      <FormSection number="3" title="Location Details" subtitle="Provide the exact location for dispatch accuracy">
        <LocationInput
          location={location}
          city={city}
          address={address}
          coordinates={coordinates}
          errors={errors}
          onLocationChange={(val) => {
            setLocation(val);
            clearFieldError('location');
          }}
          onCityChange={(val) => {
            setCity(val);
            clearFieldError('city');
          }}
          onAddressChange={(val) => setAddress(val)}
          onCoordinatesChange={(coords) => setCoordinates(coords)}
        />

        {/* Map */}
        <ReportMap
          selectedCoordinates={coordinates}
          onSelectCoordinates={(coords) => {
            setCoordinates(coords);
            if (!address) {
              setAddress(`Pinned on Map (Lat: ${coords.lat}, Lng: ${coords.lng})`);
            }
          }}
          existingComplaints={complaints}
        />
      </FormSection>

      {/* Submit */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '16px',
        paddingTop: '4px',
      }}>
        <Button variant="primary" size="lg" type="submit" disabled={isSubmitting}>
          {isSubmitting ? '⏳ Submitting Report...' : '📋 Submit Garbage Report'}
        </Button>

        {isSubmitting && (
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Connecting to municipal service...
          </span>
        )}
      </div>

      {/* Disclaimer */}
      <p style={{
        fontSize: '0.78rem', color: '#94a3b8', marginTop: '20px', lineHeight: 1.6,
        borderTop: '1px solid var(--border)', paddingTop: '16px',
      }}>
        By submitting this report, you confirm that the information provided is accurate to the
        best of your knowledge. False or misleading reports may result in action under municipal
        civic regulations. All data is handled per our privacy policy.
      </p>
    </form>
  );
}

export default ComplaintForm;
