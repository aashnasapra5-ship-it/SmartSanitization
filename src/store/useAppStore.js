// App Store (Zustand)

import { create } from 'zustand';

export const useAppStore = create((set) => ({
  // Table view preference for municipal officers ('compact' vs 'comfortable')
  tableDensity: 'comfortable',
  
  // Emergency or civic broadcast banner
  civicAlert: {
    visible: true,
    message: '🌿 Monsoon Sanitation Drive Active: High priority response for waterlogged and mixed waste zones.',
    level: 'info', // 'info' | 'warning' | 'alert'
  },

  // Actions
  toggleTableDensity: () =>
    set((state) => ({
      tableDensity: state.tableDensity === 'comfortable' ? 'compact' : 'comfortable',
    })),

  setCivicAlert: (message, level = 'info') =>
    set({
      civicAlert: { visible: true, message, level },
    }),

  dismissCivicAlert: () =>
    set((state) => ({
      civicAlert: { ...state.civicAlert, visible: false },
    })),
}));

export default useAppStore;
