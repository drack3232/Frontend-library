import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // Хук для отримання параметрів URL (?query=...)
import axios from 'axios';
import BookCard from './BookCard'; // Перевикористовуємо нашу картку

const API_URL = "http://localhost:5000";

const SearchResultsPage = ({ wishlist, onToggleWishlist }) => { // Приймаємо wishlist і функцію з App.js
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams(); // Отримуємо параметри URL
  const query = searchParams.get('query'); // Витягуємо значення параметра 'query'

  useEffect(() => {
    // Функція для завантаження результатів пошуку
    const fetchSearchResults = async () => {
      if (!query) { // Якщо запиту немає, нічого не робити
        setSearchResults([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        // Робимо запит на наш новий бекенд-ендпоінт
        const res = await axios.get(`${API_URL}/books/search`, {
          params: { q: query } // Передаємо запит як параметр ?q=...
        });
        setSearchResults(res.data);
      } catch (err) {
        console.error("Помилка пошуку:", err);
        setError("Сталася помилка під час пошуку.");
        setSearchResults([]); // Очищуємо результати у разі помилки
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]); // Перезавантажувати результати КОЖНОГО РАЗУ, коли змінюється `query` в URL

  // --- Рендер компонента ---

  // Не забуваємо додати container, як ми робили для інших сторінок
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Результати пошуку для: "{query}"
      </h1>

      {loading && <div className="text-center py-10">🔄 Пошук...</div>}
      
      {error && <div className="text-center py-10 text-red-600">{error}</div>}

      {!loading && !error && searchResults.length === 0 && (
        <p className="text-center text-gray-600">На жаль, за вашим запитом нічого не знайдено.</p>
      )}

      {!loading && !error && searchResults.length > 0 && (
        // Використовуємо ту саму сітку, що й на головній
        <div className="books-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.map(book => (
            <BookCard
              key={book.id}
              book={book}
              isBookInWishlist={wishlist.has(book.id)} // Перевіряємо, чи книга в бібліотеці
              onToggleWishlist={onToggleWishlist}     // Передаємо функцію додавання/видалення
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;