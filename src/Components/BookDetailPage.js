import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getBooksFromCache } from '../dbService';
import RecentlyViewed from './RecentlyViewed';

const API_URL = "http://localhost:5000";

const BookDetailPage = ({ onAddToCart }) => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  
        fetchBook();
  }, [bookId]);

const fetchBook = async () => {
    setLoading(true);
    let foundInCache = false; 

    // ЕТАП 1: КЕШ
    try {
      const cachedBooks = await getBooksFromCache();
      const foundBook = cachedBooks.find(b => b.id == bookId);

      if (foundBook) {
        console.log('📖 Книгу знайдено в кеші!');
        setBook(foundBook);
        setLoading(false); // Показуємо контент одразу
        foundInCache = true;
      }
    } catch (err) {
      console.log('Помилка читання кешу:', err);
    }

    // ЕТАП 2: СЕРВЕР
    try {
      const response = await axios.get(`${API_URL}/books/${bookId}`);
      setBook(response.data);
      setLoading(false); 
      
    } catch (err) {
      console.error('Сервер недоступний:', err);
      
      if (!foundInCache) {
        setLoading(false);
      }
    }
  };

  const handleAddToCart = async () => { 
    const token = localStorage.getItem('token');

    if (!token) {
      
      alert("Будь ласка, увійдіть, щоб додати товар у кошик.");
      return; 
    }

    try {
      await axios.post(
        `${API_URL}/cart/add`, 
        { bookId: book.id }, 
        { headers: { 'Authorization': `Bearer ${token}` } } 
      );
      
      alert("Книгу успішно додано в кошик!"); 
      
    } catch (error) {
      console.error("Помилка додавання в кошик:", error);
    
    }
    onAddToCart(book);
   };

   useEffect(() => {
    if (book && book.id) {
      try {
        const stored = sessionStorage.getItem('recentlyViewed');
        let history = stored ? JSON.parse(stored) : [];
        
        history = history.filter(item => Number(item.id) !== Number(book.id)); 
        
        history.unshift({ 
            id: book.id, 
            title: book.title, 
            cover_url: book.cover_url, 
            price: book.price,
            author: book.author 
        });

        if (history.length > 5) history = history.slice(0, 5); 
        sessionStorage.setItem('recentlyViewed', JSON.stringify(history));
        console.log("✅ Історія оновлена:", history); 

      } catch (error) {
        console.error("Помилка запису історії:", error);
      }
    }
  }, [book]);

  if (loading) { return <div className="loading">🔄 Завантаження...</div>; }
  if (!book) { return <div className="container"><h2>Книгу не знайдено.</h2></div>; }
  

  return (
    <div className="book-detail-page">
      <div className="container">
        <div className="book-detail-grid">

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