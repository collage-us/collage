import React from 'react';
import './course_tag.css';
import starFilled from './Vector.svg';
import starEmpty from './Vector (1).svg';
import tinycolor from "tinycolor2";

function CourseCard({
  courseNumber,
  courseName,
  percentMatch,
  rating,
  numRatings,
  tags,
  icon,
  credits,
  creditColor,
  headerColor,
  iconColor,
  onClick,
}) {

  const darkCreditColor = tinycolor(creditColor).darken(30).toString();

  const stars = Array(5).fill(0).map((_, index) => (
  <span key={index} className="star">
    {index < rating ? (
      <img className='star' src= {starFilled} alt="S" />
    ) : (
      <img src= {starEmpty} alt="E" />
    )}
  </span>
  ));

  return (
    <div className="course-tag" onClick={onClick}>
        
      <div className="header" style={{ backgroundColor: headerColor }}>
        <img src={icon} alt="Course Icon" style={{ color: iconColor }} className="course-icon" />
        
        <div className="course-info">
            <div className="top-row">
                
            <h3 className="course-number"> {courseNumber}</h3>
            
            <div className="credits" style={{ backgroundColor: creditColor, color:darkCreditColor }}>
                {credits} credits
            </div>
            </div>
            
            <h4 className="course-name">{courseName}</h4>
          
        </div>
        
      </div>
      

      <div className="body">
            <div className='rating-text'>
                Rating
            </div>
        
        <div className="top-section">
            <div className="match">
            <p>{percentMatch} match</p>
            </div>
            
            <div className="rating">
                <div>
                    {stars}
                </div>
                <span className='star-text'>(Out of {numRatings} people)</span>
            </div>
        </div>
    
        <span className='course-tag-text'>Course tags</span>
        
        <div className="tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default CourseCard;
