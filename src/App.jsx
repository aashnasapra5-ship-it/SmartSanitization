// App Component

import { Routes, Route } from 'react-router-dom';
import { ComplaintProvider } from './context/ComplaintContext';
import MainLayout from './components/MainLayout';

// Routed Pages
import Home from './pages/Home';
import ReportGarbage from './pages/ReportGarbage';
import TrackComplaint from './pages/TrackComplaint';
import CitizenDashboard from './pages/CitizenDashboard';
import MunicipalDashboard from './pages/MunicipalDashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ComplaintProvider>
      <Routes>
        {/* Persistent Layout Shell with Navbar, Outlet, and Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<ReportGarbage />} />
          <Route path="/track" element={<TrackComplaint />} />
          <Route path="/citizen" element={<CitizenDashboard />} />
          <Route path="/municipal" element={<MunicipalDashboard />} />

          {/* 404 Route Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ComplaintProvider>
  );
}

export default App;
