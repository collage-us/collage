import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Image } from '@mantine/core';
import './CSS/Navbar.css';
import logo from './images/collage-logo.png';
import Cookies from 'js-cookie';

const Navbar = ({loggedIn, setLoggedIn, registered, setRegistered}) => {
  const location = useLocation();
  const hiddenPaths = ['/login', '/signup'];

  const handleLogout = async () => {
    var response = await fetch("/api/logout/", {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Cookies.get('access_token')}`,}
    })
    .then((response) => response.json())
    .then((data) => {
      if(!data.registered){
        setLoggedIn(false);
        setRegistered(false);
        Cookies.remove('access_token');
      }
    })
  };

  if(hiddenPaths.includes(location.pathname)){
    return null;
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <Image style={{ width: '1vw'}} src={logo} className="logo-image"/>
          </Link>
        </li>
        <li className="logo">
          <Link to="/" className="logo-text">Collage</Link>
        </li>
        <li className="link-1">
          <Link to="/about" className="story">About Us</Link>
        </li>
        <li className="link-2">
          <Link to="/forstudents" className="mission">For Students</Link>
        </li>
        <li className="link-3">
          <Link to="/support" className="support">Support</Link>
        </li>
        <li className="link-3">
          <Link to="/search" className="support">Search</Link>
        </li>
        {!loggedIn && <li className='link-4'>
          <Link to="/login" className="login">Log in</Link>
        </li>}
        {!loggedIn && <li className='link-5'>
          <Link to="/signup" className="signup">Sign up</Link>
        </li>}
        {loggedIn && <li className='link-4'>
          <button className="login" onClick={handleLogout}>Log Out</button>
        </li>}
        <li className='link-6'>
          <Link to="/home" className="home">Home</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;