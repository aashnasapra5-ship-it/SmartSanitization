// MunicipalDashboard Page

import { useState } from 'react';
import { useComplaints } from '../context/ComplaintContext';
import { useAppStore } from '../store/useAppStore';
import { mockEmployees } from '../data/mockData';
import { formatDate, getStatusClass } from '../utils/helpers';
import FormInput from '../components/common/FormInput';
import FormSelect from '../components/common/FormSelect';
import FormError from '../components/common/FormError';
import Button from '../components/Button';

function MunicipalDashboard() {
  // --- 1. Global State from ComplaintContext ---
  const {
    complaints,
    isLoading,
    error,
    actionMessage,
    simulateError,
    loadComplaints,
    updateComplaint,
    resetToDefaultData,
    toggleSimulateError,
    clearActionMessage,
  } = useComplaints();

  // --- 2. Zustand Store (UI preference) ---
  const tableDensity = useAppStore((state) => state.tableDensity);
  const toggleTableDensity = useAppStore((state) => state.toggleTableDensity);

  // --- 3. Local Component State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest'

  // Selected complaint for the management drawer/modal
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [assignedWorker, setAssignedWorker] = useState('');
  const [status, setStatus] = useState('Pending');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState('');

  // Handle selecting a complaint to manage
  const handleSelectComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setAssignedWorker(complaint.assignedEmployee || '');
    setStatus(complaint.status || 'Pending');
    setUpdateError('');
  };

  const handleCloseDrawer = () => {
    setSelectedComplaint(null);
    setUpdateError('');
  };

  // Submit status update and worker assignment
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    setIsUpdating(true);
    setUpdateError('');

    try {
      const empObj = mockEmployees.find((emp) => emp.name === assignedWorker);
      const vehicle = empObj ? empObj.vehicle : selectedComplaint.vehicle;

      await updateComplaint(selectedComplaint.id, {
        status,
        assignedEmployee: assignedWorker || null,
        vehicle: assignedWorker ? vehicle : null,
      });

      // Keep drawer open but updated or close smoothly
      setSelectedComplaint((prev) => ({
        ...prev,
        status,
        assignedEmployee: assignedWorker || null,
        vehicle: assignedWorker ? vehicle : null,
      }));
    } catch (err) {
      setUpdateError(err.message || 'Failed to update complaint.');
    } finally {
      setIsUpdating(false);
    }
  };

  // --- Filtering & Sorting ---
  const filteredComplaints = complaints
    .filter((c) => {
      const matchesStatus = statusFilter === 'All' ? true : c.status === statusFilter;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        c.id.toLowerCase().includes(query) ||
        c.location.toLowerCase().includes(query) ||
        c.city.toLowerCase().includes(query) ||
        c.garbageType.toLowerCase().includes(query) ||
        (c.assignedEmployee && c.assignedEmployee.toLowerCase().includes(query));

      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });

  // Calculate dynamic metrics
  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === 'Pending').length;
  const assigned = complaints.filter((c) => c.status === 'Assigned').length;
  const inProgress = complaints.filter((c) => c.status === 'In Progress').length;
  const resolved = complaints.filter((c) => c.status === 'Resolved').length;

  return (
    <main className="page municipal-dashboard-page">
      <div className="container">
        {/* Page Header */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1>🏛️ Municipal Officer Dashboard</h1>
              <span
                style={{
                  fontSize: '0.75rem',
                  padding: '3px 8px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary-hover)',
                  fontWeight: 700,
                }}
              >
                State Management Mini-Project
              </span>
            </div>
            <p>
              Assign sanitation workers, dispatch collection vehicles, and verify issue resolution in real time.
            </p>
          </div>

          {/* Demonstration & Viva Controls */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className={`btn btn-sm ${simulateError ? 'btn-danger' : 'btn-secondary'}`}
              onClick={toggleSimulateError}
              title="Toggle simulated network error for testing error boundaries"
            >
              {simulateError ? '⚠️ Error Mode Active' : '🧪 Test Error Mode'}
            </button>
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={resetToDefaultData}
              title="Reset mock complaints to default seed data"
            >
              🔄 Reset Mock Data
            </button>
          </div>
        </div>

        {/* Action / Success Feedback Banner */}
        {actionMessage && (
          <div
            className="card"
            style={{
              padding: '12px 20px',
              backgroundColor: actionMessage.type === 'warning' ? '#fef3c7' : '#d1fae5',
              border: `1px solid ${actionMessage.type === 'warning' ? '#f59e0b' : '#10b981'}`,
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{actionMessage.text}</span>
            <button
              type="button"
              onClick={clearActionMessage}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Global Error Banner */}
        {error && (
          <div
            className="card"
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid var(--danger)',
              marginBottom: '20px',
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
              🔄 Retry Fetching
            </button>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid-4" style={{ marginBottom: '28px' }}>
          <div className="card">
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>
              TOTAL WORKFLOW LOAD
            </span>
            <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '2px', color: 'var(--dark)' }}>
              {isLoading ? '...' : total}
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Registered complaints</span>
          </div>

          <div className="card">
            <span style={{ fontSize: '0.75rem', color: 'var(--warning)', fontWeight: 700 }}>
              UNASSIGNED / PENDING
            </span>
            <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '2px', color: 'var(--warning)' }}>
              {isLoading ? '...' : pending}
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Needs officer action</span>
          </div>

          <div className="card">
            <span style={{ fontSize: '0.75rem', color: 'var(--info)', fontWeight: 700 }}>
              ACTIVE IN FIELD
            </span>
            <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '2px', color: 'var(--info)' }}>
              {isLoading ? '...' : assigned + inProgress}
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {assigned} assigned, {inProgress} in progress
            </span>
          </div>

          <div className="card">
            <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 700 }}>
              RESOLVED THIS CYCLE
            </span>
            <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '2px', color: 'var(--success)' }}>
              {isLoading ? '...' : resolved}
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cleaned & closed</span>
          </div>
        </div>

        {/* Filters, Search & Table Density Controls */}
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
            {['All', 'Pending', 'Assigned', 'In Progress', 'Resolved'].map((st) => (
              <button
                key={st}
                type="button"
                className={`btn btn-sm ${statusFilter === st ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setStatusFilter(st)}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Search, Sort and Density Controls */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ width: '220px' }}>
              <FormInput
                placeholder="Search ID, area, worker..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select"
              style={{ width: '130px', padding: '10px 12px' }}
              aria-label="Sort complaints by date"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>

            {/* Zustand State Demonstration: Table Density Toggle */}
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={toggleTableDensity}
              title="Toggle table row padding (Zustand UI state)"
            >
              View: {tableDensity === 'compact' ? 'Compact' : 'Comfortable'}
            </button>
          </div>
        </div>

        {/* Layout: Main Complaints Table + Assignment Inspector */}
        <div className="grid-2" style={{ alignItems: 'start', gridTemplateColumns: selectedComplaint ? '1.3fr 1fr' : '1fr' }}>
          {/* Complaints Table */}
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID / Category</th>
                  <th>Location Area</th>
                  <th>Reported Date</th>
                  <th>Status</th>
                  <th>Assigned Worker</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
                      ⏳ Loading municipal records from central state...
                    </td>
                  </tr>
                ) : filteredComplaints.length > 0 ? (
                  filteredComplaints.map((item) => {
                    const isSelected = selectedComplaint && selectedComplaint.id === item.id;
                    const paddingSize = tableDensity === 'compact' ? '8px 12px' : '14px 20px';

                    return (
                      <tr
                        key={item.id}
                        style={{
                          backgroundColor: isSelected ? 'var(--primary-light)' : 'inherit',
                          transition: 'background-color 0.2s',
                        }}
                      >
                        <td style={{ padding: paddingSize }}>
                          <strong>{item.id}</strong>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {item.garbageType}
                          </div>
                        </td>
                        <td style={{ padding: paddingSize }}>
                          <div>{item.location}</div>
                          <small style={{ color: 'var(--text-muted)' }}>{item.city}</small>
                        </td>
                        <td style={{ padding: paddingSize, fontSize: '0.85rem' }}>
                          {formatDate(item.createdAt)}
                        </td>
                        <td style={{ padding: paddingSize }}>
                          <span className={`status-badge ${getStatusClass(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td style={{ padding: paddingSize, fontSize: '0.875rem' }}>
                          {item.assignedEmployee ? (
                            <div>
                              <span>👷 {item.assignedEmployee}</span>
                              {item.vehicle && (
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                  🚚 {item.vehicle}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                              Unassigned
                            </span>
                          )}
                        </td>
                        <td style={{ padding: paddingSize }}>
                          <button
                            type="button"
                            className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => handleSelectComplaint(item)}
                          >
                            {isSelected ? 'Editing' : 'Manage →'}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--text-muted)' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>📂</div>
                      <strong>No matching complaints found</strong>
                      <p style={{ fontSize: '0.875rem', marginTop: '4px' }}>
                        Try adjusting your search query or status filter.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Management / Assignment Form Panel */}
          {selectedComplaint ? (
            <div className="card" style={{ border: '2px solid var(--primary)', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                    MANAGING RECORD
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{selectedComplaint.id}</h3>
                  <small style={{ color: 'var(--text-muted)' }}>
                    Reported on {formatDate(selectedComplaint.createdAt)}
                  </small>
                </div>
                <button
                  type="button"
                  onClick={handleCloseDrawer}
                  className="btn btn-sm btn-secondary"
                  title="Close edit panel"
                >
                  ✕ Close
                </button>
              </div>

              {updateError && (
                <div style={{ marginBottom: '16px' }}>
                  <FormError message={updateError} />
                </div>
              )}

              {/* Photo preview if available */}
              {selectedComplaint.image && (
                <div style={{ marginBottom: '16px' }}>
                  <img
                    src={selectedComplaint.image}
                    alt="Reported garbage"
                    style={{
                      maxHeight: '160px',
                      width: '100%',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border)',
                    }}
                  />
                </div>
              )}

              <div style={{ marginBottom: '16px', backgroundColor: 'var(--surface-alt)', padding: '12px', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem' }}>
                <p><strong>Category:</strong> {selectedComplaint.garbageType}</p>
                <p><strong>Location:</strong> {selectedComplaint.location}, {selectedComplaint.city}</p>
                {selectedComplaint.address && <p><strong>Address:</strong> {selectedComplaint.address}</p>}
                {selectedComplaint.coordinates && (
                  <p style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    GPS: {selectedComplaint.coordinates.lat}, {selectedComplaint.coordinates.lng}
                  </p>
                )}
                <p style={{ marginTop: '6px' }}><strong>Description:</strong> {selectedComplaint.description}</p>
              </div>

              <form onSubmit={handleSaveChanges}>
                {/* Status Selection */}
                <FormSelect
                  label="Update Complaint Status"
                  id="manage-status"
                  name="status"
                  value={status}
                  options={['Pending', 'Assigned', 'In Progress', 'Resolved']}
                  onChange={(e) => setStatus(e.target.value)}
                />

                {/* Worker Assignment Dropdown */}
                <div className="form-group">
                  <label className="form-label" htmlFor="manage-worker">
                    Assign Sanitation Worker & Vehicle
                  </label>
                  <select
                    id="manage-worker"
                    className="form-select"
                    value={assignedWorker}
                    onChange={(e) => {
                      setAssignedWorker(e.target.value);
                      if (e.target.value && status === 'Pending') {
                        setStatus('Assigned'); // automatically advance status to Assigned
                      }
                    }}
                  >
                    <option value="">-- None / Unassigned --</option>
                    {mockEmployees.map((emp) => (
                      <option key={emp.id} value={emp.name}>
                        {emp.name} — Area: {emp.area} (Vehicle: {emp.vehicle})
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isUpdating}
                  >
                    {isUpdating ? '⏳ Saving Updates...' : '💾 Save Changes'}
                  </Button>
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={handleCloseDrawer}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '48px 24px', backgroundColor: 'var(--surface-alt)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>👈</div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>Inspection & Assignment Panel</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '320px', margin: '0 auto' }}>
                Select any complaint row from the table on the left to view attached photos, assign sanitation staff, and update resolution status.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default MunicipalDashboard;
