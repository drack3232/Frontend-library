import React, { useMemo } from 'react';
import BookCard from "./BookCard"; // 👈 Імпортуємо картку книги

// Приймаємо `allBooks` з App.js
const WishlistPage = ({ wishlist, onToggleWishlist, allBooks = [] }) => {

  // Фільтруємо всі книги, щоб знайти ті,
  // ID яких є у вашому Set() `wishlist`
  const wishedBooks = useMemo(() => {
    if (!allBooks || !wishlist) {
      return [];
    }
    return allBooks.filter(book => wishlist.has(book.id));
  }, [allBooks, wishlist]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md min-h-[400px]">
        <h1 className="text-2xl font-bold mb-6">
          Список бажаних
        </h1>
        
        {wishedBooks.length > 0 ? (
          // Створюємо сітку для карток, 4 колонки
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishedBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                // `isWished` тут завжди true,
                // оскільки це сторінка списку бажаних
                isWished={true} 
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        ) : (
          // Повідомлення, якщо список порожній
          <div className="text-center text-gray-500 pt-10">
            <p className="text-lg">Ваш список бажаних порожній.</p>
            <p>Натисніть на сердечко біля товару, щоб додати його сюди.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default WishlistPage;