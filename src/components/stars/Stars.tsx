// import React, { useState } from 'react';
import StarRating from './star-rating.component';

const Stars: React.FC<{ onChange: (value: number) => void }> = ({ onChange }) => {
  // const [productRating, setProductRating] = useState<number>(0);

  return (
    <div className='App'>
      {/* <h2>Current Rating: {productRating}</h2> */}
      <StarRating onChange={onChange} />
    </div>
  );
}

export default Stars;

