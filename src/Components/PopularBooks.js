import { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard'; 

const API_URL = "http://localhost:5000";



const PopularBooks = ({ wishlist, onToggleWishlist, onAddToCart }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/books/popular`);
        setBooks(res.data);
      } catch (err) {
        console.error("Помилка завантаження популярних книг:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPopular();
  }, []); 

  if (loading) {
    return <div className="text-center py-10">🔄 Завантаження новинок...</div>;
  }

  if (books.length === 0) {
    return null; 
  }

  return (
    <div className="popular-books-section mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Новинки у Kormak </h2>
      </div>
      
      
      <div className="books-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map(book => (
          <BookCard
            key={book.id}
            book={book}
            isBookInWishlist={wishlist.has(book.id)}
            onToggleWishlist={onToggleWishlist}
            onAddToCart={onAddToCart}
            isWished={wishlist.has(book.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularBooks;