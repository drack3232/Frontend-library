import React, { useMemo } from 'react';
import BookCard from "./BookCard.js"; 

const WishlistPage = ({ 
  wishlist, 
  onToggleWishlist, 
  onAddToCart, 
  allBooks = [] 
}) => {
  const wishedBooks = useMemo(() => {
     if (!allBooks || !wishlist) {
      return [];
    }
    return allBooks.filter(book => wishlist.has(book.id));
  }, [allBooks, wishlist]);

  return (
    <div className="main-container wishlist-page-padding">
      <div className="wishlist-content-card">
        <h1 className="wishlist-title">
          Список бажаних
        </h1>
        
        {wishedBooks.length > 0 ? (
          <div className="books-grid ">
            {wishedBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
            
                isWished={true} 
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart} 
              />
            ))}
          </div>
        ) : (
          <div className="empty-wishlist-message">
            <p className="empty-message-lg">Ваш список бажаних порожній.</p>
            <p>Натисніть на сердечко біля товару, щоб додати його сюди.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default WishlistPage;