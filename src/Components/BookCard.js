import React from 'react';
import { Link } from 'react-router-dom';

// Цей компонент приймає одну книгу ('book') як пропс
const BookCard = ({ book }) => {
  return (
    // <Link> обгортає все, роблячи картку клікабельною
    <Link to={`/books/${book.id}`} className="book-card-link">
      <div className="book-card">
        <div className="book-cover-container">
          <img
            src={book.cover_url}
            alt={book.title}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
        <div className="book-info">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">{book.author}</p>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;