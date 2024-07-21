import React from 'react';
import { Center, Text, Box, TextInput } from '@mantine/core';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import mainBackground from '../images/main-background.png';
import schedule from '../images/schedule-image.png';
import '../CSS/Home.css';

const Landing1 = () => {
  return <>
    <Center style={{ height: '85vh' }}>
      <Box className="landing-page-box">
        <Text style={{ fontSize: '2.7vw' }} fw={700} className="landing-page-header">Plan Your Perfect<br/>Class Schedule with Ease</Text>
        <Text style={{ fontSize: '2vw' }} className="landing-page-text">Collage is college redefined.<br/><br/>Personalize your education,<br/>coordinate with friends, and<br/>explore new opportunities on our<br/>AI-powered platform.</Text>
        <LazyLoadImage style={{ width: '30vw'}} src={schedule} className="schedule-image"/>

        <div className="signup-container">
          <Text style={{ fontSize: '2.5vw' }} fw={700} className="signup-text">Get Started!</Text>
          <TextInput placeholder="Your .edu email here" className="signup-input"/>
          <Link to="/signup" className="signup-button">Sign up</Link>
        </div>

        <LazyLoadImage radius="md" src={mainBackground} className="main-background-image"/>
      </Box>
    </Center>
  </>
};

export default Landing1;