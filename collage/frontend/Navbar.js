import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Collage</Link>
        </li>
        <li>
          <Link to="/about">Our Story</Link>
        </li>
        <li>
          <Link to="/mission">Our Mission</Link>
        </li>
        <li>
          <Link to="/support">Support</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;