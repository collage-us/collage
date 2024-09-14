import React from 'react';
import { Text, Box, TextInput } from '@mantine/core';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import lastBackground from '../images/last-background.png';
import logo from '../images/collage-logo.png';
import '../CSS/Landing.css';

const Landing4 = () => {
  return <>
    <Box style={{width: '100vw', height: '100vh', overflow: 'hidden'}} className="landing-page-box">
      <LazyLoadImage radius="md" style={{height: '100%', width: '100%', objectFit: 'cover'}} src={lastBackground} className="main-background-image"/>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 1), transparent)',
          zIndex: '1',
        }}
      ></div>
      <div className="end-background">
        <LazyLoadImage style={{ width: '2vw'}} src={logo} className="logo-image"/>
        <Text style={{ fontFamily:'Judson', fontSize: '1.6vw' }} fw={700} className="end-title">Build your college<br />experience on Collage</Text>
        <TextInput placeholder="First Name" size="lg" className="first-name-text-box"
          styles={
            {
              input: {fontSize: 20}
            }
          }/>
        <br/>
        <TextInput placeholder="Last Name" size="lg" className="last-name-text-box"
          styles={
            {
              input: {fontSize: 20}
            }
          }/>
        <Link to="/login" className="get-started-link">Get Started</Link>
        <Link to="/login" className="log-in-link">Already a member? Log In</Link>

      </div>
      <div
        style={{
          position: 'absolute',
          top: '18%',
          left: '38%',
          width: '24vw',
          height: '65vh',
          background: 'white',
          borderRadius: '20px',
          zIndex: '2',
        }}
      ></div>

    </Box>
  </>
};

export default Landing4;