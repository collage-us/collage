import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Title, Button, Group } from '@mantine/core';
const Navbar = lazy(() => import('./Navbar'));
const Landing = lazy(() => import('./Landing/Landing'));
const About = lazy(() => import('./About'));
const ForStudents = lazy(() => import('./ForStudents'));
const Support = lazy(() => import('./Support'));
const Signup = lazy(() => import('./Signup/Wrapper'));
const Login = lazy(() => import('./Login/Wrapper'));
const Search = lazy(() => import('./Search/Wrapper'));
const Home = lazy(() => import('./Home/Home'));

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
