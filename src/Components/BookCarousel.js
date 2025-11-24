import React from 'react';
import BookCard from './BookCard'; 

const BookCarousel = ({ title, books, wishlist, onToggleWishlist, onAddToCart }) => {
  if (!books || books.length === 0) {
    return null;
  }

  return (
    <div className="book-carousel-section mb-12">
      <h2 className="text-3xl font-bold mb-6">{title}</h2>
      <div className="book-carousel-grid-scroll">
        
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

export default BookCarousel;