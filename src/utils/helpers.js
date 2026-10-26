// Helpers and Utilities

const STORAGE_KEY = 'smartsanitization_complaints';

/** Generate a unique complaint ID like SS-20240824-A3F2 */
export function generateComplaintId() {
  const date = new Date();
  const datePart =
    date.getFullYear().toString() +
    String(date.getMonth() + 1).padStart(2, '0') +
    String(date.getDate()).padStart(2, '0');
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SS-${datePart}-${randomPart}`;
}

/** Retrieve all complaints from localStorage */
export function getComplaints() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/** Save the full complaints array to localStorage */
export function saveComplaints(complaints) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
  } catch (err) {
    console.error('Failed to save complaints:', err);
  }
}

/** Add a single new complaint to localStorage */
export function addComplaint(complaint) {
  const complaints = getComplaints();
  complaints.unshift(complaint); // Newest first
  saveComplaints(complaints);
}

/** Find a single complaint by its ID */
export function getComplaintById(id) {
  const complaints = getComplaints();
  return complaints.find(function (c) { return c.id === id; }) || null;
}

/** Alias for finding complaint by ID */
export const findComplaintById = getComplaintById;

/** Filter complaints by status */
export function filterComplaints(complaints, statusFilter) {
  if (!complaints) return [];
  if (!statusFilter || statusFilter === 'All') return complaints;
  return complaints.filter((c) => c.status === statusFilter);
}

/** Count complaints by status */
export function countByStatus(complaints) {
  const counts = { Total: 0, Pending: 0, Assigned: 0, Cleaning: 0, Resolved: 0 };
  if (!complaints) return counts;
  counts.Total = complaints.length;
  complaints.forEach((c) => {
    if (c.status === 'Pending') counts.Pending++;
    else if (c.status === 'Assigned') counts.Assigned++;
    else if (c.status === 'In Progress' || c.status === 'Cleaning') counts.Cleaning++;
    else if (c.status === 'Resolved') counts.Resolved++;
  });
  return counts;
}

/** Update a complaint's fields by ID */
export function updateComplaint(id, updates) {
  const complaints = getComplaints();
  const index = complaints.findIndex(function (c) { return c.id === id; });
  if (index !== -1) {
    complaints[index] = { ...complaints[index], ...updates };
    saveComplaints(complaints);
    return complaints;
  }
  return complaints;
}

/** Format an ISO date string to a readable format */
export function formatDate(isoString) {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Map status strings to CSS classes */
export function getStatusClass(status) {
  const map = {
    Pending: 'status-pending',
    Assigned: 'status-assigned',
    'In Progress': 'status-inprogress',
    Resolved: 'status-resolved',
  };
  return map[status] || 'status-pending';
}
