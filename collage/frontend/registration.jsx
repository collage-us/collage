import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Title, Button, Group } from '@mantine/core';
import Navbar from './Navbar';
import Landing from './Landing/Landing';
import About from './About';
import ForStudents from './ForStudents';
import Support from './Support';
import Signup from './Signup/Wrapper';
import Login from './Login/Wrapper';
import Search from './Search/Wrapper';
import Home from './Home/Home';

export default function Registration() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [registered, setRegistered] = useState(false);
  return (
    <>
      <Router>
        <div>
          <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} setRegistered={setRegistered}/>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/forstudents" element={<ForStudents />} />
            <Route path="/support" element={<Support />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} registered={registered} setRegistered={setRegistered}/>} />
            <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn} setRegistered={setRegistered}/>} />
            <Route path="/home" element={<Home userId={1}/>}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
};
