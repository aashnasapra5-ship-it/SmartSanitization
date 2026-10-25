// TrackComplaint Page

import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useComplaints } from '../context/ComplaintContext';
import { formatDate, getStatusClass } from '../utils/helpers';
import FormInput from '../components/common/FormInput';
import Button from '../components/Button';

function TrackComplaint() {
  const [searchParams] = useSearchParams();
  const { getComplaintById, complaints } = useComplaints();

  const [searchId, setSearchId] = useState('');
  const [complaint, setComplaint] = useState(null);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  // Handle URL query parameter ?id=...
  useEffect(() => {
    const urlId = searchParams.get('id');
    if (urlId) {
      setSearchId(urlId);
      const found = getComplaintById(urlId);
      setComplaint(found);
      setSearched(true);
    }
  }, [searchParams, getComplaintById]);

  // Keep displayed complaint in sync with central state updates
  useEffect(() => {
    if (searched && searchId) {
      const refreshed = getComplaintById(searchId);
      setComplaint(refreshed);
    }
  }, [complaints, searched, searchId, getComplaintById]);

  function handleSearch(e) {
    e.preventDefault();
    const cleanId = searchId.trim().toUpperCase();

    if (!cleanId) {
      setError('Please enter a valid Complaint ID (e.g. SS-20240820-AB12).');
      setComplaint(null);
      setSearched(false);
      return;
    }

    setError('');
    const found = getComplaintById(cleanId);
    setComplaint(found);
    setSearched(true);
  }

  // Calculate timeline step index
  const statusSteps = ['Pending', 'Assigned', 'In Progress', 'Resolved'];
  const currentStepIndex = complaint ? statusSteps.indexOf(complaint.status) : 0;

  return (
    <main className="page">
      <div className="container">
        <div className="page-header">
          <h1>🔍 Track Complaint</h1>
          <p>Check the live resolution status, assigned sanitation workers, and verification history.</p>
        </div>

        {/* Search Bar */}
        <section style={{ maxWidth: '640px', marginBottom: '36px' }}>
          <form
            onSubmit={handleSearch}
            className="card"
            style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flexWrap: 'wrap' }}
          >
            <div style={{ flex: 1, minWidth: '260px' }}>
              <FormInput
                label="Complaint Tracking ID"
                id="search-complaint-id"
                name="searchId"
                placeholder="Enter ID (e.g. SS-20240820-AB12)"
                value={searchId}
                onChange={(e) => {
                  setSearchId(e.target.value);
                  if (error) setError('');
                }}
                error={error}
              />
            </div>
            <div style={{ marginTop: '28px' }}>
              <Button variant="primary" type="submit">
                Search Status
              </Button>
            </div>
          </form>

          {/* Quick lookup suggestions */}
          <div style={{ marginTop: '12px', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            <span>Recent sample IDs: </span>
            {complaints.slice(0, 3).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSearchId(item.id);
                  setComplaint(item);
                  setSearched(true);
                  setError('');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--secondary)',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  marginRight: '8px',
                  fontFamily: 'monospace',
                }}
              >
                {item.id}
              </button>
            ))}
          </div>
        </section>

        {/* Search Results */}
        {searched && (
          <section style={{ maxWidth: '780px' }}>
            {complaint ? (
              <div className="card" style={{ borderTop: '4px solid var(--primary)', padding: '32px' }}>
                {/* Header Information */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>COMPLAINT RECORD</span>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--dark)' }}>{complaint.id}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      Reported on {formatDate(complaint.createdAt)}
                    </p>
                  </div>
                  <span className={`status-badge ${getStatusClass(complaint.status)}`} style={{ fontSize: '0.95rem', padding: '6px 16px' }}>
                    ● {complaint.status}
                  </span>
                </div>

                {/* Visual Status Progress Stepper */}
                <div style={{ margin: '24px 0 32px', padding: '16px 20px', backgroundColor: 'var(--surface-alt)', borderRadius: 'var(--radius)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                    {statusSteps.map((step, idx) => {
                      const isCompleted = idx <= currentStepIndex;
                      const isCurrent = idx === currentStepIndex;
                      return (
                        <div key={step} style={{ textAlign: 'center', flex: 1, zIndex: 2 }}>
                          <div
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              backgroundColor: isCompleted ? 'var(--primary)' : '#cbd5e1',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              margin: '0 auto 6px',
                              fontWeight: 700,
                              fontSize: '0.8rem',
                              boxShadow: isCurrent ? '0 0 0 4px var(--primary-light)' : 'none',
                            }}
                          >
                            {isCompleted ? '✓' : idx + 1}
                          </div>
                          <span
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: isCurrent ? 700 : 500,
                              color: isCompleted ? 'var(--dark)' : 'var(--text-muted)',
                            }}
                          >
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Complaint Details Grid */}
                <div className="grid-2" style={{ marginBottom: '20px' }}>
                  <div>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>GARBAGE CATEGORY</strong>
                    <p style={{ fontSize: '1rem', fontWeight: 600 }}>{complaint.garbageType}</p>
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>LOCATION AREA</strong>
                    <p style={{ fontSize: '1rem', fontWeight: 600 }}>
                      {complaint.location}, {complaint.city}
                    </p>
                  </div>
                </div>

                {complaint.address && (
                  <div style={{ marginBottom: '20px' }}>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>ADDRESS / LANDMARK</strong>
                    <p style={{ fontSize: '0.95rem' }}>{complaint.address}</p>
                  </div>
                )}

                {complaint.coordinates && (
                  <div style={{ marginBottom: '20px' }}>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>GEO-COORDINATES</strong>
                    <p style={{ fontSize: '0.9rem', fontFamily: 'monospace' }}>
                      Latitude: {complaint.coordinates.lat}, Longitude: {complaint.coordinates.lng}
                    </p>
                  </div>
                )}

                <div style={{ marginBottom: '24px' }}>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>DESCRIPTION</strong>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.6, marginTop: '4px', backgroundColor: 'var(--surface-alt)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
                    {complaint.description}
                  </p>
                </div>

                {/* Image Preview if present */}
                {complaint.image && (
                  <div style={{ marginBottom: '24px' }}>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                      REPORTED PHOTO
                    </strong>
                    <img
                      src={complaint.image}
                      alt="Reported garbage"
                      style={{ maxHeight: '200px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                    />
                  </div>
                )}

                {/* Assigned Action Team Card */}
                <div style={{ backgroundColor: 'var(--surface-alt)', padding: '20px', borderRadius: 'var(--radius)', borderLeft: '4px solid var(--info)' }}>
                  <h4 style={{ marginBottom: '10px', fontSize: '1rem', color: 'var(--dark)' }}>
                    🏛️ Municipal Action & Assignment
                  </h4>
                  {complaint.assignedEmployee ? (
                    <div style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <p>
                        <strong>Assigned Sanitation Worker:</strong> {complaint.assignedEmployee}
                      </p>
                      {complaint.vehicle && (
                        <p>
                          <strong>Assigned Collection Vehicle:</strong> {complaint.vehicle}
                        </p>
                      )}
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                        Field status: {complaint.status}. Monitored by Municipal Ward Office.
                      </p>
                    </div>
                  ) : (
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      ⏳ Status: <strong>Pending Assignment</strong>. Municipal officers are reviewing the report and will assign a cleanup vehicle shortly.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>🔍❓</div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>No Complaint Found</h3>
                <p style={{ color: 'var(--text-muted)', maxWidth: '440px', margin: '8px auto 24px', lineHeight: 1.6 }}>
                  We could not find any active complaint matching ID "<strong>{searchId}</strong>". Please verify the ID or check your confirmation notice.
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  <Link to="/report" className="btn btn-primary">
                    📋 Report New Issue
                  </Link>
                  <Link to="/citizen" className="btn btn-secondary">
                    👤 View All Citizen Complaints
                  </Link>
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

export default TrackComplaint;
