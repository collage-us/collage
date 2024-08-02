import React, {useState} from 'react';
import { TextInput } from '@mantine/core';

const Signup1 = ({first, setFirst, last, setLast, validEntries, setValid}) => {
  const checkValid = (e) => {
    if (first !== '' && last !== ''){
      setValid(true);
    }
    else{
      setValid(false);
    }
  }
  return <>
      <TextInput value={first} onChange={(e) => {setFirst(e.currentTarget.value); checkValid(e)}} required label="What's your name?" placeholder="First name" size="lg"
                styles={
                  {
                    label: {fontSize: 24, textAlign: 'left', alignContent: 'left'},
                    input: {fontSize: 20}
                  }
                }/>
      <br/>
      <TextInput value={last} onChange={(e) => {setLast(e.currentTarget.value); checkValid(e)}} required placeholder="Last name" size="lg"
        styles={
          {
            input: {fontSize: 20}
          }
        }/>
  </>
};

export default Signup1;