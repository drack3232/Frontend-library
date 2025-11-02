import { useEffect, useState } from "react";
// Додай useParams, якщо будеш робити BookDetailPage
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import axios from "axios";
import "./App.css";


// === ТВОЇ ІМПОРТИ ===
import Header from "./Header";
import Footer from "./Components/Footer";
import Portfolio from "./Components/Portfolio";
import RegisterForm from "./Components/Register";
import LoginForm from "./Components/Login";
// ProfilePage тепер визначений всередині App
// import ProfilePage from "./Components/ProfilePage";
import OrderPage from "./Components/OrderPage";
import LibraryPage from "./Components/LibraryPage";
import BookDetailPage from "./Components/BookDetailPage";
import BookCard from "./Components/BookCard";
import PopularBooks from './Components/PopularBooks';
import BookCarousel from './Components/BookCarousel';
import SearchResultsPage from './Components/SearchResultsPage';
 
// --- Головний компонент App ---
function App() {

  // ============================================
  // === СТАН КОМПОНЕНТА (State) ================
  // ============================================

  const [books, setBooks] = useState([]); // Це для старого каталогу, можна прибрати пізніше
  const [loading, setLoading] = useState(true); // Це теж для старого каталогу
  const [newBook, setNewBook] = useState({ title: "", author: "" });
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // --- Стан для Бібліотеки (Бажаного) ---
  const [wishlist, setWishlist] = useState(new Set());
  const [groupedBooks, setGroupedBooks] = useState({});

  // Базовий URL для API
  const API_URL = "http://localhost:5000"; // Переконайся, що порт правильний

  // ============================================
  // === КОМПОНЕНТ СТОРІНКИ ПРОФІЛЮ =============
  // ============================================
  // (Визначений тут, як ти і зробив раніше)
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
        <div className="container mx-auto px-4 py-8"> {/* Додав контейнер для центрування */}
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

  // ============================================
  // === ФУНКЦІЇ ДЛЯ РОБОТИ З ДАНИМИ ============
  // ============================================

  // --- (Ця функція більше не викликається на головній, але потрібна для форми) ---
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

  // --- Завантаження списку бажаного (ID книг) ---
  const fetchWishlist = async () => {
    const token = localStorage.getItem('token');
    if (!token) return; 
    try {
      const res = await axios.get(`${API_URL}/api/wishlist`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setWishlist(new Set(res.data));
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        console.log("Користувач не автентифікований для завантаження wishlist.");
      } else {
        console.error('Не вдалося завантажити список бажаного:', error);
      }
    }
  };

  // --- Завантаження книг, згрупованих за жанром ---
  const fetchGroupedBooks = async () => {
    try {
      const res = await axios.get(`${API_URL}/books/by-genre`);
      setGroupedBooks(res.data);
    } catch (err) {
      console.error("Помилка завантаження книг за жанром:", err);
    }
  };

  // --- Додавання нової книги (з форми) ---
  const addBook = async () => {
    if (!newBook.title || !newBook.author) return alert("Заповніть назву та автора");
    try {
      await axios.post(`${API_URL}/books`, newBook);
      // Оновлюємо списки
      fetchGroupedBooks(); // Оновлюємо каруселі
      // fetchBooks(); // Якщо б у нас була сторінка "Весь каталог", ми б оновлювали і її
      setNewBook({ title: "", author: "" }); // Очищуємо форму
    } catch (err) {
      console.error("Помилка додавання:", err);
      alert("Помилка при додаванні книги"); 
    }
  };

  // --- Додавання/видалення книги з бібліотеки (кнопка) ---
  const handleToggleWishlist = async (bookId) => {
    const token = localStorage.getItem('token');
    
    console.log("СПРОБА ДОДАТИ В БІБЛІОТЕКУ. Book ID:", bookId);
    if (!token) {
      setShowLogin(true);
      return;
    }
    const isAdded = wishlist.has(bookId);
    try {
      if (isAdded) {
        await axios.delete(`${API_URL}/api/wishlist/${bookId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setWishlist(prev => {
          const newWishlist = new Set(prev);
          newWishlist.delete(bookId);
          return newWishlist;
        });
      } else {
        await axios.post(`${API_URL}/api/wishlist`, { bookId }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setWishlist(prev => new Set(prev).add(bookId));
      }
    } catch (error) {
      console.error('Помилка оновлення списку бажаного:', error);
      alert("Сталася помилка. Спробуйте пізніше.");
    }
  };

  // ============================================
  // === ЕФЕКТИ (useEffect) =====================
  // ============================================

  // Завантажуємо дані при першому рендері
  useEffect(() => {
    // fetchBooks(); // Більше не завантажуємо "Весь каталог" на головній
    fetchWishlist();
    fetchGroupedBooks(); // Завантажуємо наші секції-каруселі
  }, []); // Пустий масив залежностей означає "запустити один раз"


  return (
    <BrowserRouter>
      {/* Головна обгортка */}
      <div className="app-layout flex flex-col min-h-screen bg-gray-100"> {/* Фон KSD (сірий) */}

        {/* --- Шапка Сайту --- */}
        <Header
          onLoginClick={() => setShowLogin(true)}
          onRegisterClick={() => setShowRegister(true)}
        />

        {/* --- Основний Контент (де змінюються сторінки) --- */}
        {/* === ЗМІНА 2: `main` тепер на всю ширину === */}
        <main className="main-content flex-grow">
          <Routes>

            {/* --- Маршрут для Головної Сторінки --- */}
            <Route
              path="/"
              // === ЗМІНА 3: Повністю нова структура `element` ===
              element={
                <>
                  {/* Секція 1: Portfolio (слайдер). 
                    Він має бути на білому фоні.
                  */}
                  <div className="bg-white">
                    <Portfolio />
                  </div>

                  {/* Секція 2: Новинки. 
                    Білий блок на всю ширину, контейнер всередині.
                  */}
                  <div className="bg-white pt-12 pb-4"> {/* 👈 Білий фон + відступи */}
                    <div className="container mx-auto px-4"> {/* 👈 Контейнер всередині */}
                      <PopularBooks 
                        wishlist={wishlist}
                        onToggleWishlist={handleToggleWishlist}
                      />
                    </div>
                  </div>

                  {/* Секція 3: Каруселі за жанрами.
                    ОДИН білий блок, всередині - контейнер,
                    в якому вже будуть всі каруселі.
                  */}
                  <div className="bg-white pt-8 pb-12"> {/* 👈 Білий фон + відступи */}
                    <div className="container mx-auto px-4"> {/* 👈 Контейнер всередині */}
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

                  {/* Секція 4: Форма додавання (Адмінка).
                    Я виніс її в окремий блок на сірому фоні.
                  */}
                  <div className="py-12"> {/* 👈 Сірий фон (бо ми на bg-gray-100) */}
                    <div className="container mx-auto px-4">
                      {/* Робимо саму форму білою карткою 
                        і обмежуємо її ширину, щоб вона виглядала як адмінка
                      */}
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
                </> // Кінець React Fragment
              } // Кінець element
            /> {/* Кінець Route для "/" */}

            {/* --- Маршрути для Інших Сторінок --- */}
            {/* ВАЖЛИВО: Інші сторінки тепер теж мають мати свій 
              `container`, оскільки ми прибрали його з `main`.
              Я додав його в `ProfilePage` вище. 
              Тобі потрібно додати його і в `LibraryPage`, `BookDetailPage` і `OrderPage`.
              Наприклад: <div className="container mx-auto px-4 py-8"> ...весь вміст сторінки... </div>
            */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/books/:bookId" element={<BookDetailPage />} />
            <Route path="/orders" element={<OrderPage />} />
<Route
              path="/search"
              element={
                <SearchResultsPage
                  wishlist={wishlist} // Передаємо стан бібліотеки
                  onToggleWishlist={handleToggleWishlist} // Передаємо функцію
                />
              }
            />

            {/* Додай інші маршрути тут, якщо потрібно */}

          </Routes>
        </main> {/* Кінець main-content */}

        {/* --- Підвал Сайту --- */}
        <Footer />

        {/* --- Модальні вікна (Логін/Реєстрація) --- */}
        {showRegister &&
          <RegisterForm
            onClose={() => setShowRegister(false)}
            onLoginClick={() => { setShowRegister(false); setShowLogin(true); }}
          />}
        {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}

      </div> {/* Кінець app-layout */}
    </BrowserRouter>
  );
}

export default App;