/* ========================================
   App Component
   ========================================
   Demonstrates: React Router navigation setup,
   Navbar & Footer persistent layout shell,
   useEffect for initializing mock data in localStorage
   ======================================== */

import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import ReportGarbage from './pages/ReportGarbage';
import TrackComplaint from './pages/TrackComplaint';
import CitizenDashboard from './pages/CitizenDashboard';
import MunicipalDashboard from './pages/MunicipalDashboard';

// Mock data & utilities
import { getComplaints, saveComplaints } from './utils/helpers';
import { mockComplaints } from './data/mockData';

function App() {
  // Seed localStorage with mock complaints on first launch if empty
  useEffect(function () {
    const existing = getComplaints();
    if (!existing || existing.length === 0) {
      saveComplaints(mockComplaints);
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navigation Header */}
      <Navbar />

      {/* Main Page Routing */}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<ReportGarbage />} />
          <Route path="/track" element={<TrackComplaint />} />
          <Route path="/citizen" element={<CitizenDashboard />} />
          <Route path="/municipal" element={<MunicipalDashboard />} />
        </Routes>
      </div>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}

export default App;
