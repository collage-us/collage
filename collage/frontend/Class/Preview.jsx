import { Container, Grid, Image, Rating } from "@mantine/core";
import React, {useState, useEffect, lazy} from "react";
import { Link } from 'react-router-dom';
import '../CSS/Search.css';
import '../CSS/classPreview.css';
const SearchWrapper = lazy(() => import('../Search/SearchWrapper'));
// import fullLogo from '../images/full-logo.png';
import icon from '../images/temp.png';
const Rating = lazy(() => import('./rating'))

const Classpreview = () => {
    return (
        <div className="main-grid">
            <div className="header">
                {/* <div className="gray-part"></div>
                <div className="header-container">
                    <Image src={ fullLogo } className="collage-header"/>
                </div>
                <div className="searchbar">
                    <SearchWrapper/>
                </div> */}
                <div className="content">
                    <Link to="/Search">
                        <button className="landing-sign-up-button">back</button>
                    </Link>
                    <div className="preview">
                        <div className="card">
                            <div className="newLine">
                                <img src={icon} alt="classicon" className="icon" />
                                <div className="classTitle">
                                    <h1>Biology 212</h1>
                                    <p>Plant and Human Health</p>
                                    <p className="match">96% match</p>
                                </div>
                                <div className="rating">
                                    <button className="save">Save</button>
                                    <button className="rate">Rate</button>
                                    <Rating fractions={2} defaultValue={4.5} />
                                </div>
                            </div>
                            <div className="newLine">
                                <div className="info">
                                    <p className="title">Credits</p>
                                    <p className="value credits">3</p>
                                </div>
                                <div className="info">
                                    <p className="title">Subject</p>
                                    <p className="value subject">Biology</p>
                                </div>
                                <div className="info">
                                    <p className="title">Department</p>
                                    <p className="value department">LSA</p>
                                </div>
                                <div className="info">
                                    <p className="title">Status</p>
                                    <p className="value status">Open</p>
                                </div>
                            </div>
                        </div>
                        <div className="description">
                            <p className="desTitle">Course Description</p>
                            <p className="desc">
                                This course explores basic botany, the human use of plants for food and medicine, and the relationship between environment and human health, requiring active participation in discussions, field trips, and a self-designed project for independent learning. By the end of the course, students will have gained a comprehensive understanding of the vital role plants play in sustaining life on Earth and the complex interplay between human society and the natural world.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Classpreview