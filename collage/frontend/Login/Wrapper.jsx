import React, { useState } from 'react';
import { Title } from '@mantine/core';
import Login1 from './Login-1';
import '../Styles/Signup.css';

const Login = () => {
  return (
    <div className="wrapper-login">
      <div className="collageTitle">
        <Title order={1}>Collage</Title>
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
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
