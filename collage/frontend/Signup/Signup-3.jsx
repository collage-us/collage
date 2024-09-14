import React, {useState, lazy} from 'react';
import { Button, Group } from '@mantine/core';

const InterestsButton = lazy(() => import('./Interests-button'));

const Signup3 = ({interests, setInterests, setValid}) => {
  setValid(true);
  const buttonValues = ['Computer Science', 'Business', 'Psychology', 'Biology', 'Engineering',
                        'Pre-Med', 'Economics', 'Political Science', 'Literature', 'Environmental Science',
                        'Mathematics', 'Sociology', 'Chemistry', 'Education', 'Physics', 'International Relations',
                        'History', 'Art and Design', 'Communications', 'Philosophy'];
  return <>
  <div className="buttons-page">
    <Group grow preventGrowOverflow={false} gap="xs">
        {buttonValues.map((title) => <InterestsButton setValid={setValid} interests={interests} setInterests={setInterests} title={title}/>)}
    </Group>
  </div>
    
  </>
};

export default Signup3;