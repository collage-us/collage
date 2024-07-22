import React from 'react';
import { Center, Text, Box } from '@mantine/core';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import '../CSS/Landing.css';
import background2 from '../images/background-2.png';
import greenLogo from '../images/green-logo.png';
import blueLogo from '../images/blue-logo.png';

const Landing2 = () => {
  return <>
    <Center style={{ height: '75vh' }}>
      <Box className="landing-page-box">
        <LazyLoadImage radius="md" src={background2} className="main-background-image"/>
        <LazyLoadImage radius="md" style={{ width: '8vw' }} src={greenLogo} className="green-logo"/>
        <LazyLoadImage radius="md" style={{ width: '8vw' }} src={blueLogo} className="blue-logo"/>
        <Text style={{ fontFamily: 'Judson', fontSize: '3vw' }} fw={700} className="main-header">Say Hello To Your AI College Advisor</Text>
        <Text style={{ fontSize: '1.2vw' }} className="green-text"> <center style={{fontSize:'1.5vw'}}><strong>Unlock AI Course Insights</strong></center> Will this class fill up before my registration date? How intense is the <br/> course load in ECON 101? What should I take to prepare for my <br/> career in tech? Get the answers to all these questions and many <br/> more with the help of our cutting edge LLM.</Text>
        <Text style={{ fontSize: '1.2vw' }} className="blue-text"><center style={{fontSize:'1.5vw'}}><strong>A Course Catalog made just for you</strong></center> Whether you’re an undecided underclassmen or a senior with a few <br/> credits left to graduate, we generate a course catalog specifically <br/> tailored to your profile. Get recommendations for courses based on <br/> your academic interests, professional goals, and personal <br/> preferences.</Text>
      </Box>
    </Center>
  </>
};

export default Landing2;