// MainLayout Component

import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CivicAlertBanner from './CivicAlertBanner';

function MainLayout() {
  return (
    <div className="app-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Civic Broadcast Alert Banner (powered by Zustand store) */}
      <CivicAlertBanner />

      {/* Persistent Navigation Header */}
      <Navbar />

      {/* Main Routed Page Content */}
      <main className="app-main" style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* Persistent Footer */}
      <Footer />
    </div>
  );
}

export default MainLayout;
