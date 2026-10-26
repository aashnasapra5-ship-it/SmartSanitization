// Complaint Service

import { mockComplaints } from '../data/mockData';

const STORAGE_KEY = 'smartsanitization_complaints';
const SIMULATED_LATENCY_MS = 450; // realistic mock network delay

// Controlled flag to simulate network failure on demand (for testing error UI)
let simulateNetworkError = false;

export function setSimulateNetworkError(shouldError) {
  simulateNetworkError = shouldError;
}

export function isSimulatingNetworkError() {
  return simulateNetworkError;
}

/**
 * Safely read raw complaints from localStorage with JSON parse protection.
 */
function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch (error) {
    console.warn('[ComplaintService] Corrupted localStorage data encountered. Resetting...', error);
    return null;
  }
}

/**
 * Safely write complaints array to localStorage.
 */
function writeStorage(complaints) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
    return true;
  } catch (error) {
    console.error('[ComplaintService] Failed to write to localStorage:', error);
    return false;
  }
}

/**
 * Generate a unique complaint ID: SS-YYYYMMDD-XXXX
 */
export function generateComplaintId() {
  const date = new Date();
  const datePart =
    date.getFullYear().toString() +
    String(date.getMonth() + 1).padStart(2, '0') +
    String(date.getDate()).padStart(2, '0');
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SS-${datePart}-${randomPart}`;
}

/**
 * Mock API: Fetch all complaints asynchronously
 * Returns Promise<Complaint[]>
 */
export function fetchComplaints() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (simulateNetworkError) {
        reject(new Error('Simulated Network Error: Failed to fetch complaints from municipal server.'));
        return;
      }

      let stored = readStorage();
      if (!stored || stored.length === 0) {
        // First-time seed
        stored = [...mockComplaints];
        writeStorage(stored);
      }
      resolve(stored);
    }, SIMULATED_LATENCY_MS);
  });
}

/**
 * Mock API: Fetch a single complaint by ID
 * Returns Promise<Complaint | null>
 */
export function fetchComplaintById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (simulateNetworkError) {
        reject(new Error(`Simulated Network Error: Failed to retrieve complaint ${id}.`));
        return;
      }

      const stored = readStorage() || mockComplaints;
      const found = stored.find(
        (c) => c.id.trim().toUpperCase() === id.trim().toUpperCase()
      ) || null;
      resolve(found);
    }, SIMULATED_LATENCY_MS);
  });
}

/**
 * Mock API: Submit a new complaint
 * Returns Promise<Complaint>
 */
export function createComplaint(complaintData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (simulateNetworkError) {
        reject(new Error('Simulated Network Error: Municipal server rejected the complaint submission.'));
        return;
      }

      // Input validation guard
      if (!complaintData.description || complaintData.description.trim().length < 10) {
        reject(new Error('Validation failed: Description must be at least 10 characters long.'));
        return;
      }

      const existing = readStorage() || [...mockComplaints];
      const newId = complaintData.id || generateComplaintId();

      const newComplaint = {
        id: newId,
        image: complaintData.image || null,
        garbageType: complaintData.garbageType || 'Mixed Waste',
        description: complaintData.description.trim(),
        location: complaintData.location ? complaintData.location.trim() : 'Unspecified Area',
        city: complaintData.city ? complaintData.city.trim() : 'Bangalore',
        address: complaintData.address ? complaintData.address.trim() : '',
        coordinates: complaintData.coordinates || null,
        status: 'Pending',
        assignedEmployee: null,
        vehicle: null,
        createdAt: new Date().toISOString(),
        afterImage: null,
      };

      const updated = [newComplaint, ...existing];
      writeStorage(updated);
      resolve(newComplaint);
    }, SIMULATED_LATENCY_MS + 100);
  });
}

/**
 * Mock API: Update an existing complaint (Status or Worker Assignment)
 * Returns Promise<Complaint>
 */
export function updateComplaint(id, updates) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (simulateNetworkError) {
        reject(new Error(`Simulated Network Error: Failed to update complaint ${id}.`));
        return;
      }

      const existing = readStorage() || [...mockComplaints];
      const index = existing.findIndex(
        (c) => c.id.trim().toUpperCase() === id.trim().toUpperCase()
      );

      if (index === -1) {
        reject(new Error(`Complaint with ID ${id} was not found.`));
        return;
      }

      const updatedRecord = {
        ...existing[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      existing[index] = updatedRecord;
      writeStorage(existing);
      resolve(updatedRecord);
    }, SIMULATED_LATENCY_MS);
  });
}

/**
 * Mock API: Reset data back to default mockComplaints
 */
export function resetMockData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      writeStorage(mockComplaints);
      resolve([...mockComplaints]);
    }, 200);
  });
}
