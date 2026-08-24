/* ========================================
   Track Complaint Page
   ========================================
   Route: /track
   
   Demonstrates: useState (search input, search result, error),
   event handling, conditional rendering, component composition
   (uses StatusTracker, StatusBadge), form handling
   ======================================== */

import { useState } from 'react';
import Button from '../components/Button';
import StatusTracker from '../components/StatusTracker';
import StatusBadge from '../components/StatusBadge';
import { findComplaintById, formatDate } from '../utils/helpers';

function TrackComplaint() {
  // State for the search input
  const [searchId, setSearchId] = useState('');
  // State for the found complaint
  const [complaint, setComplaint] = useState(null);
  // State for error message
  const [error, setError] = useState('');
  // State to track if a search has been performed
  const [hasSearched, setHasSearched] = useState(false);

  function handleSearch(event) {
    event.preventDefault();

    // Validate input
    if (!searchId.trim()) {
      setError('Please enter a Complaint ID.');
      setComplaint(null);
      setHasSearched(false);
      return;
    }

    // Search for the complaint in localStorage
    const found = findComplaintById(searchId.trim().toUpperCase());

    if (found) {
      setComplaint(found);
      setError('');
    } else {
      setComplaint(null);
      setError('No complaint found with ID "' + searchId.trim() + '". Please check the ID and try again.');
    }

    setHasSearched(true);
  }

  return (
    <main className="page">
      <div className="container">
        <div className="page-header">
          <h1>🔍 Track Your Complaint</h1>
          <p>
            Enter your Complaint ID to check the current status of your garbage report.
          </p>
        </div>

        {/* Search Form */}
        <section style={{ maxWidth: '500px', marginBottom: '32px' }}>
          <form onSubmit={handleSearch}>
            <div className="form-group">
              <label className="form-label" htmlFor="complaint-id-search">
                Complaint ID
              </label>
              <input
                type="text"
                id="complaint-id-search"
                className="form-input"
                placeholder="e.g. SS-1024"
                value={searchId}
                onChange={function (e) { setSearchId(e.target.value); }}
              />
            </div>
            <Button variant="primary" type="submit">
              Track Complaint
            </Button>
          </form>
        </section>

        {/* Error Message */}
        {error && (
          <div style={{
            padding: '16px',
            backgroundColor: 'var(--danger-bg)',
            border: '1px solid var(--danger)',
            borderRadius: 'var(--radius)',
            color: 'var(--danger)',
            marginBottom: '24px',
            maxWidth: '600px',
          }}>
            {error}
          </div>
        )}

        {/* Complaint Result */}
        {complaint && (
          <section style={{ maxWidth: '700px' }}>
            <div className="card">
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ color: 'var(--primary)' }}>{complaint.id}</h3>
                <StatusBadge status={complaint.status} />
              </div>

              {/* Image */}
              {complaint.image && (
                <img
                  src={complaint.image}
                  alt={'Garbage at ' + complaint.location}
                  style={{
                    width: '100%',
                    maxHeight: '300px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius)',
                    marginBottom: '20px',
                  }}
                />
              )}

              {/* Details */}
              <div className="complaint-detail-row">
                <div className="complaint-detail-item">
                  <label>Garbage Type</label>
                  <span>{complaint.garbageType}</span>
                </div>
                <div className="complaint-detail-item">
                  <label>Date Reported</label>
                  <span>{formatDate(complaint.createdAt)}</span>
                </div>
              </div>

              <div className="complaint-detail-row">
                <div className="complaint-detail-item">
                  <label>Location</label>
                  <span>{complaint.location}</span>
                </div>
                <div className="complaint-detail-item">
                  <label>City</label>
                  <span>{complaint.city}</span>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
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

              {/* Status Tracker Timeline */}
              <div style={{ marginTop: '24px', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
                <h4 style={{ marginBottom: '16px' }}>Status Timeline</h4>
                <StatusTracker status={complaint.status} />
              </div>

              {/* After Cleaning Image */}
              {complaint.afterImage && (
                <div style={{ marginTop: '24px', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
                  <h4 style={{ marginBottom: '12px' }}>After Cleaning</h4>
                  <img
                    src={complaint.afterImage}
                    alt="After cleanup"
                    style={{
                      width: '100%',
                      maxHeight: '250px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius)',
                    }}
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {/* No Result Message */}
        {hasSearched && !complaint && !error && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No results found</h3>
            <p>Try searching with a different Complaint ID.</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default TrackComplaint;
