/* ========================================
   Municipal Dashboard Page
   ========================================
   Route: /municipal
   
   Demonstrates: useState (filter, modal states), useEffect (loading/seeding mock data),
   .map() and .filter() array methods, props, component composition,
   ComplaintTable, AssignModal, ComplaintDetails, StatsCard, FilterBar
   ======================================== */

import { useState, useEffect } from 'react';
import StatsCard from '../components/StatsCard';
import FilterBar from '../components/FilterBar';
import ComplaintTable from '../components/ComplaintTable';
import AssignModal from '../components/AssignModal';
import ComplaintDetails from '../components/ComplaintDetails';
import { getComplaints, saveComplaints, filterComplaints, countByStatus, updateComplaint } from '../utils/helpers';
import { mockComplaints } from '../data/mockData';

function MunicipalDashboard() {
  // State: all complaints
  const [complaints, setComplaints] = useState([]);
  // State: current filter
  const [filter, setFilter] = useState('All');
  // State: selected complaint for Assign modal
  const [assignComplaint, setAssignComplaint] = useState(null);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  // State: selected complaint for View Details modal
  const [viewComplaint, setViewComplaint] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  // useEffect: Load complaints from localStorage, seed mock data if empty
  useEffect(function () {
    const stored = getComplaints();
    if (stored.length === 0) {
      saveComplaints(mockComplaints);
      setComplaints(mockComplaints);
    } else {
      setComplaints(stored);
    }
  }, []);

  // Filter complaints
  const filteredComplaints = filterComplaints(complaints, filter);

  // Calculate statistics
  const counts = countByStatus(complaints);

  // Handle filter selection
  function handleFilterChange(newFilter) {
    setFilter(newFilter);
  }

  // Open assign modal
  function handleOpenAssign(complaint) {
    setAssignComplaint(complaint);
    setIsAssignOpen(true);
  }

  // Close assign modal
  function handleCloseAssign() {
    setIsAssignOpen(false);
    setAssignComplaint(null);
  }

  // Submit assignment
  function handleAssignSubmit(id, employee, vehicle) {
    const updatedList = updateComplaint(id, {
      status: 'Assigned',
      assignedEmployee: employee,
      vehicle: vehicle,
    });
    setComplaints(updatedList);
    handleCloseAssign();
  }

  // Open view details modal
  function handleOpenView(complaint) {
    setViewComplaint(complaint);
    setIsViewOpen(true);
  }

  // Close view details modal
  function handleCloseView() {
    setIsViewOpen(false);
    setViewComplaint(null);
  }

  // Update complaint from details modal (e.g. employee workflow: start cleaning, mark completed)
  function handleUpdateComplaint(id, updates) {
    const updatedList = updateComplaint(id, updates);
    setComplaints(updatedList);

    // Keep active viewing modal in sync with updated status
    const updatedObj = updatedList.find(function (c) { return c.id === id; });
    setViewComplaint(updatedObj);
  }

  return (
    <main className="page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>🏛️ Municipal Officer Dashboard</h1>
          <p>Manage civic garbage complaints, assign sanitation staff and vehicles, and monitor cleanup progress.</p>
        </div>

        {/* Statistics Cards */}
        <section className="stats-grid" aria-label="Complaint summary statistics">
          <StatsCard title="Total Reports" value={counts.Total} variant="primary" />
          <StatsCard title="Pending" value={counts.Pending} variant="warning" />
          <StatsCard title="Assigned" value={counts.Assigned} variant="info" />
          <StatsCard title="Cleaning" value={counts.Cleaning} variant="danger" />
          <StatsCard title="Resolved" value={counts.Resolved} variant="success" />
        </section>

        {/* Filter Bar */}
        <FilterBar filter={filter} onFilterChange={handleFilterChange} />

        {/* Complaint Table */}
        <section aria-label="Complaints table">
          <ComplaintTable
            complaints={filteredComplaints}
            onAssign={handleOpenAssign}
            onView={handleOpenView}
          />
        </section>

        {/* Assign Employee Modal */}
        <AssignModal
          complaint={assignComplaint}
          isOpen={isAssignOpen}
          onClose={handleCloseAssign}
          onAssign={handleAssignSubmit}
        />

        {/* Complaint Details & Workflow Modal */}
        <ComplaintDetails
          complaint={viewComplaint}
          isOpen={isViewOpen}
          onClose={handleCloseView}
          onUpdate={handleUpdateComplaint}
        />
      </div>
    </main>
  );
}

export default MunicipalDashboard;
