import React, {useState} from 'react';
import { Title, Button, ActionIcon } from '@mantine/core';
import { IconCircleChevronRight, IconCircleChevronLeft } from '@tabler/icons-react';
import '@mantine/core/styles/Button.css'
import Signup1 from './Signup-1';
import Signup2 from './Signup-2';
import Signup3 from './Signup-3';
import Signup4 from './Signup-4';
import '../Styles/Signup.css';

const Signup = () => {
  const [currPage, setCurrPage] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [major, setMajor] = useState('');
  const [startYear, setStartYear] = useState('');
  const [gradYear, setGradYear] = useState('');
  const [validEntries, setValidEntries] = useState(false); //should be set to true when the states of the current page are valid
  const titleTexts = ['Hey there!', 'Glad to see you here!', 'Get excited!', 'Last step! (optional)'];
  const buttonTexts = ['Next step', 'Keep going', 'Almost there', 'Start Collage'];
  return <div className="wrapper">
    <div className="collageTitle">   
        <Title order={1}>Collage</Title>
    </div>
    <div className="wrapperBox">
        <div className="wrapperNav">
            {currPage > 0 && <div className="leftArrow">
                <ActionIcon variant="subtle" onClick={() => (setCurrPage(currPage-1))}>
                    <IconCircleChevronLeft stroke="1.5" color="black"/>
                </ActionIcon>
            </div>}
            {currPage < 3 && <div className="rightArrow">
                <ActionIcon variant="subtle" onClick={() => (setCurrPage(currPage+1))}>
                    <IconCircleChevronRight stroke="1.5" color="black"/>
                </ActionIcon>
            </div>}
        </div>
        <div className="wrapperTitle"><Title order={2}>{titleTexts[currPage]}</Title></div>
        <div className="wrapperContent">
        {currPage == 0 && <Signup1/>}
        {currPage == 1 && <Signup2/>}
        {currPage == 2 && <Signup3/>}
        {currPage == 3 && <Signup4/>}
        </div>
        <div className="wrapperFooter">
            <button className="bottomButton">{buttonTexts[currPage]}</button>
            <br/>
            <p className="bottomText">Already have an account? <a>Log in</a></p>
        </div>
    </div>
    
  </div>
};

export default Signup;