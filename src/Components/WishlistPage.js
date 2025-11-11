import React, { useMemo } from 'react';
// Використовуємо .js, оскільки цей шлях у вас працював
import BookCard from "./BookCard.js"; 

// Приймаємо `allBooks`, `onAddToCart` та `onToggleWishlist` з App.js
const WishlistPage = ({ 
  wishlist, 
  onToggleWishlist, 
  onAddToCart, 
  allBooks = [] 
}) => {

  // Фільтруємо всі книги, щоб знайти ті,
  // ID яких є у вашому Set() `wishlist`
  const wishedBooks = useMemo(() => {
     if (!allBooks || !wishlist) {
      return [];
    }
    return allBooks.filter(book => wishlist.has(book.id));
  }, [allBooks, wishlist]);

  return (
    // ВИПРАВЛЕНО: Використовуємо CSS-класи замість Tailwind
    <div className="main-container wishlist-page-padding">
      <div className="wishlist-content-card">
        <h1 className="wishlist-title">
          Список бажаних
        </h1>
        
        {wishedBooks.length > 0 ? (
          // ВИПРАВЛЕНО: Використовуємо клас .books-grid
          <div className="books-grid">
            {wishedBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                // isWished тут завжди true,
                // оскільки це сторінка списку бажаних
                isWished={true} 
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart} // 👈 Передаємо його сюди
              />
            ))}
          </div>
        ) : (
          // ВИПРАВЛЕНО: Використовуємо CSS-класи
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