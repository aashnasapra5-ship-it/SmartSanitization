import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <h3>🌿 Smart Sanitization</h3>
            <p>
              A citizen-powered smart garbage reporting and municipal response platform.
              Empowering cleaner cities, one report at a time.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              {['Twitter', 'Facebook', 'LinkedIn'].map((soc) => (
                <span key={soc} style={{
                  fontSize: '0.8rem', padding: '4px 10px', borderRadius: '4px',
                  backgroundColor: 'rgba(255,255,255,0.08)', color: '#94a3b8', cursor: 'pointer',
                }}>
                  {soc}
                </span>
              ))}
            </div>
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

          {/* Services */}
          <div className="footer-links">
            <h4>Services</h4>
            <ul>
              <li><Link to="/municipal">Municipal Portal</Link></li>
              <li><Link to="/report">Waste Collection Request</Link></li>
              <li><Link to="/citizen">Area Sanitation Status</Link></li>
              <li><Link to="/track">Complaint Verification</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-links">
            <h4>Contact & Helpline</h4>
            <ul>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>📞</span> <span style={{ color: '#94a3b8' }}>1800-XXX-XXXX (Toll Free)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>📧</span> <span style={{ color: '#94a3b8' }}>support@smartsanitization.gov.in</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>🕘</span> <span style={{ color: '#94a3b8' }}>Mon – Sat, 8:00 AM – 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <p>&copy; 2026 Smart Sanitization. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem' }}>
              <span style={{ color: '#94a3b8', cursor: 'pointer' }}>Privacy Policy</span>
              <span style={{ color: '#94a3b8', cursor: 'pointer' }}>Terms of Service</span>
              <span style={{ color: '#94a3b8', cursor: 'pointer' }}>Accessibility</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
