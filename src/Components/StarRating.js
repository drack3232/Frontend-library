import React from 'react';
const StarRating = ({ rating, setRating }) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button" 
          key={star}
          className={star <= rating ? "star-button on" : "star-button off"}
          onClick={() => setRating(star)}
        >
          <span className="star-char">★</span>
        </button>
      ))}
    </div>
  );
};

export default StarRating;