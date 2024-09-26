import React, {useState, useEffect} from "react";

const Personal = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch(`/api/user?userName=${encodeURIComponent(userName)}`)
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error('Error:', error));
  }, [userName]);

  return (
    <>
      {userData ? (
        <div>
          <p>Name: {userData.name}</p>
          <p>User Tap: {userData.userTag}</p>
          <p># of Followers: {userData.followers}</p>
          <p># Following: {userData.following}</p>
          <p>Major: {userData.major}</p>
          <p>Minor: {userData.minor}</p>
          <p>College: {userData.college}</p>
          <p>Graduation Year: {userData.graduationYear}</p>
          {/* Email Icon */}
          {userData.email ? (
            <button onClick={() => window.location.href = `mailto:${userData.email}`}>Email Icon</button>
          ) : (
            <button disabled>Email Icon (greyed out) </button>
          )}
          {/* LinkedIn Icon */}
          {userData.linkedin ? (
            <button onClick={() => window.open(userData.linkedin, '_blank')}>LinkedIn Icon</button>
          ) : (
            <button disabled>LinkedIn Icon (greyed out)</button>
          )}
          {/* Pencil Icon for editing */}
          {isUser && (
            <button onClick={() => alert('Edit Popup (blank for now)')}>Pencil Icon</button>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Personal;