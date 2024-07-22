import React, { useState, lazy } from 'react';
// import {Alert} from 'react-alert';
import { Link, useNavigate } from 'react-router-dom';
import { Title, Dialog, Text} from '@mantine/core';
// import {Check, X, AlertCircle} from '@tabler/icons-react';
// import Login1 from './Login-1';
const Login1 = lazy(() => import('./Login-1'))
import { useGoogleLogin } from "@react-oauth/google";
import '../CSS/Signup.css';

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

const Login = ({loggedIn, setLoggedIn, registered, setRegistered}) => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState();
  const [invalidLogin, setInvalidLogin] = useState(false);
  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      var loginDetails = await getUserInfo(codeResponse);
      if (loginDetails.status === "failed"){
        setInvalidLogin(true);
        // alert('Please make sure you login with your .edu email.')
      }
      else{
        setLoggedIn(true);
        console.log(loginDetails.registered);

        if (loginDetails.registered === true){
          setRegistered(true);
          navigate("/");
        }
        else{
          setRegistered(false);
          navigate("/signup");
        }
      }
    },
    onError: async (codeResponse) => {
      console.log("failed");
    }
  })
  return (
    <div className="wrapper-login">
      <Dialog
        opened={invalidLogin}
        withCloseButton
        onClose={() => setInvalidLogin(false)}
        size="lg"
        radius="lg"
        position={{ top: 20, left: 20 }}
      >
        <Text size="lg" style={{ marginBottom: 10 }} weight={500} color="red">
          Please make sure to use your .edu email
        </Text>
      </Dialog>
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
