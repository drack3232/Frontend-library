import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetailPage = () => {
  const { bookId } = useParams(); // Отримуємо 'bookId' з URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/books/${bookId}`);
        setBook(res.data);
      } catch (error) {
        console.error("Помилка завантаження книги:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  if (loading) {
    return <div className="loading">🔄 Завантаження книги...</div>;
  }

  if (!book) {
    return <div className="container"><h2>Книгу не знайдено.</h2></div>;
  }

  return (
    <div className="container book-detail-container">
      <div className="book-detail-cover">
        <img src={book.cover_url} alt={book.title} />
      </div>
      <div className="book-detail-info">
        <h1>{book.title}</h1>
        <h2>{book.author}</h2>
        <div className="book-detail-meta">
          <span><strong>Рік:</strong> {book.year}</span>
          <span><strong>Жанр:</strong> {book.genre}</span>
        </div>
        <p className="book-detail-description">{book.description}</p>
        <button className="btn-register">Додати в кошик</button>
      </div>
    </div>
  );
};

export default BookDetailPage;