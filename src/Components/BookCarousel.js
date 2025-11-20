import React from 'react';
import BookCard from './BookCard'; // Ми перевикористовуємо нашу картку

const BookCarousel = ({ title, books, wishlist, onToggleWishlist, onAddToCart }) => {
  // Не показувати секцію, якщо в ній немає книг
  if (!books || books.length === 0) {
    return null;
  }

  return (
    <div className="book-carousel-section mb-12">
      {/* Заголовок секції (наприклад, "Фантастика") */}
      <h2 className="text-3xl font-bold mb-6">{title}</h2>
      
      {/* === ЗМІНА ТУТ: Ми використовуємо новий CSS-клас === */}
      <div className="book-carousel-grid-scroll">
        
        {books.map(book => (
          // === ЗМІНА ТУТ: Ми прибрали div-обгортку. BookCard тепер прямий нащадок ===
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

export default BookCarousel;