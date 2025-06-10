import React, { useState } from 'react';
import './Navbar.css';
import logo from './transmanage.jpg';

const Navbar = () => {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar-left">
          <a href="/" className="brand">
            <img
              src={logo}
              alt="TransManage Logo"
              className={`logo ${logoLoaded ? 'loaded' : ''}`}
              onLoad={() => setLogoLoaded(true)}
            />
            <span className="brandname"> TransManage </span>
          </a>
        </div>
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <div className={`navbar-right${menuOpen ? ' open' : ''}`}>
          <ul className="nav-links">
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/login" className="home-login-button">Log In</a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
