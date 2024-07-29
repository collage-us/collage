import React, {useState, useEffect} from "react";

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
  return(
    <div>
      <h1>This is the Profile Bar</h1>
    </div>
  )
};

export default Profile;