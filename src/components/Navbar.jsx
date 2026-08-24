/* ========================================
   Navbar Component
   ========================================
   Demonstrates: useState (mobile menu toggle), JSX, semantic HTML (<header>, <nav>),
   React Router NavLink, responsive design, event handling
   ======================================== */

import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  // useState to toggle mobile navigation menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleToggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  // Close mobile menu when a link is clicked
  function handleLinkClick() {
    setIsMenuOpen(false);
  }

  return (
    <header className="navbar">
      <div className="container">
        {/* Brand / Logo */}
        <NavLink to="/" className="navbar-brand" onClick={handleLinkClick}>
          🌿 <span>Smart</span>Sanitization
        </NavLink>

        {/* Navigation Links */}
        <nav className={isMenuOpen ? 'navbar-links open' : 'navbar-links'} aria-label="Main navigation">
          <NavLink to="/" onClick={handleLinkClick}>Home</NavLink>
          <NavLink to="/report" onClick={handleLinkClick}>Report Garbage</NavLink>
          <NavLink to="/track" onClick={handleLinkClick}>Track Complaint</NavLink>
          <NavLink to="/citizen" onClick={handleLinkClick}>Citizen Dashboard</NavLink>
          <NavLink to="/municipal" onClick={handleLinkClick}>Municipal Dashboard</NavLink>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          className="navbar-toggle"
          onClick={handleToggle}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
