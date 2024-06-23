import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Title } from '@mantine/core';
import Login1 from './Login-1';
import '../Styles/Signup.css';

const Login = () => {
  return (
    <div className="wrapper-login">
      <div className="collageTitle">
        <Link to="/"><Title order={1}>Collage</Title></Link>
      </div>
      <div className="wrapperBox">
        <div className="wrapperNav"></div>
        <div className="wrapperTitle">
          <Title order={2}>Welcome back!</Title>
        </div>
        <div className="wrapperContent">
          <Login1 />
        </div>
        <div className="wrapperFooter">
          <button className="bottomButton">Log In</button>
          <br />
          <p className="bottomText">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
