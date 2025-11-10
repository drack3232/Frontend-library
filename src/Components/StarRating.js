import React from 'react';

// Стили для цього компонента ми додали в App.css
const StarRating = ({ rating, setRating }) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button" // Важливо, щоб не відправляти форму
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