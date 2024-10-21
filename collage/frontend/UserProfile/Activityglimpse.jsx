import { Image } from "@mantine/core";
import React from "react";
import fullLogo from '../images/full-logo.png';
import profPic from '../images/tempHeadshot.png';
import '../CSS/activityglimpse.css';

const Activityglimpse = () => {
    return (
        <div className="activity">
            <div className="header">
                <h1 className="head">Activity Glimpse</h1>
                <p className="headDescription">Explore what your peers have been up to on the Collage App!</p>
            </div>
            <h2 className="title">Schedule Completed ✅</h2>
            <div className="body">
                <div className="photos">
                    <Image src={ profPic } className="pic picture1"/>
                    <Image src={ profPic } className="pic picture2"/>
                    <Image src={ profPic } className="pic picture3"/>
                    <Image src={ profPic } className="pic picture4"/>
                </div>
                <div className="sub-body">
                    <p className="description"><span className="users">Alex, Max, and 5 others</span> completed their schedules for the <span className="semester"></span> semester</p>
                    <a href="/" className="explore">Explore more Collagers</a>
                </div>
            </div>
            <h2 className="title">Resume Uploaded 📝</h2>
            <div className="body">
                <div className="photos">
                    <Image src={ profPic } className="pic picture5"/>
                    <Image src={ profPic } className="pic picture6"/>
                    <Image src={ profPic } className="pic picture7"/>
                    <Image src={ profPic } className="pic picture8"/>
                </div>
                <div className="sub-body">
                    <p className="description"><span className="users">Alex, Max, and 5 others</span> others updated their resumes recently</p>
                    <a href="/" className="explore">Explore more Collagers</a>
                </div>
            </div>
            <div className="footer">
                <Image src={ fullLogo } className="collage-header"/>
            </div>
        </div>
    )
}

export default Activityglimpse;