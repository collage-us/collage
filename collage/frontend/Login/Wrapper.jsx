import React, { useState, useNavigate} from 'react';
import { Link } from 'react-router-dom';
import { Title } from '@mantine/core';
import Login1 from './Login-1';
import '../Styles/Signup.css';
import { useGoogleLogin } from "@react-oauth/google";

async function getUserInfo(codeResponse) {
  var response = await fetch("/api/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: codeResponse.code }),
  });
  return await response.json();
}

const Login = ({setLoggedIn, setRegistered}) => {
  const navigate = useNavigate()
  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      var loginDetails = await getUserInfo(codeResponse);
      setLoggedIn(true);
      if (loginDetails.data.registered){
        setRegistered(true);
      }
      else{
        setRegistered(false);
        navigate("/signup");
      }
    },
  })
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
          <button className="bottomButton" onClick={() => googleLogin()}>Log In</button>
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
