import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Title, Button, ActionIcon } from '@mantine/core';
import { IconCircleChevronRight, IconCircleChevronLeft } from '@tabler/icons-react';
import '@mantine/core/styles/Button.css'
const Signup1 = lazy(() => import('./Signup-1'));
const Signup2 = lazy(() => import('./Signup-2'));
const Signup3 = lazy(() => import('./Signup-3'));
const Signup4 = lazy(() => import('./Signup-4'))
import '../CSS/Signup.css';

function HandleNext(e) {
    e.preventDefault();
}

const Signup = () => {
  const [currPage, setCurrPage] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [major, setMajor] = useState('');
  const [startYear, setStartYear] = useState(2020);
  const [gradYear, setGradYear] = useState(2024);
  const [validEntries, setValidEntries] = useState(false); //should be set to true when the states of the current page are valid
  const titleTexts = ['Hey there!', 'Glad to see you here!', 'Get excited!', 'Last step! (optional)'];
  const buttonTexts = ['Next step', 'Keep going', 'Almost there', 'Start Collage'];
  return <div className="wrapper">
    <div className="collageTitle">
        <Link to="/"><Title order={1}>Collage</Title></Link>
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
        {currPage == 0 && <Signup1 first={firstName} setFirst={setFirstName} last={lastName} setLast={setLastName} valid={validEntries} setValid={setValidEntries}/>}
        {currPage == 1 && <Signup2 email={email} setEmail={setEmail} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} valid={validEntries} setValid={setValidEntries}/>}
        {currPage == 2 && <Signup3 major={major} setMajor={setMajor} startYear={startYear} setStartYear={setStartYear} gradYear={gradYear} setGradYear={setGradYear} valid={validEntries} setValid={setValidEntries}/>}
        {currPage == 3 && <Signup4/>}
        </div>
        <div className="wrapperFooter">
            <button onClick={() => (setCurrPage(currPage+1))} className="bottomButton">{buttonTexts[currPage]}</button>
            <br/>
            <p className="bottomText">Already have an account? <Link to="/login">Log in</Link></p>
        </div>
    </div>

  </div>
};

export default Signup;