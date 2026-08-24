/* ========================================
   Footer Component
   ========================================
   Demonstrates: JSX, semantic HTML (<footer>), props (none needed here),
   React Router Link, reusable layout component
   ======================================== */

import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <h3>🌿 SmartSanitization</h3>
            <p>
              A citizen-based smart garbage reporting and municipal response system.
              Making our cities cleaner, one report at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/report">Report Garbage</Link></li>
              <li><Link to="/track">Track Complaint</Link></li>
              <li><Link to="/citizen">Citizen Dashboard</Link></li>
            </ul>
          </div>

          {/* Project Info */}
          <div className="footer-links">
            <h4>Project Info</h4>
            <ul>
              <li><a href="#about">About SmartSanitization</a></li>
              <li><a href="#how">How It Works</a></li>
              <li><Link to="/municipal">Municipal Portal</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; 2026 SmartSanitization. Academic Project — Evaluation 1.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
