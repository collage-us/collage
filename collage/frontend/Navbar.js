import React from 'react';
import { Link } from 'react-router-dom'
import './styles/Navbar.css'

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li className="logo">
          <Link to="/" className="logo-text">Collage</Link>
        </li>
        <li className="link-1">
          <Link to="/about" className="story">Our Story</Link>
        </li>
        <li className="link-2">
          <Link to="/mission" className="mission">Our Mission</Link>
        </li>
        <li className="link-3">
          <Link to="/support" className="support">Support</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;