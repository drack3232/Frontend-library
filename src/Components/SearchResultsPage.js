import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
// Використовуємо .js, як у вашому прикладі
import BookCard from './BookCard.js'; 

const API_URL = "http://localhost:5000";

const SearchResultsPage = ({ 
  wishlist, 
  onToggleWishlist, 
  onAddToCart
}) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  useEffect(() => {
    // Повертаємо вашу логіку пошуку через API
    const fetchSearchResults = async () => {
      if (!query) { 
        setSearchResults([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        // Робимо запит до вашого бекенд-ендпоінту
        const res = await axios.get(`${API_URL}/books/search`, {
          params: { q: query } // Передаємо запит як параметр ?q=...
        });
        setSearchResults(res.data);
      } catch (err) {
        console.error("Помилка пошуку:", err);
        setError("Сталася помилка під час пошуку.");
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]); // Залежність ТІЛЬКИ від 'query'

  return (
    // Використовуємо CSS класи, а не Tailwind
    <div className="main-container search-page-container">
      <div className="search-content-card"> 
        <h1 className="search-title">
          {loading ? `Пошук...` : 
            (query && searchResults.length > 0) ? 
            `Результати пошуку для: "${query}"` :
            (query) ?
            `Нічого не знайдено за запитом: "${query}"` :
            'Введіть запит для пошуку'
          }
        </h1>
        
        {loading && <div className="loading-text">🔄 Пошук...</div>}
        
        {error && <div className="error-text">{error}</div>}

        {!loading && !error && query && searchResults.length === 0 && (
          <div className="empty-search-placeholder">
            <p>На жаль, за вашим запитом нічого не знайдено.</p>
            <p>Спробуйте змінити свій запит.</p>
          </div>
        )}

        {!loading && !error && searchResults.length > 0 && (
          // Використовуємо .books-grid, який стилізується в App.css
          <div className="books-grid">
            {searchResults.map(book => (
              <BookCard
                key={book.id}
               book={book}
                // === ЗАЛИШАЄМО ПРАВИЛЬНУ ПЕРЕДАЧУ ПРОПСІВ ===
                isWished={wishlist.has(book.id)} 
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;