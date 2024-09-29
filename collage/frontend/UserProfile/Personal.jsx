import React, {useState, useEffect} from "react";
import headerImage from '../images/profile-header.png';
import batman from '../images/max-pic.png';
import gmail64 from '../images/gmail64.svg.png';
import linkedin64 from '../images/linkedin64.png';
import camera from '../images/change-profile.png';
import '../CSS/Personal.css';

const Personal = (isUser) => {
  //const [userData, setUserData] = useState(null);

  // useEffect(() => {
  //   fetch(`/api/user?userName=${encodeURIComponent(userName)}`)
  //     .then(response => response.json())
  //     .then(data => setUserData(data))
  //     .catch(error => console.error('Error:', error));
  // }, [userName]);

  const userData = {
    profilePicture: batman,
    name: "Max Feldman",
    userTag: "MaxFeldman",
    pronouns: "he/him",
    followers: "200",
    following: "124",
    major: "Philosophy, Politics, Economics",
    minor: "Creative Writing and Entrepreneurship",
    college: "Undergraduate LSA",
    graduationYear: "2026",
    email: "maxfeld@umich.edu",
    linkedin: "https://www.linkedin.com/in/maxbfeldman/"
  }

  return (
    <>
      {/* {userData ? ( */}
        <div className="personal-container">
          <div className="header">
            <div className="header-image-container">
              <img src={headerImage} alt="image" className="header-image"/>
              <img src={userData.profilePicture} alt="Profile" className="profile-picture" />
              <button onClick={() => alert("change prof pic")} className="camera-button"> 
                <img src={camera} alt="Camera" className="camera"/>
              </button>
            </div>

            <div className="header-content">
              <h1 className="name">{userData.name}</h1>
              <p className="user-tag">@{userData.userTag} &nbsp; | &nbsp; {userData.pronouns}</p>
              
              <button className="edit-icon" style={{padding: "15px 0px 0px 0px"}} onClick={() => alert("edit profile")}>edit profile</button>
              <div className="icons">
                {userData.email ? (
                  <button onClick={() => window.location.href = `mailto:${userData.email}`} className="email">
                    <img src={gmail64} alt="gmail"/>
                  </button>
                ) : (
                  <button disabled className="email-disabled">
                    <img src={gmail64} alt="gmail"/>
                  </button>
                )}
                {userData.linkedin ? (
                  <button onClick={() => window.open(userData.linkedin, '_blank')} className="linkedin">
                    <img src={linkedin64} alt="gmail"/>
                  </button>
                ) : (
                  <button disabled className="linkedin-disabled">
                    <img src={linkedin64} alt="gmail"/>
                  </button>
                )}
              </div>

              <div className="followers">
                <p>{userData.followers} followers</p>
                <p>{userData.following} following</p>
              </div>
            </div>

          </div>
          <div className="info">
            <p className="label">MAJOR</p>
            <p className="data">{userData.major}</p>
            <p className="label">MINOR</p>
            <p className="data">{userData.minor}</p>
            <p className="label">COLLEGE</p>
            <p className="data">{userData.college}</p>
            <p className="label">GRADUATION YEAR</p>
            <p className="data">{userData.graduationYear}</p>
          </div>

        </div>
      {/* ) : (
        <p>Loading...</p>
      )} */}
    </>
  );
};

export default Personal;