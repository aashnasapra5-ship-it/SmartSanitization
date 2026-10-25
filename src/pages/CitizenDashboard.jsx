// CitizenDashboard Page

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useComplaints } from '../context/ComplaintContext';
import { formatDate, getStatusClass } from '../utils/helpers';
import FormInput from '../components/common/FormInput';

function CitizenDashboard() {
  const { complaints, isLoading, error, loadComplaints } = useComplaints();
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Local filtering & searching logic
  const filteredComplaints = complaints.filter((c) => {
    const matchesFilter = filter === 'All' ? true : c.status === filter;
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !query ||
      c.id.toLowerCase().includes(query) ||
      c.location.toLowerCase().includes(query) ||
      c.city.toLowerCase().includes(query) ||
      c.garbageType.toLowerCase().includes(query) ||
      c.description.toLowerCase().includes(query);

    return matchesFilter && matchesQuery;
  });

  // Calculate dynamic civic statistics
  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === 'Pending').length;
  const inProgress = complaints.filter(
    (c) => c.status === 'In Progress' || c.status === 'Assigned'
  ).length;
  const resolved = complaints.filter((c) => c.status === 'Resolved').length;

  return (
    <main className="page citizen-dashboard-page">
      <div className="container">
        {/* Header */}
        <div
          className="page-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <h1>👤 Citizen Dashboard</h1>
            <p>Community overview of active garbage reports, response progress, and cleanups.</p>
          </div>
          <Link to="/report" className="btn btn-primary btn-lg">
            ➕ Report New Garbage
          </Link>
        </div>

        {/* Global Error Banner */}
        {error && (
          <div
            className="card"
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid var(--danger)',
              marginBottom: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <strong style={{ color: 'var(--danger)' }}>Network Error: </strong>
              <span>{error}</span>
            </div>
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={loadComplaints}
            >
              🔄 Retry
            </button>
          </div>
        )}

        {/* Dynamic Metric Counter Cards */}
        <div className="grid-4" style={{ marginBottom: '32px' }}>
          <div className="card">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>
              TOTAL CITIZEN REPORTS
            </span>
            <div style={{ fontSize: '2.25rem', fontWeight: 800, marginTop: '4px', color: 'var(--dark)' }}>
              {isLoading ? '...' : total}
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Community verified</span>
          </div>

          <div className="card">
            <span style={{ fontSize: '0.8rem', color: 'var(--warning)', fontWeight: 700 }}>
              PENDING MUNICIPAL REVIEW
            </span>
            <div style={{ fontSize: '2.25rem', fontWeight: 800, marginTop: '4px', color: 'var(--warning)' }}>
              {isLoading ? '...' : pending}
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Awaiting team assignment</span>
          </div>

          <div className="card">
            <span style={{ fontSize: '0.8rem', color: 'var(--info)', fontWeight: 700 }}>
              ASSIGNED / IN PROGRESS
            </span>
            <div style={{ fontSize: '2.25rem', fontWeight: 800, marginTop: '4px', color: 'var(--info)' }}>
              {isLoading ? '...' : inProgress}
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Vehicles dispatched</span>
          </div>

          <div className="card">
            <span style={{ fontSize: '0.8rem', color: 'var(--success)', fontWeight: 700 }}>
              RESOLVED & RESTORED
            </span>
            <div style={{ fontSize: '2.25rem', fontWeight: 800, marginTop: '4px', color: 'var(--success)' }}>
              {isLoading ? '...' : resolved}
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sites fully cleared</span>
          </div>
        </div>

        {/* Filter and Search Controls */}
        <div
          className="card"
          style={{
            marginBottom: '24px',
            padding: '16px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {/* Status Filter Buttons */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['All', 'Pending', 'Assigned', 'In Progress', 'Resolved'].map((status) => (
              <button
                key={status}
                type="button"
                className={`btn btn-sm ${filter === status ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div style={{ minWidth: '260px' }}>
            <FormInput
              placeholder="Filter by locality, ID, or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Complaints Table / List */}
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Complaint ID</th>
                <th>Waste Category</th>
                <th>Locality & City</th>
                <th>Reported On</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    ⏳ Loading citizen complaints from central state...
                  </td>
                </tr>
              ) : filteredComplaints.length > 0 ? (
                filteredComplaints.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <Link
                        to={`/track?id=${item.id}`}
                        style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}
                      >
                        {item.id}
                      </Link>
                    </td>
                    <td>{item.garbageType}</td>
                    <td>
                      <div>{item.location}</div>
                      <small style={{ color: 'var(--text-muted)' }}>{item.city}</small>
                    </td>
                    <td>{formatDate(item.createdAt)}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <Link
                        to={`/track?id=${item.id}`}
                        className="btn btn-sm btn-secondary"
                        title="Track resolution progress"
                      >
                        Track Status →
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>📂</div>
                    <strong>No complaints found</strong>
                    <p style={{ fontSize: '0.875rem', marginTop: '4px' }}>
                      {searchQuery
                        ? `No reports matched your search "${searchQuery}".`
                        : `No complaints currently marked as "${filter}".`}
                    </p>
                    {(searchQuery || filter !== 'All') && (
                      <button
                        type="button"
                        className="btn btn-sm btn-secondary"
                        onClick={() => {
                          setFilter('All');
                          setSearchQuery('');
                        }}
                        style={{ marginTop: '12px' }}
                      >
                        Reset Filters
                      </button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default CitizenDashboard;
