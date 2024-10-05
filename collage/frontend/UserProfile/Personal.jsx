import React, {useState, useEffect} from "react";
import headerImage from '../images/profile-header.png';
import batman from '../images/max-pic.png';
import gmail64 from '../images/gmail64.svg.png';
import linkedin64 from '../images/linkedin64.png';
import camera from '../images/change-profile.png';
import '../CSS/Personal.css';

let userData = {
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

const Personal = ({isUser, userName}) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [profile, setProfile] = useState(userData);
  
  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Make POST request here
    userData = profile;
  }

  //const [userData, setUserData] = useState(null);

  // useEffect(() => {
  //   fetch(`/api/user?userName=${encodeURIComponent(userName)}`)
  //     .then(response => response.json())
  //     .then(data => setUserData(data))
  //     .catch(error => console.error('Error:', error));
  // }, [userName]);

  console.log(isUser);
  console.log(typeof isUser);
  return (
    <>
      {/* {userData ? ( */}
        <div className="personal-container">
          <div className="header">
            <div className="header-image-container">
              {/* top header image */}
              <img src={headerImage} alt="image" className="header-image"/>

              {/* pencil button */}
              {isUser && (
                <button onClick={togglePopup} className="pencil-button" style={{backgroundColor: "transparent"}}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="pencil-icon" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                    <path d="M13.5 6.5l4 4" />
                  </svg>
                </button>
              )}

              {/* popup box */}
              {isPopupVisible && (
                <div className="popup-overlay" onClick={togglePopup}>
                  <div className="popup-box" onClick={e => e.stopPropagation()}>
                    <h2>Edit Profile</h2>
                    <button onClick={togglePopup}>X</button>
                    <div>
                      <p>Name</p>
                      <input 
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <p>Major</p>
                      <input 
                        type="text"
                        name="major"
                        value={profile.major}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <p>Minor</p>
                      <input 
                        type="text"
                        name="minor"
                        value={profile.minor}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <p>Minor</p>
                      <input 
                        type="text"
                        name="college"
                        value={profile.college}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <p>Graduation Year</p>
                      <input 
                        type="text"
                        name="graduationYear"
                        value={profile.graduationYear}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <p>LinkedIn</p>
                      <input 
                        type="text"
                        name="linkedin"
                        value={profile.linkedin}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <p>Gmail</p>
                      <input 
                        type="text"
                        name="gmail"
                        value={profile.email}
                        onChange={handleChange}
                      />
                    </div>
                    <button onClick={() => { handleSubmit(); togglePopup(); }}>Save Changes</button>
                  </div>
                </div>
              )}

              {/* profile picture */}
              <img src={userData.profilePicture} alt="Profile" className="profile-picture" />
              
              {/* camera button */}
              {isUser && (
                <button onClick={() => alert("change prof pic")} className="camera-button"> 
                  <img src={camera} alt="Camera" className="camera"/>
                </button>
              )}
            </div>

            <div className="header-content">
              <h1 className="name">{userData.name}</h1>
              <p className="user-tag">@{userData.userTag} &nbsp; | &nbsp; {userData.pronouns}</p>
              
              {/* edit profile button */}
              {isUser && (
                <button className="edit-icon" style={{padding: "15px 0px 0px 0px"}} onClick={() => alert("edit profile")}>edit profile</button>
              )}

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