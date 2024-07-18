import React from 'react';
import { Center, Image , Text, Box, TextInput, Button } from '@mantine/core';
import background3 from '../images/background-3.png';
import '../CSS/Home.css';

const Landing3 = () => {
  return <>
    <Center style={{ height: '85vh' }}>
      <Box className="landing-page-box">
        <Image radius="md" src={background3} className="main-background-image"/>
        <Text style={{ fontFamily: 'Judson', fontSize: '2.3vw', top: '74%', left: '39%'}} fw={700} className="main-header">All your classes.<br/>All your friends.<br/>All in one place.</Text>
        <Text style={{ fontSize: '1.2vw', top: '3.5%', left: '69.5%' }} className="green-text"> <center style={{fontSize:'1.5vw'}}><strong>Have a friend<br />in every course</strong></center> We make it simple to<br />connect with classmates<br />and synchronize your<br />schedules.</Text>
        <Text style={{ fontSize: '1.2vw', top: '59%', left: '11%' }} className="blue-text"><center style={{fontSize:'1.5vw'}}><strong>Stay secure and<br />stay connected</strong></center> Not sure if a class is the<br />right fit? Request to follow<br />your friends and discover<br />the classes they are taking<br />or have taken in the past.</Text>
      </Box>
    </Center>
  </>
};

export default Landing3;