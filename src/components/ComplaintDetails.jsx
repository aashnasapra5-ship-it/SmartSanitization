/* ========================================
   ComplaintDetails Component (Modal)
   ========================================
   Demonstrates: Props, useState, conditional rendering,
   event handling, status transitions, image upload
   
   This simulates the employee workflow:
   - View complaint details (before image, type, location, etc.)
   - Start Cleaning → status becomes "Cleaning"
   - Upload after-cleaning image
   - Mark Completed → status becomes "Resolved"
   ======================================== */

import { useState } from 'react';
import StatusBadge from './StatusBadge';
import StatusTracker from './StatusTracker';
import Button from './Button';
import { formatDate } from '../utils/helpers';

function ComplaintDetails({ complaint, isOpen, onClose, onUpdate }) {
  const [afterImage, setAfterImage] = useState(null);

  // Don't render if modal is not open
  if (!isOpen || !complaint) {
    return null;
  }

  // Handle starting the cleanup
  function handleStartCleaning() {
    onUpdate(complaint.id, { status: 'Cleaning' });
  }

  // Handle uploading an after-cleaning image
  function handleAfterImageChange(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      setAfterImage(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  // Handle marking the complaint as completed
  function handleMarkCompleted() {
    onUpdate(complaint.id, {
      status: 'Resolved',
      afterImage: afterImage,
    });
    setAfterImage(null);
  }

  // Close modal when clicking backdrop
  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      setAfterImage(null);
      onClose();
    }
  }

  function handleClose() {
    setAfterImage(null);
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-labelledby="details-modal-title">
      <div className="modal-content" style={{ maxWidth: '640px' }}>
        {/* Modal Header */}
        <div className="modal-header">
          <h3 id="details-modal-title">Complaint Details — {complaint.id}</h3>
          <button className="modal-close" onClick={handleClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        {/* Before Image */}
        <div className="complaint-detail-section">
          <h4>Before Image</h4>
          {complaint.image ? (
            <img
              className="complaint-detail-image"
              src={complaint.image}
              alt={'Garbage at ' + complaint.location}
            />
          ) : (
            <div style={{
              height: '150px',
              backgroundColor: 'var(--surface-alt)',
              borderRadius: 'var(--radius)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-light)',
              fontSize: '1.2rem',
            }}>
              🗑️ No image uploaded
            </div>
          )}
        </div>

        {/* Complaint Info */}
        <div className="complaint-detail-section">
          <h4>Complaint Information</h4>
          <div className="complaint-detail-row">
            <div className="complaint-detail-item">
              <label>Garbage Type</label>
              <span>{complaint.garbageType}</span>
            </div>
            <div className="complaint-detail-item">
              <label>Status</label>
              <span><StatusBadge status={complaint.status} /></span>
            </div>
          </div>
          <div className="complaint-detail-row">
            <div className="complaint-detail-item">
              <label>Location</label>
              <span>{complaint.location}, {complaint.city}</span>
            </div>
            <div className="complaint-detail-item">
              <label>Date Reported</label>
              <span>{formatDate(complaint.createdAt)}</span>
            </div>
          </div>
          <div style={{ marginBottom: '12px' }}>
            <div className="complaint-detail-item">
              <label>Description</label>
              <span>{complaint.description}</span>
            </div>
          </div>
          {complaint.assignedEmployee && (
            <div className="complaint-detail-row">
              <div className="complaint-detail-item">
                <label>Assigned Employee</label>
                <span>{complaint.assignedEmployee}</span>
              </div>
              <div className="complaint-detail-item">
                <label>Vehicle</label>
                <span>{complaint.vehicle}</span>
              </div>
            </div>
          )}
        </div>

        {/* Status Tracker */}
        <div className="complaint-detail-section">
          <h4>Status Timeline</h4>
          <StatusTracker status={complaint.status} />
        </div>

        {/* After Image (if resolved) */}
        {complaint.afterImage && (
          <div className="complaint-detail-section">
            <h4>After Cleaning Image</h4>
            <img
              className="complaint-detail-image"
              src={complaint.afterImage}
              alt="After cleanup"
            />
          </div>
        )}

        {/* Employee Workflow Actions */}
        <div className="complaint-detail-section">
          <h4>Actions</h4>

          {/* Show "Start Cleaning" if status is Assigned */}
          {complaint.status === 'Assigned' && (
            <Button variant="primary" onClick={handleStartCleaning}>
              🧹 Start Cleaning
            </Button>
          )}

          {/* Show upload and "Mark Completed" if status is Cleaning */}
          {complaint.status === 'Cleaning' && (
            <div>
              <div className="form-group">
                <label className="form-label" htmlFor="after-image">
                  Upload After-Cleaning Image
                </label>
                <input
                  type="file"
                  id="after-image"
                  className="form-input"
                  accept="image/*"
                  onChange={handleAfterImageChange}
                />
              </div>

              {/* Preview after image */}
              {afterImage && (
                <div style={{ marginBottom: '16px' }}>
                  <img
                    src={afterImage}
                    alt="After cleaning preview"
                    style={{ maxHeight: '150px', borderRadius: 'var(--radius)', objectFit: 'cover' }}
                  />
                </div>
              )}

              <Button variant="primary" onClick={handleMarkCompleted}>
                ✅ Mark Completed
              </Button>
            </div>
          )}

          {/* Show resolved message */}
          {complaint.status === 'Resolved' && (
            <p style={{ color: 'var(--success)', fontWeight: 500 }}>
              ✅ This complaint has been resolved.
            </p>
          )}

          {/* Show pending message */}
          {(complaint.status === 'Pending' || complaint.status === 'Verified') && (
            <p style={{ color: 'var(--text-secondary)' }}>
              This complaint needs to be assigned to an employee first.
            </p>
          )}
        </div>

        {/* Close Button */}
        <div className="modal-actions">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ComplaintDetails;
