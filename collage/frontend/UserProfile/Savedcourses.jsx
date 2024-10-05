import { Image, Button, Rating } from "@mantine/core";
import React from "react";
import '../CSS/savedCourses.css';
import courseLogo1 from '../images/tempLogo1.png';
import courseLogo2 from '../images/tempLogo2.png';
import courseLogo3 from '../images/tempLogo3.png';
import courseLogo4 from '../images/tempLogo4.png';

const Savedcourses = () => {
    return (
        <div className="main-grid">
            <ul className="courses">
                <li>
                    <div className="course">
                        <Image src={ courseLogo1 } className="logo"></Image>
                        <div className="text">
                            <p className="title">BIO 212</p>
                            <p className="description">Plant and Human Health</p>
                        </div>
                        <div className="rating">
                            <Rating fractions={2} defaultValue={4} />
                        </div>
                        <div className="bookmark">
                            <Button>Bookmark</Button>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="course">
                        <Image src={ courseLogo2 } className="logo"></Image>
                        <div className="text">
                            <p className="title">EECS 183</p>
                            <p className="description">Elementary Programming Concepts</p>
                        </div>
                        <div className="rating">
                            <Rating fractions={2} defaultValue={5} />
                        </div>
                        <div className="bookmark">
                            <Button>Bookmark</Button>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="course">
                        <Image src={ courseLogo3 } className="logo"></Image>
                        <div className="text">
                            <p className="title">DATASCI 315</p>
                            <p className="description">Statistics and Artificial Intelligence</p>
                        </div>
                        <div className="rating">
                            <Rating fractions={2} defaultValue={3} />
                        </div>
                        <div className="bookmark">
                            <Button>Bookmark</Button>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="course">
                        <Image src={ courseLogo4 } className="logo"></Image>
                        <div className="text">
                            <p className="title">FTVM 272</p>
                            <p className="description">Classic Film Theory I</p>
                        </div>
                        <div className="rating">
                            <Rating fractions={2} defaultValue={4} />
                        </div>
                        <div className="bookmark">
                            <Button>Bookmark</Button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Savedcourses