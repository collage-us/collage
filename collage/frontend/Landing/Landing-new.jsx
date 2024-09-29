import React from "react";
import { Link } from 'react-router-dom';
import '../CSS/Landing.css';
import logo from '../images/full-logo.png';
import demoVideo from '../videos/collage-demo.mp4';

const Landing = () => {
    return (
        <div className="landing-container">

            <img src={logo} alt="Collage logo" className="landing-logo" /> 
            
            <h1 className="landing-tagline">Build your college experience </h1>
            <p className="landing-description">Collage makes getting through education effortless. Access a personalized course catalog and AI academic advising. Follow your friends to share schedules. Made by college students, for college students.</p>
            <video 
                className="landing-video-demo"
                src={demoVideo}
                autoPlay
                loop
                muted
                playsInline
            />

            <Link to="/login">
                <button className="landing-sign-up-button">Get Started</button>
            </Link>

            <Link to="/file">
                <button>file</button>
            </Link>
        </div>
    );
};

export default Landing;