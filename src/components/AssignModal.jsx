/* ========================================
   AssignModal Component
   ========================================
   Demonstrates: Props (complaint, isOpen, onClose, onAssign),
   useState (selected employee, selected vehicle),
   event handling, form validation, modal pattern
   ======================================== */

import { useState } from 'react';
import Button from './Button';
import { mockEmployees, mockVehicles } from '../data/mockData';

function AssignModal({ complaint, isOpen, onClose, onAssign }) {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [error, setError] = useState('');

  // Don't render if modal is not open
  if (!isOpen || !complaint) {
    return null;
  }

  function handleAssign() {
    // Validation
    if (!selectedEmployee) {
      setError('Please select an employee.');
      return;
    }
    if (!selectedVehicle) {
      setError('Please select a vehicle.');
      return;
    }

    // Call parent function with the assignment data
    onAssign(complaint.id, selectedEmployee, selectedVehicle);

    // Reset state
    setSelectedEmployee('');
    setSelectedVehicle('');
    setError('');
  }

  function handleClose() {
    setSelectedEmployee('');
    setSelectedVehicle('');
    setError('');
    onClose();
  }

  // Close modal when clicking the overlay backdrop
  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-labelledby="assign-modal-title">
      <div className="modal-content">
        {/* Modal Header */}
        <div className="modal-header">
          <h3 id="assign-modal-title">Assign Employee</h3>
          <button className="modal-close" onClick={handleClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        {/* Complaint Info */}
        <div style={{ marginBottom: '20px', padding: '12px', backgroundColor: 'var(--surface-alt)', borderRadius: 'var(--radius)' }}>
          <p style={{ fontWeight: 600, color: 'var(--primary)' }}>{complaint.id}</p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            📍 {complaint.location}, {complaint.city}
          </p>
        </div>

        {/* Employee Select */}
        <div className="form-group">
          <label className="form-label" htmlFor="assign-employee">
            Select Employee
          </label>
          <select
            id="assign-employee"
            className="form-select"
            value={selectedEmployee}
            onChange={function (e) { setSelectedEmployee(e.target.value); }}
          >
            <option value="">Choose an employee</option>
            {mockEmployees.map(function (employee) {
              return (
                <option key={employee} value={employee}>{employee}</option>
              );
            })}
          </select>
        </div>

        {/* Vehicle Select */}
        <div className="form-group">
          <label className="form-label" htmlFor="assign-vehicle">
            Select Vehicle
          </label>
          <select
            id="assign-vehicle"
            className="form-select"
            value={selectedVehicle}
            onChange={function (e) { setSelectedVehicle(e.target.value); }}
          >
            <option value="">Choose a vehicle</option>
            {mockVehicles.map(function (vehicle) {
              return (
                <option key={vehicle} value={vehicle}>{vehicle}</option>
              );
            })}
          </select>
        </div>

        {/* Error Message */}
        {error && <p className="form-error">{error}</p>}

        {/* Modal Actions */}
        <div className="modal-actions">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAssign}>
            ✅ Assign Task
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AssignModal;
