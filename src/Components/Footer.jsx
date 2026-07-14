import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer Component
 * 
 * Beginner Tips:
 * 1. In React, we use the `Link` component from 'react-router-dom' instead of `<a href="...">`.
 *    This allows client-side routing without reloading the entire page.
 * 2. In JSX, HTML attributes like `class` must be written as `className` because `class` is a reserved keyword in JavaScript.
 * 3. We use `.map()` on arrays to dynamically generate lists of elements. Every list item needs a unique `key` prop so React can track it efficiently.
 */
export default function Footer() {
  // Array of quick links to show dynamic rendering
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/About' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Terms', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
  ];

  // Array of portal modules
  const portalModules = [
    { name: 'Student Portal', path: '/student-dashboard' },
    { name: 'Faculty Panel', path: '/faculty-dashboard' },
    { name: 'Admin Dashboard', path: '/admin-dashboard' },
    { name: 'Online Admission', path: '/admission-form' },
    { name: 'Examination Management', path: '/examination' },
  ];

  return (
    <footer className="bg-dark text-white py-5 mt-auto border-top border-warning border-5 shadow">
      <div className="container">
        <div className="row g-4">
          
          {/* About Section */}
          <div className="col-md-5">
            <h4 className="text-warning fw-bold mb-3">DCET Portal</h4>
            <p className="text-white-50">
              DCET College Management Portal is a digital platform that manages admissions,
              attendance, examinations, faculty information, student records and academic
              activities efficiently through a secure online system.
            </p>
          </div>

          {/* Quick Links Section - Renders dynamically from quickLinks array */}
          <div className="col-md-3">
            <h5 className="text-warning fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-white-50 text-decoration-none d-block py-1 hover-gold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portal Modules Section - Renders dynamically from portalModules array */}
          <div className="col-md-4">
            <h5 className="text-warning fw-bold mb-3">Portal Modules</h5>
            <ul className="list-unstyled text-white-50">
              {portalModules.map((module, index) => (
                <li key={index}>
                  <Link 
                    to={module.path} 
                    className="text-white-50 text-decoration-none d-block py-1 hover-gold"
                  >
                    {module.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Divider Line */}
        <hr className="border-warning my-4" />

        {/* Copyright and Visitor Counter */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-warning fw-bold">
          <p className="mb-2 mb-md-0">© 2026 DCET Campus Management System. All Rights Reserved.</p>
          <p className="mb-0 fs-6">Visitors : 1,406,587</p>
        </div>

      </div>
    </footer>
  );
}
