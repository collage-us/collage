import React from 'react';
import { TextInput, NumberInput } from '@mantine/core';
import '../CSS/Signup.css';

const Signup3 = ({major, setMajor, startYear, setStartYear, gradYear, setGradYear, valid, setValid}) => {
  return <div>
    <TextInput value={major} onChange={(e) => setMajor(e.currentTarget.value)} required label="What's your major and year?" placeholder="Major (intended or declared)" size="lg"
                styles={
                  {
                    label: {fontSize: 24, textAlign: 'left', alignContent: 'left'},
                    input: {fontSize: 20}
                  }
                }/>
      <br/>
      <div className='dropDownLine'>
        <div className='dropDown1'>
        <NumberInput value={startYear} onChange={(e) => setStartYear(e.currentTarget.value)} label="Start year" size="lg"
                  styles={
                    {
                      label: {fontSize: 20, textAlign: 'left', alignContent: 'left', color: '#5d5d5d'},
                      input: {fontSize: 20}
                    }
                  }
                  min={2020}
                  max={2025}
        />
        </div>
        <div className='dropDown2'>
        <NumberInput value={gradYear} onChange={(e) => setGradYear(e.currentTarget.value)} label="Expected End Year" size="lg"
                  styles={
                    {
                      label: {fontSize: 20, textAlign: 'left', alignContent: 'left', color: '#5d5d5d'},
                      input: {fontSize: 20}
                    }
                  }
                  min={startYear}
                  max={startYear+8}
        />
        </div>
      </div>
  </div>;
  //first text input is required with Label: What's your major and year? Placeholder: Major (intended or declared)
  //next is two side by side native selects with the start and grad years, both are required
  //error occurs if end year is less than start year
};

export default Signup3;