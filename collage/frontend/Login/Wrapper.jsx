import React, { useState, lazy } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Image, Title, Dialog, Text, TextInput, Button} from '@mantine/core';
import { useGoogleLogin } from "@react-oauth/google";
import '../CSS/Signup.css';
import googleLogo from '../images/google-logo.png';
import fullLogo from '../images/full-logo.png';

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
          navigate("/search");
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
        <Image src={ fullLogo } w="30vw"/>
      </div>
      <div className="wrapperBoxLogin">
        <div className="wrapperNav"></div>
        <div className="wrapperTitle">
          <Title order={2}>Login or Register</Title>
        </div>
        <div className="wrapperContentLogin">
          <TextInput
          placeholder="Full Name"
          size="lg"
          styles={{
            label: { fontSize: 24, textAlign: 'left', alignContent: 'left' },
            input: { fontSize: 20 },
          }}
          />
          <br />
          <TextInput
            placeholder="University Name"
            size="lg"
            styles={{
              label: { fontSize: 24, textAlign: 'left', alignContent: 'left' },
              input: { fontSize: 20 },
            }}
          />
          <br />
          <Button variant='default' fullWidth size='lg' radius='xl' leftSection={<img src={googleLogo}/>} rightSection={<span/>} onClick={() => googleLogin()}>Continue with Google</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
