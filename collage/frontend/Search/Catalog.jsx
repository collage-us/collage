import { Container, Grid } from "@mantine/core";
import React, {useState, useEffect, lazy} from "react";
import '../CSS/Search.css';
// import CourseBox from './CourseBox';
const CourseBox = lazy(() => import('./CourseBox'))
const ProfileBar = lazy(() => import('./ProfileBar'))
const SearchWrapper = lazy(() => import('./SearchWrapper'))

const Catalog = ({ userId }) => {
  // const [courses, setCourses] = useState([]);

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       const response = await fetch(`/api/catalog/`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ user_id: userId}),
  //       });
  //       const result = await response.json;
  //       if (!response.ok){
  //         throw new Error('Network response error');
  //       }

  //       setCourses(result);

  //       // TODO: add error check for `result` when the user does not exist
  //       // in this case, the backend will return {"status": "failure"}
  //     } catch(error) {
  //       console.error('Error fetching courses');
  //     }
  //   };

  //   fetchCourses();
  // }, [userId]);

  return (
    <div className="main-grid">
      <div className="profile">
        <ProfileBar/>
      </div>
      <div className="search">
        <SearchWrapper/>
      </div>
    </div>
    // <Container>
    //   <Grid>
    //     {courses.map((course) => (
    //       <Grid.Col span={4} key={course.course_id}>
    //         <CourseBox course={course} />
    //       </Grid.Col>
    //     ))}
    //   </Grid>
    // </Container>
  );
};

export default Catalog;
