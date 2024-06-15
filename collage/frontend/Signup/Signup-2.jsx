import React from 'react';
import { TextInput, PasswordInput } from '@mantine/core';
import '../Styles/Signup.css';

const Signup2 = () => {
  return <div>
    <TextInput required label="Come up with a good password!" placeholder="Email (.edu email only)" size="lg"
                styles={
                  {
                    label: {fontSize: 24, textAlign: 'left', alignContent: 'left'},
                    input: {fontSize: 20}
                  }
                }/>
      <br/>
      <PasswordInput placeholder="Password" size="lg"
        styles={
          {
            label: {fontSize: 24, textAlign: 'left', alignContent: 'left'},
            input: {fontSize: 20}
          }
        }/>
      <br/>
      <PasswordInput placeholder="Re-enter Password" size="lg" 
        styles={
          {
            label: {fontSize: 24, textAlign: 'left', alignContent: 'left'},
            input: {fontSize: 20}
          }
        }/>
      <br/>
      <p class="passwordText">
        • At least 8 characters
        <br/>
        • One letter and one number
      </p>
  </div>
  // first textinput is Label: Come up with a good password! Placeholder: Email (.edu email only) and required
  // second password input is no label, Placeholder: Password and required and see password option
  // third password input is no label, Placeholder: Re-enter password and required with requirement labels: * At least 8 characters and * One letter and one number
  // need to figure out how to make it turn red when it doesnt match
  // include strength meter for passwords
};

export default Signup2;