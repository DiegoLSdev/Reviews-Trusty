import React from 'react';
import './posted-stars.css'
const PostStars: React.FC<{ stars: number }> = ({ stars }) => {
  const MAX_STARS = 5;

  return (
    <div className='stars-container'>
      {/* Render five stars */}
      {[...Array(MAX_STARS)].map((_, index) => (
        <span
          key={index}
          style={{ color: index < stars ? '#FFC94A' : '#c6c6c6' }}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
}

export default PostStars;
