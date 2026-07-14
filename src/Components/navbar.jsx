import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const closeNavbar = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-warning border-3 shadow-sm">
      <div className="container">
        <Link className="navbar-brand text-warning fw-bold d-flex align-items-center" to="/" onClick={closeNavbar}>
          <img src="logo.jpg" width="40" height="40" className="rounded-circle me-2" alt="Logo" />
          DCET Portal
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleNavbar}
          aria-controls="navbarNav" 
          aria-expanded={isOpen} 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link text-white fw-semibold px-3 ${isActive ? 'active' : ''}`} 
                to="/" 
                end
                onClick={closeNavbar}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link text-white fw-semibold px-3 ${isActive ? 'active' : ''}`} 
                to="/About"
                onClick={closeNavbar}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link text-white fw-semibold px-3 ${isActive ? 'active' : ''}`} 
                to="/contact"
                onClick={closeNavbar}
              >
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link text-white fw-semibold px-3 ${isActive ? 'active' : ''}`} 
                to="/faq"
                onClick={closeNavbar}
              >
                FAQ
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link text-white fw-semibold px-3 ${isActive ? 'active' : ''}`} 
                to="/enquiry"
                onClick={closeNavbar}
              >
                Enquiry
              </NavLink>
            </li>
            
            <li className={`nav-item dropdown ${isDropdownOpen ? 'show' : ''}`}>
              <button
                className="nav-link dropdown-toggle text-warning fw-bold px-3 btn btn-outline-warning btn-sm ms-lg-2 mt-2 mt-lg-0"
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
              >
                Portals
              </button>
              <ul className={`dropdown-menu dropdown-menu-dark border-warning bg-dark ${isDropdownOpen ? 'show' : ''}`} style={{ right: 0, left: 'auto' }}>
                <li>
                  <Link className="dropdown-item text-white" to="/student-dashboard" onClick={closeNavbar}>
                    Student Portal
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item text-white" to="/faculty-dashboard" onClick={closeNavbar}>
                    Faculty Portal
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item text-white" to="/admin-dashboard" onClick={closeNavbar}>
                    Admin Portal
                  </Link>
                </li>
                <li><hr className="dropdown-divider border-secondary" /></li>
                <li>
                  <Link className="dropdown-item text-warning fw-bold" to="/login" onClick={closeNavbar}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item text-warning fw-bold" to="/signup" onClick={closeNavbar}>
                    Sign Up
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

