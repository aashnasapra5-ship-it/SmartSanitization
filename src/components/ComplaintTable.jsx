/* ========================================
   ComplaintTable Component
   ========================================
   Demonstrates: Props (complaints, onAssign, onView),
   .map() with arrays, semantic HTML (<table>),
   conditional rendering, responsive design
   Used in Municipal Dashboard
   ======================================== */

import StatusBadge from './StatusBadge';
import Button from './Button';
import { formatDate } from '../utils/helpers';

function ComplaintTable({ complaints, onAssign, onView }) {
  if (complaints.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📋</div>
        <h3>No complaints found</h3>
        <p>No complaints match the current filter.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Complaint ID</th>
            <th>Location</th>
            <th>Garbage Type</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map(function (complaint) {
            return (
              <tr key={complaint.id}>
                <td style={{ fontWeight: 600, color: 'var(--primary)' }}>
                  {complaint.id}
                </td>
                <td>{complaint.location}</td>
                <td>{complaint.garbageType}</td>
                <td>{formatDate(complaint.createdAt)}</td>
                <td>
                  <StatusBadge status={complaint.status} />
                </td>
                <td>
                  {/* Show "Assign" button for Pending/Verified, "View" for others */}
                  {(complaint.status === 'Pending' || complaint.status === 'Verified') ? (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={function () { onAssign(complaint); }}
                    >
                      Assign
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={function () { onView(complaint); }}
                    >
                      View
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ComplaintTable;
