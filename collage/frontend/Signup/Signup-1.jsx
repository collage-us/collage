import React from 'react';
import { TextInput } from '@mantine/core';

const Signup1 = () => {
  return <>
      <TextInput required label="What's your name?" placeholder="First name" size="lg"
                styles={
                  {
                    label: {fontSize: 24, textAlign: 'left', alignContent: 'left'},
                    input: {fontSize: 20}
                  }
                }/>
      <br/>
      <TextInput required placeholder="Last name" size="lg"
        styles={
          {
            input: {fontSize: 20}
          }
        }/>
  </>
};

export default Signup1;