import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";

import Header from "./Header";
import Footer from "./Components/Footer";
import Portfolio from "./Components/Portfolio";
import RegisterForm from "./Components/Register";
import LoginForm from "./Components/Login";
import ProfilePage from "./Components/ProfilePage";
import OrderPages from "./Components/OrderPages";
import LibraryPages from "./Components/LibraryPages";
import BookDetailPage from "./Components/BookDetailPage";
import MainPage from "./Components/MainPage";
// --- Компонент сторінки профілю (визначений прямо тут) ---

// --- Головний компонент App ---
function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newBook, setNewBook] = useState({ title: "", author: "" });
 const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const API_URL = "http://localhost:5000/books";

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setBooks(res.data);
    } catch (err) {
      console.error("Помилка завантаження книг:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);
  
  const addBook = async () => {
    if (!newBook.title || !newBook.author) return alert("Заповніть назву та автора");
    try {
      await axios.post(API_URL, newBook);
      fetchBooks();
      setNewBook({ title: "", author: "" });
    } catch (err) {
      console.error("Помилка додавання:", err);
    }
  };

  if (loading) {
    return <div>Завантаження...</div>;
  }

  // 👇 Зміна №2: Вся розмітка обернута в BrowserRouter і має Routes
  return (
    <BrowserRouter>
      <div className="app-layout"> 
        <Header 
         onLoginClick={() => setShowLogin(true)} 
          onRegisterClick={() => setShowRegister(true)}
        
        />
        <main className="main-content">
          <Routes>
            {/* Маршрут для головної сторінки */}
            <Route 
              path="/" 
              element={
                <>
                  <Portfolio />
                  <div className="container">
                    <div className="form-section">
                      <h2>Додати нову книгу</h2>
                      <div className="form">
                        <input
                          placeholder="Назва книги *"
                          value={newBook.title}
                          onChange={e => setNewBook({ ...newBook, title: e.target.value })}
                        />
                        <input
                          placeholder="Автор *"
                          value={newBook.author}
                          onChange={e => setNewBook({ ...newBook, author: e.target.value })}
                        />
                        <button onClick={addBook}>➕ Додати книгу</button>
                      </div>
                    </div>
                    <h2>Каталог Книг</h2>
                    <div className="books-grid">
                      {books.map(book => (
                        <div className="book-card" key={book.id}>
                           <div className="book-cover-container">
                              <img src={book.cover_url} alt={book.title} onError={(e) => e.target.style.display='none'}/>
                           </div>
                           <div className="book-info">
                              <h3 className="book-title">{book.title}</h3>
                              <p className="book-author">{book.author}</p>
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              } 
            />
            
            {/* Маршрут для сторінки профілю */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/orders" element={<OrderPages />} />
            <Route path="/library" element={<LibraryPages />} />
            <Route path="/books/:bookId" element={<BookDetailPage />} />
            <Route path="/" element={<MainPage books={books} />} />
          </Routes>
        </main>
        <Footer />
        {showRegister && 
          <RegisterForm 
            onClose={() => setShowRegister(false)} 
            onLoginClick={() => { setShowRegister(false); setShowLogin(true); }} 
          />}
        {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
      </div>
    </BrowserRouter>
  );
}

export default App;