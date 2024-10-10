import React from "react";
import { Link } from 'react-router-dom';
import '../CSS/classPreview.css';
const ProfileBar = lazy(() => import('./ProfileBar'))

const Classpreview = () => {
    return (
        <div className="main-grid">
            <div className="profile">
                <ProfileBar/>
            </div>
            <div className="content">
                <h1>test</h1>
                <Link to="/Catalog">
                    <button className="landing-sign-up-button">back</button>
                </Link>
            </div>
        </div>
    )
}

export default Classpreview