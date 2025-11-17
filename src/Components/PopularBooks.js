import { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard'; // Імпортуємо нашу нову картку

const API_URL = "http://localhost:5000";

// Цей компонент буде самостійно завантажувати /books/popular
// АЛЕ він не знає, які книги в бібліотеці.
// Тому App.js має передати йому стан `wishlist` та функцію `onToggleWishlist`

const PopularBooks = ({ wishlist, onToggleWishlist, onAddToCart }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        setLoading(true);
        // Використовуємо твій існуючий ендпоінт!
        const res = await axios.get(`${API_URL}/books/popular`);
        setBooks(res.data);
      } catch (err) {
        console.error("Помилка завантаження популярних книг:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPopular();
  }, []); // Пустий масив = завантажити 1 раз

  if (loading) {
    return <div className="text-center py-10">🔄 Завантаження новинок...</div>;
  }

  if (books.length === 0) {
    return null; // Нічого не показувати, якщо сервер нічого не повернув
  }

  return (
    <div className="popular-books-section mb-12">
      {/* Заголовок як у «КСД» */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Новинки у Ашота </h2>
        {/* Можна додати посилання "Побачити більше" пізніше */}
      </div>
      
      {/* Використовуємо той самий grid, але показуємо лише 4 книги (або скільки поверне твій API) */}
      <div className="books-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map(book => (
          // І просто перевикористовуємо BookCard!
          <BookCard
            key={book.id}
            book={book}
            isBookInWishlist={wishlist.has(book.id)}
            onToggleWishlist={onToggleWishlist}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularBooks;