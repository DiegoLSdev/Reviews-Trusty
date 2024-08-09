import React, { useState, useEffect, useCallback } from 'react';

import './star-rating.styles.css';

interface StarRatingProps {
  maxRating?: number;
  onChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ maxRating = 5, onChange = () => {} }) => {
  const [currentRating, setCurrentRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  useEffect(() => {
    onChange(currentRating);
  }, [currentRating, onChange]);

  const setRatingClickHandler = useCallback(
    (ratingValue: number) => {
      setCurrentRating((prevRating) => (prevRating === ratingValue ? 0 : ratingValue));
    },
    []
  );

  return (
    <div className='star-rating-container'>
      {[...Array(maxRating)].map((_, i) => {
        const ratingValue = i + 1;

        return (
          <div
            className={`star-rating ${
              ratingValue <= (hoveredRating || currentRating) ? 'active' : ''
            }`}
            key={i}
            onClick={() => setRatingClickHandler(ratingValue)}
            onMouseEnter={() => setHoveredRating(ratingValue)}
            onMouseLeave={() => setHoveredRating(0)}
          >
            &#9733;
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
