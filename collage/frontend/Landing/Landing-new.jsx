import React from "react";
import '../CSS/Landing.css';
import logo from '../images/full-logo.png';

const Landing = () => {
    return (
        <div className="landing-container">

            <img src={logo} alt="Collage logo" className="landing-logo" /> 
            
            <h1 className="landing-tagline">Build your college experience </h1>

            <div className="landing-video-demo">
                <p>*Video Demo*</p>
            </div>

            <button className="landing-sign-up-button">Sign Up</button>
        </div>
    );
};

export default Landing;