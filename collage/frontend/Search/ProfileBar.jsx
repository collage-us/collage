import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import {Image } from '@mantine/core';
import profPic from '../images/prof-pic.jpg';
import fullLogo from '../images/full-logo.png';
import '../CSS/ProfBar.css';

const Profile = ({ userId, operation }) => {
  // const [data, setData] = useState(null);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`/api/student/${userId}?operation=${operation}`);
  //       const result = await response.json();
  //       if (response.ok ){
  //         setData(result);
  //       } else{
  //         setError(result.error);
  //       }
  //     } catch (error) {
  //       setError(error.toString());
  //     }
  //   };
  //   fetchData();
  // }, [userId, operation])

  // if (error){
  //   return <div>Error: {error}</div>;
  // }

  // if (!data){
  //   return <div>Loading...</div>;
  // }

  return(
    <div class='side'>
      <div className="background-container">
        <div className="gray-part"></div>

        <div className="full-bar">
          <div className="header-container">
            <Image src={ fullLogo } className="collage-header"/>
            <Image radius="md" src={profPic} className="prof-pic" /> 
          </div>

          <h2 style={{ textAlign: "center" }}>Lego Batman</h2>
          <p style={{ textAlign: "center" }}>Forensics Major at the University of Gotham</p>

          <div className="social-grid">
            <div className="social-titles">
              <p>Profile viewers</p>
              <p>Followers</p>
            </div>

            <div className="social-stats">
              <p>858</p>
              <p>1,025</p>
            </div>
          </div>
          
          <div style={{borderBottom: "1px solid #ECECEC"}} className="social-grid">
            <div className="social-titles">
              <p>Graduation year</p>
              <p>Credits completed</p>
              <p>Credits to complete</p>
              <p>Registration term</p>
            </div>

            <div className="social-stats">
              <p>2026</p>
              <p>91</p>
              <p>23</p>
              <p>FA '24</p>
            </div>
          </div>

          <div className="registration-info">
            <p style={{ textAlign: "center", fontSize: "1.3rem", marginBottom: "15px"}}>Registration Date:</p>
            <p style={{ textAlign: "center" }} className="registration-time">November 28th at 3:00pm</p>
          </div>

          {/* <Link to="/Classpreview">
            <button>class</button>
          </Link> */}
          <Link to="/Savedcourses">
            <button>saved</button>
          </Link>
        </div>
      </div>
    </div>
  )
};

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`/api/student/${userId}?operation=${operation}`);
  //       const result = await response.json();
  //       if (response.ok ){
  //         setData(result);
  //       } else{
  //         setError(result.error);
  //       }
  //     } catch (error) {
  //       setError(error.toString());
  //     }
  //   };
  //   fetchData();
  // }, [userId, operation])

  // if (error){
  //   return <div>Error: {error}</div>;
  // }

  // if (!data){
  //   return <div>Loading...</div>;
  // }

  // return <>
  //   {operation === 'user_stats' && (
  //     <div>
  //       <p>{data.follower_count}</p>
  //       <p>{data.view_count}</p>
  //     </div>
  //   )}
  //   {operation === 'student_info' && (
  //     <div>
  //       <p>{data.graduation_year}</p>
  //       <p>{data.registration_term}</p>
  //       <p>{data.credits_completed}</p>
  //       <p>{data.credits_required}</p>
  //     </div>
  //   )}
  // </>

export default Profile;