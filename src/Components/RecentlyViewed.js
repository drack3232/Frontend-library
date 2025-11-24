import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookCard from './BookCard'; 

const RecentlyViewed = ({ wishlist, onToggleWishlist, onAddToCart, currentBookId }) => {
  const [viewedBooks, setViewedBooks] = useState([]);

  useEffect(() => {
    const storedHistory = sessionStorage.getItem('recentlyViewed');
    
    if (storedHistory) {
      try {
        let parsed = JSON.parse(storedHistory);
      
        if (currentBookId) {
            parsed = parsed.filter(book => Number(book.id) !== Number(currentBookId));
        }

        setViewedBooks(parsed);
      } catch (e) {
        console.error("❌ Помилка читання історії (сброс):", e);
        sessionStorage.removeItem('recentlyViewed'); 
      }
    } else {
      console.log("📭 Історія переглядів пуста.");
    }
  }, [currentBookId]);

  
  if (viewedBooks.length === 0) return null;

  return (
    <section className="py-10 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span>👀</span> Ви нещодавно переглядали
        </h2>

        {/* Горизонтальний скрол */}
        <div className="horizontal-scroll-container pb-4">
          {viewedBooks.map(book => (
            <div key={book.id} className="scroll-item">
              <BookCard 
                book={book}
                // Перевіряємо wishlist, якщо він переданий
                isWished={wishlist ? wishlist.has(book.id) : false}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;