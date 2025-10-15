import React from 'react';
import { Link } from 'react-router-dom';
import Portfolio from './Portfolio';

const MainPage = ({ books }) => {
  return (
    <>
      <Portfolio />
      <div className="container">
        <h2>Каталог Книг</h2>
        <div className="books-grid">
          {books.map(book => (
            <Link to={`/books/${book.id}`} key={book.id} className="book-card-link">
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
          ))}
        </div>
      </div>
    </>
  );
};

export default MainPage;