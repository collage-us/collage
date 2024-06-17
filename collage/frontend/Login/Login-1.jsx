import React from 'react';
import { TextInput, PasswordInput, Checkbox } from '@mantine/core';

const Login1 = () => {
  return (
    <>
      <TextInput
        placeholder="Email (.edu email only)"
        size="lg"
        styles={{
          label: { fontSize: 24, textAlign: 'left', alignContent: 'left' },
          input: { fontSize: 20 },
        }}
      />
      <br />
      <PasswordInput
        placeholder="Password"
        size="lg"
        styles={{
          label: { fontSize: 24, textAlign: 'left', alignContent: 'left' },
          input: { fontSize: 20 },
        }}
      />
      <br />
      <Checkbox
        label="Remember me?"
        size="md"
        styles={{
          label: { fontSize: 18, textAlign: 'left', alignContent: 'left' },
          input: { fontSize: 16 },
        }}
      />
      <br />
    </>
  );
};

export default Login1;
