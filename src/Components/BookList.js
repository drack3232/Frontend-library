import React from 'react';
import BookCard from './BookCard'; // Імпортуємо наш новий компонент

// Цей компонент приймає масив книг ('books') як пропс
const BookList = ({ books }) => {
  return (
    <div className="books-grid"  >
      {books.map(book => (
              // Для кожної книги з масиву створюємо її картку
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;