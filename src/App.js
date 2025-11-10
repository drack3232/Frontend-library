import { useEffect, useState, useMemo } from "react";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import axios from "axios";
import "./App.css";

// === ІМПОРТИ ===
import Header from "./Header";
import Footer from "./Components/Footer";
import Portfolio from "./Components/Portfolio";
import RegisterForm from "./Components/Register";
import LoginForm from "./Components/Login";
import OrderPage from "./Components/OrderPage";
import LibraryPage from "./Components/LibraryPage";
import BookDetailPage from "./Components/BookDetailPage";
import BookCard from "./Components/BookCard";
import PopularBooks from './Components/PopularBooks';
import BookCarousel from './Components/BookCarousel';
import SearchResultsPage from './Components/SearchResultsPage';
import CartPage from "./Components/CartPage";
import WishlistPage from "./Components/WishlistPage";
 
// --- Головний компонент App ---
function App() {

  // === СТАН КОМПОНЕНТА ===
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newBook, setNewBook] = useState({ title: "", author: "" });
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [wishlist, setWishlist] = useState(new Set());
  const [groupedBooks, setGroupedBooks] = useState({});
  const [cartItems, setCartItems] = useState([]);
  
  // === НОВІ ДАНІ ДЛЯ ХЕДЕРА ===
  // (В ідеалі, 'userName' має братися з 'user' об'єкта після логіну)
  const [userName, setUserName] = useState("ARTEM"); // 👈 MOCK DATA
  const [notificationCount, setNotificationCount] = useState(15); // 👈 MOCK DATA
  // -------------------------

  const API_URL = "http://localhost:5000";

  // === КОМПОНЕНТ СТОРІНКИ ПРОФІЛЮ ===
  const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true); 

    useEffect(() => {
      const fetchProfile = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoadingProfile(false);
          return;
        }
        try {
          const res = await axios.get(`${API_URL}/profile`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          setUser(res.data);
          // !!! ПОРАДА: Ось де ви маєте встановлювати ім'я користувача
          // setUserName(res.data.name.toUpperCase()); 
        } catch (error) {
          console.error("Не вдалося завантажити профіль", error);
        } finally {
          setLoadingProfile(false);
        }
      };
      fetchProfile();
    }, []);


    if (loadingProfile) { 
      return <div className="loading">🔄 Завантаження профілю...</div>;
    }
    if (!user) {
      return (
        <div className="container mx-auto px-4 py-8">
          <h2>Будь ласка, увійдіть, щоб побачити свій кабінет.</h2>
        </div>
      );
    }
    return (
      <div className="profile-page-container container mx-auto px-4 py-8"> 
        <div className="profile-card bg-white p-6 rounded-lg shadow-md"> 
          <h1 className="text-2xl font-bold mb-4">Особистий кабінет</h1>
          <div className="profile-section mb-4">
            <h2 className="text-xl font-semibold mb-2">Мої дані</h2>
            <div className="profile-details">
              <p><strong>Ім'я:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          </div>
          <div className="profile-section mb-4">
            <h2 className="text-xl font-semibold mb-2">Історія замовлень</h2>
            <p className="profile-placeholder text-gray-500">У вас ще немає замовлень.</p>
          </div>
          <div className="profile-section">
            <h2 className="text-xl font-semibold mb-2">Список бажань</h2>
            <p className="profile-placeholder text-gray-500">Ваш список бажань порожній.</p>
          </div>
        </div>
      </div>
    );
  };

  // === ФУНКЦІЇ API ===
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/books`);
      setBooks(res.data);
    } catch (err) {
      console.error("Помилка завантаження книг:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    const token = localStorage.getItem('token');
    if (!token) return; 
    try {
      const res = await axios.get(`${API_URL}/api/wishlist`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setWishlist(new Set(res.data));
    } catch (error) {
      console.error('Не вдалося завантажити список бажаного:', error);
    }
  };

  const fetchGroupedBooks = async () => {
    try {
      const res = await axios.get(`${API_URL}/books/by-genre`);
      setGroupedBooks(res.data);
    } catch (err) {
      console.error("Помилка завантаження книг за жанром:", err);
    }
  };

  const fetchCartItems = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id'); 
    if (!token || !userId) {
      setCartItems([]);
      return;
    }
    try {
      const res = await axios.get(`${API_URL}/cart/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCartItems(res.data); 
    } catch (err) {
      console.error("Failed to fetch cart items:", err);
      setCartItems([]);
    }
  };

  const addBook = async () => {
    if (!newBook.title || !newBook.author) return alert("Заповніть назву та автора");
    try {
      await axios.post(`${API_URL}/books`, newBook);
      fetchGroupedBooks();
      setNewBook({ title: "", author: "" });
    } catch (err) {
      console.error("Помилка додавання:", err);
    }
  };

  const handleToggleWishlist = async (bookId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setShowLogin(true);
      return;
    }
    const isAdded = wishlist.has(bookId);
    try {
      if (isAdded) {
        await axios.delete(`${API_URL} wishlist/${bookId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setWishlist(prev => {
          const newWishlist = new Set(prev);
          newWishlist.delete(bookId);
          return newWishlist;
        });
      } else {
        await axios.post(`${API_URL} /wishlist`, { bookId }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setWishlist(prev => new Set(prev).add(bookId));
      }
    } catch (error) {
      console.error('Помилка оновлення списку бажаного:', error);
    }
  };

  // === useEffect ===
  useEffect(() => {
    fetchWishlist();
    fetchGroupedBooks();
    fetchCartItems();
  }, []);


  // === РОЗРАХУНКИ СТАНУ ===
  const cartItemCount = cartItems.length;
  const cartTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [cartItems]);

  return (
    <BrowserRouter>
      <div className="app-layout flex flex-col min-h-screen bg-gray-100">

        <Header
          onLoginClick={() => setShowLogin(true)}
          onRegisterClick={() => setShowRegister(true)}
          cartItemCount={cartItemCount}
          cartItems={cartItems}
          cartTotal={cartTotal}
          // === ПЕРЕДАЄМО НОВІ ПРОПСИ ===
          userName={userName}
          notificationCount={notificationCount}
        />

        <main className="main-content flex-grow">
          <Routes>

            <Route
              path="/"
              element={
                <>
                  <div className="bg-white">
                    <Portfolio />
                  </div>

                  <div className="bg-white pt-12 pb-4"> 
                    <div className="container mx-auto px-4"> 
                      <PopularBooks 
                        wishlist={wishlist}
                        onToggleWishlist={handleToggleWishlist}
                      />
                    </div>
                  </div>

                  <div className="bg-white pt-8 pb-12"> 
                    <div className="container mx-auto px-4"> 
                      {Object.keys(groupedBooks).length > 0 ? (
                        Object.entries(groupedBooks).map(([genre, booksInGenre]) => (
                          <BookCarousel
                            key={genre}
                            title={genre}
                            books={booksInGenre}
                            wishlist={wishlist}
                            onToggleWishlist={handleToggleWishlist}
                          />
                        ))
                    ) : (
                        <div className="text-center py-10">🔄 Завантаження секцій...</div>
                    )}
                    </div>
                  </div>

        _       <div className="py-12">
                    <div className="container mx-auto px-4">
                      <div className="form-section bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
                        <h2 className="text-xl font-semibold mb-3">Додати нову книгу</h2>
                        <div className="form flex flex-col md:flex-row gap-3">
                          <input
                            className="border p-2 rounded flex-grow"
                            placeholder="Назва книги *"
                            value={newBook.title}
                            onChange={e => setNewBook({ ...newBook, title: e.target.value })}
                          />
                          <input
                            className="border p-2 rounded flex-grow"
                            placeholder="Автор *"
                            value={newBook.author}
                            onChange={e => setNewBook({ ...newBook, author: e.target.value })}
                          />
                          <button
                            onClick={addBook}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                          >
                            ➕ Додати книгу
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              }
            />

            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/books/:bookId" element={<BookDetailPage />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/cart" element={<CartPage />} />
             <Route path="/wishlist" element={<WishlistPage/>} />
            <Route
              path="/search"
              element={
                <SearchResultsPage
                  wishlist={wishlist}
V                 onToggleWishlist={handleToggleWishlist}
                />
              }
            />
          </Routes>
G       </main>

        <Footer />

        {showRegister &&
          <RegisterForm
            onClose={() => setShowRegister(false)}
A           onLoginClick={() => { setShowRegister(false); setShowLogin(true); }}
          />}
        {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}

      </div>
    </BrowserRouter>
  );
}


export default App;