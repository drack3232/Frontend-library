import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import Portfolio from '../components/Portfolio'; // Розкоментуй, якщо є

// Заглушка
const Portfolio = () => <div style={{padding: '2rem', backgroundColor: '#eef', textAlign: 'center'}}><h2>Блок Портфоліо/Слайдер (Заглушка)</h2></div>;

// Припускаю, що логіка fetching/adding книг належить цій сторінці
export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "" });
  
  // Функції, перенесені з твого App.js
  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/books"); // Використовуй правильний URL
      setBooks(res.data);
    } catch (err) {
      console.error("Помилка завантаження книг:", err);
    }
  };

  const addBook = async () => {
    try {
      await axios.post("http://localhost:3001/api/books", newBook); // Використовуй правильний URL
      setNewBook({ title: "", author: "" });
      fetchBooks(); // Оновлюємо список
    } catch (err) {
      console.error("Помилка додавання книги:", err);
    }
  };

  // Завантажуємо книги при першому рендері сторінки
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <Portfolio />
      <div className="container"> {/* (Tailwind: mx-auto px-4) */}
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
            // Ти використовував book.id, але MongoDB дає _id. Перевір, що у тебе
            <Link to={`/books/${book._id || book.id}`} key={book._id || book.id} className="book-card-link">
              <div className="book-card"> 
                <div className="book-cover-container">
                  <img
                    src={book.cover_url}
                    alt={book.title}
                    onError={(e) => { e.target.src = 'https://placehold.co/400x600?text=No+Image'; }} // Заглушка, якщо фото немає
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
}
