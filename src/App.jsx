
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';

import Home from './pages/Home';
import ReportGarbage from './pages/ReportGarbage';
import TrackComplaint from './pages/TrackComplaint';
import CitizenDashboard from './pages/CitizenDashboard';
import MunicipalDashboard from './pages/MunicipalDashboard';
import NotFound from './pages/NotFound';

import { getComplaints, saveComplaints } from './utils/helpers';
import { mockComplaints } from './data/mockData';

function App() {
  useEffect(() => {
    const existing = getComplaints();

    if (!existing || existing.length === 0) {
      saveComplaints(mockComplaints);
    }
  }, []);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<ReportGarbage />} />
        <Route path="/track" element={<TrackComplaint />} />
        <Route path="/citizen" element={<CitizenDashboard />} />
        <Route path="/municipal" element={<MunicipalDashboard />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
