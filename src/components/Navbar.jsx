

import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleToggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  
  function handleLinkClick() {
    setIsMenuOpen(false);
  }

  return (
    <header className="navbar">
      <div className="container">
        {/* Brand / Logo */}
        <NavLink to="/" className="navbar-brand" onClick={handleLinkClick}>
          🌿 <span>Smart</span> Sanitization
        </NavLink>

        {/* Navigation Links */}
        <nav className={isMenuOpen ? 'navbar-links open' : 'navbar-links'} aria-label="Main navigation">
          <NavLink to="/" onClick={handleLinkClick} className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink to="/report" onClick={handleLinkClick} className={({ isActive }) => (isActive ? 'active' : '')}>
            Report Garbage
          </NavLink>
          <NavLink to="/track" onClick={handleLinkClick} className={({ isActive }) => (isActive ? 'active' : '')}>
            Track Complaint
          </NavLink>
          <NavLink to="/citizen" onClick={handleLinkClick} className={({ isActive }) => (isActive ? 'active' : '')}>
            Citizen Dashboard
          </NavLink>
          <NavLink to="/municipal" onClick={handleLinkClick} className={({ isActive }) => (isActive ? 'active' : '')}>
            Municipal Dashboard
          </NavLink>
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
