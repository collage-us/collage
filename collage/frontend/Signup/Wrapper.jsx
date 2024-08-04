import React, {useState, lazy} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Title, ActionIcon, Dialog, Text } from '@mantine/core';
import { IconCircleChevronRight, IconCircleChevronLeft } from '@tabler/icons-react';
import '@mantine/core/styles/Button.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { ref, getStorage, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Cookies from 'js-cookie';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "replace-with-actual-api-key",
    authDomain: "collage-849c3.firebaseapp.com",
    projectId: "collage-849c3",
    storageBucket: "collage-849c3.appspot.com",
    messagingSenderId: "302505148937",
    appId: "1:302505148937:web:05f9caf3eb3bf860ac2ed8",
    measurementId: "G-FZFTH0MVNY"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

const Signup1 = lazy(() => import('./Signup-1'));
const Signup2 = lazy(() => import('./Signup-2'));
const Signup3 = lazy(() => import('./Signup-3'));
const Signup4 = lazy(() => import('./Signup-4'))
import '../CSS/Signup.css';

const Signup = () => {
  const [currPage, setCurrPage] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [major, setMajor] = useState('');
  const [startYear, setStartYear] = useState(2020);
  const [gradYear, setGradYear] = useState(2025);
  const [resumeFile, setResumeFile] = useState();
  const [transcriptFile, setTranscriptFile] = useState();
  const [errorDialog, setErrorDialog] = useState(false);
  const [validEntries, setValidEntries] = useState(false); //should be set to true when the states of the current page are valid
  const titleTexts = ['Hey there!', 'Get excited!', 'Last step! (optional)'];
  const buttonTexts = ['Next step', 'Keep going', 'Start Collage'];
  const navigate = useNavigate();
  const handleNext = (e) => {
    e.preventDefault();
    if (validEntries){
        setCurrPage(currPage + 1);
        setValidEntries(false);
        setErrorDialog(false);
    }
    else{
        setErrorDialog(true);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (resumeFile){
        const storageRef = ref(storage, resumeFile.path);
        const uploadTask = uploadBytesResumable(storageRef, resumeFile);
        console.log('uploading files');
        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            // Don't fetch downloadURL here, just track progress
        },
        (err) => console.log(err),
        () => {
            // Get download URL here
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url)
            })
        }
        );
    }
    if (transcriptFile){
        const storageRef1 = ref(storage, transcriptFile.path);
        const uploadTask1 = uploadBytesResumable(storageRef1, transcriptFile);
        console.log('uploading files');
        uploadTask1.on("state_changed", (snapshot) => {
            const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            // Don't fetch downloadURL here, just track progress
        },
        (err) => console.log(err),
        () => {
            // Get download URL here
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url)
            })
        }
        );
    }
    var response = await fetch("/api/signup/", {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Cookies.get('access_token')}`,
        }, 
        body: JSON.stringify({full_name: firstName + " " + lastName,
                              start_year: startYear,
                              graduation_year: gradYear,
                              enrollment_date: '2020-11-11',
                              credits_completed: 60,
                              temporary_keywords: 'science',
                              major: major
        }),
      },)
      .then((response) => {setRegistered(true); setLoggedIn(true); navigate("/");});
  }

  return <div className="wrapper">
    <Dialog
        opened={errorDialog}
        withCloseButton
        onClose={() => setErrorDialog(false)}
        size="lg"
        radius="lg"
        position={{ top: 20, left: 20 }}
      >
        <Text size="lg" style={{ marginBottom: 10 }} weight={500} color="red">
          Please make sure to fill out all fields before continuing
        </Text>
      </Dialog>
    <div className="collageTitle">
        <Title order={1}>Collage</Title>
    </div>
    <div className="wrapperBox">
        <div className="wrapperNav">
            {currPage > 0 && <div className="leftArrow">
                <ActionIcon variant="subtle" onClick={() => {setCurrPage(currPage-1); setValidEntries(true)}}>
                    <IconCircleChevronLeft stroke="1.5" color="black"/>
                </ActionIcon>
            </div>}
            {currPage < 2 && <div className="rightArrow">
                <ActionIcon variant="subtle" onClick={(e) => (handleNext(e))}>
                    <IconCircleChevronRight stroke="1.5" color="black"/>
                </ActionIcon>
            </div>}
        </div>
        <div className="wrapperTitle"><Title order={2}>{titleTexts[currPage]}</Title></div>
        <div className="wrapperContent">
        {currPage == 0 && <Signup1 first={firstName} setFirst={setFirstName} last={lastName} setLast={setLastName} valid={validEntries} setValid={setValidEntries}/>}
        {currPage == 1 && <Signup2 major={major} setMajor={setMajor} startYear={startYear} setStartYear={setStartYear} gradYear={gradYear} setGradYear={setGradYear} valid={validEntries} setValid={setValidEntries}/>}
        {currPage == 2 && <Signup3 setResumeFile={setResumeFile} setTranscriptFile={setTranscriptFile}/>}
        {/* {currPage == 3 && <Signup4 email={email} setEmail={setEmail} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} valid={validEntries} setValid={setValidEntries}/>} */}

        </div>
        <div className="wrapperFooter">
            <button onClick={(e) => {if(currPage != 2) {handleNext(e);} else {handleSubmit(e)}}} className="bottomButton">{buttonTexts[currPage]}</button>
            <br/>
            {/* <p className="bottomText">Already have an account? <Link to="/login">Log in</Link></p> */}
        </div>
    </div>

  </div>
};

export default Signup;