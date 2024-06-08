import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Mission from './Mission';
import Support from './Support';

export default function Registration() {
  return (
    <>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};


// function LeftButton({ name, onButtonClick }) {
//   return (
//     <button className="left-button" onClick={onButtonClick}>
//       {name}
//     </button>
//   )
// }

// function Header(){
//   function handleClick() {

//   }

//   return(
//     <>
//       <div className="header">
//         <LeftButton value="Collage" onButtonClick={() => handleClick()}></LeftButton>
//       </div>
//     </>
//   )
// }