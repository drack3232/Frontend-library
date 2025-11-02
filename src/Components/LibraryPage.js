import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookCard from './BookCard'; // Імпорт нашої картки

// URL твого сервера
const API_URL = "http://localhost:5000";

const LibraryPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функція для видалення книги з бібліотеки
  const handleRemoveFromLibrary = async (bookId) => {
    const token = localStorage.getItem('token');
    if (!token) return; 

    try {
      // 1. Видаляємо з сервера
      await axios.delete(`${API_URL}/api/wishlist/${bookId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      // 2. Видаляємо з локального стану (щоб вона миттєво зникла з екрану)
      setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));

    } catch (err) {
      console.error("Помилка видалення з бібліотеки:", err);
      alert("Не вдалося видалити книгу.");
    }
  };

  useEffect(() => {
    // Функція для завантаження книг з бібліотеки
    const fetchLibraryBooks = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError("Будь ласка, увійдіть, щоб побачити свою бібліотеку.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/wishlist/books`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setBooks(res.data); 
      } catch (err) {
        console.error("Помилка завантаження бібліотеки:", err);
        setError("Не вдалося завантажити вашу бібліотеку.");
      } finally {
        setLoading(false);
      }
    };

    fetchLibraryBooks();
  }, []); 

  // --- Рендер компонента ---

  if (loading) {
    // Додали обгортку
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        🔄 Завантаження бібліотеки...
      </div>
    );
  }

  if (error) {
    // Додали обгортку
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-600">
        {error}
      </div>
    );
  }
  
  if (books.length === 0) {
     // Додали класи до існуючого container
     return (
        <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Моя бібліотека</h1>
            <p className="text-gray-600">📚 Ваша бібліотека поки порожня.</p>
            <Link to="/" className="mt-4 inline-block bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">
                Перейти до каталогу
            </Link>
        </div>
     );
  }

  // Якщо все добре і книги є:
  return (
    // Додали класи до існуючого container
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Моя бібліотека</h1>
      <p className="mb-6 text-gray-700">Тут зібрані книги, які ви додали.</p>
      
      {/* Наш чистий блок з картками */}
      <div className="books-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map(book => (
          <BookCard
            key={book.id}
            book={book}
            isBookInWishlist={true} 
            onToggleWishlist={handleRemoveFromLibrary} 
          />
        ))}
      </div>
    </div>
  );
};

export default LibraryPage;