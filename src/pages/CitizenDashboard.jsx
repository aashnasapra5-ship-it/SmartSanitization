/* ========================================
   Citizen Dashboard Page
   ========================================
   Route: /citizen
   
   Demonstrates: useState (filter), useEffect (loading from localStorage),
   .map() and .filter() array methods, props, component composition,
   conditional rendering, reusable components
   ======================================== */

import { useState, useEffect } from 'react';
import StatsCard from '../components/StatsCard';
import FilterBar from '../components/FilterBar';
import ComplaintCard from '../components/ComplaintCard';
import ComplaintDetails from '../components/ComplaintDetails';
import { getComplaints, filterComplaints, countByStatus, updateComplaint } from '../utils/helpers';

function CitizenDashboard() {
  // State: all complaints loaded from localStorage
  const [complaints, setComplaints] = useState([]);
  // State: current filter selection
  const [filter, setFilter] = useState('All');
  // State: selected complaint for details modal
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  // State: is details modal open
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // useEffect: Load complaints from localStorage when the page loads
  useEffect(function () {
    const storedComplaints = getComplaints();
    setComplaints(storedComplaints);
  }, []);

  // Filter complaints based on selected filter
  const filteredComplaints = filterComplaints(complaints, filter);

  // Count complaints by status for stats cards
  const counts = countByStatus(complaints);

  // Handle filter change
  function handleFilterChange(newFilter) {
    setFilter(newFilter);
  }

  // Handle viewing complaint details
  function handleViewDetails(complaint) {
    setSelectedComplaint(complaint);
    setIsDetailsOpen(true);
  }

  // Handle closing details modal
  function handleCloseDetails() {
    setIsDetailsOpen(false);
    setSelectedComplaint(null);
  }

  // Handle updating a complaint (from details modal)
  function handleUpdateComplaint(id, updates) {
    const updatedList = updateComplaint(id, updates);
    setComplaints(updatedList);
    // Update the selected complaint to reflect changes
    const updatedComplaint = updatedList.find(function (c) { return c.id === id; });
    setSelectedComplaint(updatedComplaint);
  }

  return (
    <main className="page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>👤 Citizen Dashboard</h1>
          <p>View and track all your garbage complaints in one place.</p>
        </div>

        {/* Statistics Cards */}
        <section className="stats-grid" aria-label="Complaint statistics">
          <StatsCard title="Total Reports" value={counts.Total} variant="primary" />
          <StatsCard title="Pending" value={counts.Pending} variant="warning" />
          <StatsCard title="Assigned" value={counts.Assigned} variant="info" />
          <StatsCard title="Cleaning" value={counts.Cleaning} variant="danger" />
          <StatsCard title="Resolved" value={counts.Resolved} variant="success" />
        </section>

        {/* Filter Bar */}
        <FilterBar filter={filter} onFilterChange={handleFilterChange} />

        {/* Complaints Grid */}
        <section aria-label="Complaint list">
          {filteredComplaints.length > 0 ? (
            <div className="grid-3">
              {filteredComplaints.map(function (complaint) {
                return (
                  <ComplaintCard
                    key={complaint.id}
                    complaint={complaint}
                    onViewDetails={handleViewDetails}
                  />
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>No complaints found</h3>
              <p>
                {filter === 'All'
                  ? 'No complaints have been submitted yet.'
                  : 'No complaints with status "' + filter + '" found.'}
              </p>
            </div>
          )}
        </section>

        {/* Complaint Details Modal */}
        <ComplaintDetails
          complaint={selectedComplaint}
          isOpen={isDetailsOpen}
          onClose={handleCloseDetails}
          onUpdate={handleUpdateComplaint}
        />
      </div>
    </main>
  );
}

export default CitizenDashboard;
