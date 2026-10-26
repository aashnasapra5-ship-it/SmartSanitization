// NotFound Page

import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="page not-found-page">
      <div className="container" style={{ textAlign: 'center', maxWidth: '640px', padding: '60px 20px' }}>
        <div style={{ fontSize: '4.5rem', marginBottom: '16px', lineHeight: 1 }}>🏙️⚠️</div>
        <span
          style={{
            display: 'inline-block',
            padding: '4px 12px',
            backgroundColor: 'var(--surface-alt)',
            color: 'var(--text-muted)',
            borderRadius: '9999px',
            fontSize: '0.875rem',
            fontWeight: 700,
            marginBottom: '16px',
            border: '1px solid var(--border)',
          }}
        >
          ERROR 404 — ROUTE NOT FOUND
        </span>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '16px', color: 'var(--dark)' }}>
          Page Not Found
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '32px', lineHeight: 1.6 }}>
          The page or path you are looking for does not exist in the Smart Sanitization system.
          It might have been moved, renamed, or you may have typed an incorrect URL.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary btn-lg">
            🏠 Return to Home
          </Link>
          <Link to="/report" className="btn btn-secondary btn-lg">
            📋 Report Garbage
          </Link>
          <Link to="/track" className="btn btn-secondary btn-lg">
            🔍 Track Complaint
          </Link>
        </div>

        <div style={{ marginTop: '48px', padding: '20px', backgroundColor: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '8px', color: 'var(--text-main)' }}>Looking for something specific?</h4>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Use the navigation bar at the top or visit the Citizen Dashboard to review neighborhood complaints.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
