import React, {lazy} from 'react';
import courseIcon from './Vector (2).svg'; // TODO: update png/vector
const CourseTag = lazy(() => import('./course_tag'));

function App() {
  const courseData = {
    courseNumber: 'ECON 101',
    courseName: 'Principles of Economics I',
    percentMatch: '96%',
    rating: 4,
    numRatings: 850,
    tags: ['microeconomics', 'competition', 'trade', 'supply and demand', 'taxes'],
    icon: courseIcon,
    credits: 3,
    creditColor: '#c2d7fe',
    headerColor: '#eff4ff',
    iconColor: '#000',
  };

  const handleClick = () => {
    // Figure out redirection
    //window.location.href = `/course/${courseData.courseNumber}`;
  };

  return (
    <div className="App">
      <div className="course-tag-container">
        <CourseTag {...courseData} onClick={handleClick} />
      </div>
    </div>
  );
}

export default App;
