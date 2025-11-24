import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import BookCard from './BookCard.js'; 
import App from '../App.js';

const API_URL = "http://localhost:5000";

const SearchResultsPage = ({ 
  wishlist, 
  onToggleWishlist, 
  onAddToCart,
  allBooks=[]
}) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');




  useEffect(() => {
   
    const fetchSearchResults = async () => {
      if (!query) { 
        setSearchResults([]);
        setLoading(false);
        return;
      }
const lowerCaseQuery = query.toLowerCase();
      
      const filtered = allBooks.filter(book => {
          const matchTitle = book.title && book.title.toLowerCase().includes(lowerCaseQuery);
          const matchAuthor = book.author && book.author.toLowerCase().includes(lowerCaseQuery);

          return matchTitle || matchAuthor;
      })
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${API_URL}/books/search`, {
          params: { q: query } 
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
  }, [query]); 

  return (
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
          <div className="books-grid">
            {searchResults.map(book => (
              <BookCard
                key={book.id}
               book={book}
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