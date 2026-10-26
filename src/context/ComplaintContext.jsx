// ComplaintContext

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as complaintService from '../services/complaintService';

const ComplaintContext = createContext(null);

export function ComplaintProvider({ children }) {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);
  const [simulateError, setSimulateError] = useState(complaintService.isSimulatingNetworkError());

  /**
   * Asynchronously load complaints from the mock service layer
   */
  const loadComplaints = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await complaintService.fetchComplaints();
      setComplaints(data);
    } catch (err) {
      console.error('[ComplaintContext] Error loading complaints:', err);
      setError(err.message || 'Failed to load complaints from service.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Seed / load complaints on initial mount
  useEffect(() => {
    loadComplaints();
  }, [loadComplaints]);

  /**
   * Submit a new complaint to the central state and persistent store
   */
  const addComplaint = async (complaintData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const created = await complaintService.createComplaint(complaintData);
      setComplaints((prev) => [created, ...prev]);
      setActionMessage({
        type: 'success',
        text: `Complaint ${created.id} submitted successfully!`,
      });
      return created;
    } catch (err) {
      console.error('[ComplaintContext] Error submitting complaint:', err);
      setError(err.message || 'Failed to submit complaint.');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Update status or assigned worker/vehicle of an existing complaint
   */
  const updateComplaint = async (id, updates) => {
    setError(null);
    try {
      const updated = await complaintService.updateComplaint(id, updates);
      setComplaints((prev) =>
        prev.map((c) => (c.id === id ? updated : c))
      );
      setActionMessage({
        type: 'success',
        text: `Complaint ${id} updated to "${updated.status}".`,
      });
      return updated;
    } catch (err) {
      console.error('[ComplaintContext] Error updating complaint:', err);
      setError(err.message || 'Failed to update complaint.');
      throw err;
    }
  };

  /**
   * Lookup complaint in in-memory state, falling back to service lookup
   */
  const getComplaintById = (id) => {
    if (!id) return null;
    const cleanId = id.trim().toUpperCase();
    const found = complaints.find((c) => c.id.trim().toUpperCase() === cleanId);
    return found || null;
  };

  /**
   * Reset data back to default initial mock data
   */
  const resetToDefaultData = async () => {
    setIsLoading(true);
    try {
      const resetList = await complaintService.resetMockData();
      setComplaints(resetList);
      setActionMessage({
        type: 'info',
        text: 'Sample complaint records have been reset to default.',
      });
    } catch (err) {
      setError(err.message || 'Failed to reset data.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Toggle simulated network error mode (helpful for viva exam demonstration)
   */
  const toggleSimulateError = () => {
    const nextVal = !simulateError;
    complaintService.setSimulateNetworkError(nextVal);
    setSimulateError(nextVal);
    setActionMessage({
      type: nextVal ? 'warning' : 'info',
      text: nextVal
        ? '⚠️ Simulated Network Error Mode ENABLED (operations will fail to show error states)'
        : '✅ Simulated Network Error Mode DISABLED (normal operations restored)',
    });
  };

  const clearError = () => setError(null);
  const clearActionMessage = () => setActionMessage(null);

  const value = {
    complaints,
    isLoading,
    isSubmitting,
    error,
    actionMessage,
    simulateError,
    loadComplaints,
    addComplaint,
    updateComplaint,
    getComplaintById,
    resetToDefaultData,
    toggleSimulateError,
    clearError,
    clearActionMessage,
  };

  return (
    <ComplaintContext.Provider value={value}>
      {children}
    </ComplaintContext.Provider>
  );
}

/**
 * Custom hook to safely consume ComplaintContext
 */
export function useComplaints() {
  const context = useContext(ComplaintContext);
  if (!context) {
    throw new Error('useComplaints must be used within a <ComplaintProvider>');
  }
  return context;
}

export default ComplaintContext;
