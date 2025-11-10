import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = "http://localhost:5000";

const BookDetailPage = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookResponse, reviewsResponse] = await Promise.all([
          axios.get(`http://localhost:5000/books/${bookId}`),
          axios.get(`http://localhost:5000/books/${bookId}/reviews`)
        ]);
        setBook(bookResponse.data);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error("Помилка завантаження даних:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [bookId]);

  const handleAddToCart = async () => { 
    const token = localStorage.getItem('token');

    // 1. Перевіряємо, чи користувач залогінений
    if (!token) {
      // Якщо ні, ти можеш показати модальне вікно логіну
      // (але зараз просто покажемо alert)
      alert("Будь ласка, увійдіть, щоб додати товар у кошик.");
      return; 
    }

    try {
      // 2. Відправляємо запит на бекенд
      await axios.post(
        `${API_URL}/cart/add`, 
        { bookId: book.id }, // Відправляємо ID книги
        { headers: { 'Authorization': `Bearer ${token}` } } // З токеном
      );
      
      // 3. Повідомляємо про успіх
      alert("Книгу успішно додано в кошик!"); 
      
      // 4. (Опціонально) Можна змінити вигляд кнопки
      // setAddedToCart(true); 

    } catch (error) {
      console.error("Помилка додавання в кошик:", error);
      alert("Не вдалося додати книгу в кошик.");
    }
   };

  if (loading) { return <div className="loading">🔄 Завантаження...</div>; }
  if (!book) { return <div className="container"><h2>Книгу не знайдено.</h2></div>; }

  return (
    <div className="book-detail-page">
      <div className="container">
        <div className="book-detail-grid">

          {/* --- Ліва колонка (Обкладинка + Блок покупки) --- */}
          <div className="book-detail-left-column">
            <div className="book-detail-cover">
              <img src={book.cover_url} alt={book.title} />
            </div>
            <div className="purchase-box-wrapper">
              <div className="purchase-box">
                <div className="price-container">
                  <span className="current-price">{book.price || '590'} грн</span>
                  <span className="old-price">{Math.round((book.price || 590) * 1.15)} грн</span>
                </div>
                <button className="btn-add-to-cart" onClick={handleAddToCart}>
                  🛒 Додати в кошик
                </button>
              </div>
            </div>
          </div>

          {/* --- Права колонка (Інформація, Опис, Характеристики, Відгуки) --- */}
          <div className="book-detail-right-column">
            <h1>{book.title}</h1>
            <p className="book-detail-author-link">{book.author}</p>
            
            <div className="description-section">
              <h3>Опис</h3>
              <p>{book.description}</p>
            </div>

            <div className="detail-section characteristics-table">
              <h3>Характеристика</h3>
              <table>
                <tbody>
                  <tr><td>Автор</td><td>{book.author}</td></tr>
                  <tr><td>Рік видання</td><td>{book.year}</td></tr>
                  <tr><td>Розділ</td><td>{book.genre}</td></tr>
                  <tr><td>Обкладинка</td><td>палітурка</td></tr>
                  <tr><td>Сторінок</td><td>428</td></tr>
                  <tr><td>Видавництво</td><td>Drack</td></tr>
                </tbody>
              </table>
            </div>

            <div className="detail-section reviews-section">
              <div className="reviews-header">
                <h3>Відгуки</h3>
                <button className="btn-outline">Написати відгук</button>
              </div>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div className="review-card" key={index}>
                    <div className="review-header">
                      <span className="review-author">{review.user_name}</span>
                      <span className="stars">{'⭐'.repeat(review.rating)}</span>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p>Для цієї книги ще немає відгуків.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;  