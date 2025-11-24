import React from 'react';
import { Link } from 'react-router-dom'; 
import Portfolio from './Portfolio';
import GenreSlider from './GenreSlider';


const MainPage = ({ books, newBook, setNewBook, addBook }) => {
  return (
    <>
      <Portfolio />
      <GenreSlider genre="Фентезі" />
      
      <div className="container">
        <div className="form-section">
          <h2>Додати нову книгу</h2>
          <div className="form">
            <input
              placeholder="Назва книги *"
              value={newBook.title}
              onChange={e => setNewBook({ ...newBook, title: e.target.value })}
            />
            <input
              placeholder="Автор *"
              value={newBook.author}
              onChange={e => setNewBook({ ...newBook, author: e.target.value })}
            />
            <button onClick={addBook}>➕ Додати книгу</button>
          </div>
        </div>

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
              <Link to={`/books/${book.id}`} className="details-link"></Link>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default MainPage;