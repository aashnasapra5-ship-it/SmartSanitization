/* ========================================
   ComplaintCard Component
   ========================================
   Demonstrates: Props (complaint, onViewDetails),
   reusable component, JSX, conditional rendering
   Used in Citizen Dashboard to display each complaint
   ======================================== */

import StatusBadge from './StatusBadge';
import Button from './Button';
import { formatDate } from '../utils/helpers';

function ComplaintCard({ complaint, onViewDetails }) {
  return (
    <article className="complaint-card">
      {/* Complaint Image */}
      {complaint.image ? (
        <img
          className="complaint-card-image"
          src={complaint.image}
          alt={'Garbage at ' + complaint.location}
        />
      ) : (
        <div
          className="complaint-card-image"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            color: 'var(--text-light)',
          }}
        >
          🗑️
        </div>
      )}

      {/* Card Body */}
      <div className="complaint-card-body">
        {/* ID and Status */}
        <div className="complaint-card-header">
          <span className="complaint-card-id">{complaint.id}</span>
          <StatusBadge status={complaint.status} />
        </div>

        {/* Meta Information */}
        <div className="complaint-card-meta">
          <span>📍 {complaint.location}</span>
          <span>{complaint.garbageType}</span>
        </div>

        {/* Date */}
        <div className="complaint-card-meta">
          <span>🗓️ {formatDate(complaint.createdAt)}</span>
        </div>

        {/* Footer with Action Button */}
        <div className="complaint-card-footer">
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {complaint.city}
          </span>
          <Button variant="secondary" size="sm" onClick={function () { onViewDetails(complaint); }}>
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
}

export default ComplaintCard;
