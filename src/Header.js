import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Переконайся, що твої стилі імпортуються (зазвичай в App.js або index.js)

const Header = ({ onLoginClick, onRegisterClick }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const token = localStorage.getItem('token');
  
  // Додаємо хуки для пошуку
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Використовуємо класи з твого App.css (app-header, container)
  // та додаємо нові, які ми опишемо в Кроці 2
  return (
    <header className="app-header">
      {/* Ми додаємо новий клас "header-container-flex" 
        для кращого контролю над вирівнюванням 
      */}
      <div className="container header-container-flex">
        
        {/* === ЛІВИЙ БЛОК (Лого, Навігація, Пошук) === */}
        <div className="header-left-flex">
          <Link to="/" className="logo">📚 Онлайн Бібліотека</Link>
          <nav className="main-nav">
            <ul>
              <li><Link to="/">Головна</Link></li>
            </ul>
          </nav>

          {/* === ФОРМА ПОШУКУ (без лупи) === */}
          <form onSubmit={handleSearchSubmit} className="search-form-header">
            <input
              type="text"
              placeholder="Пошук в Онлайн Бібліотеці"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input-header" // Новий клас для стилізації
            />
          </form>
        </div>

        {/* === ПРАВИЙ БЛОК (Кнопки) === */}
        <div className="user-actions">
          {token ? (
            <div className="profile-menu">
              <button 
                className="profile-button" 
                onClick={() => setDropdownOpen(!isDropdownOpen)}
              >
                👤 Вітаємо!
              </button>

              {isDropdownOpen && (
                <div className="dropdown-content">
                  <ul>
                    <li><Link to="/profile"><span>👤</span>Профіль</Link></li>
                    <li><Link to="/orders"><span>🛍️</span>Мої замовлення</Link></li>
                    <li><Link to="/library"><span>📚</span>Бібліотека</Link></li>
                    <li className="logout-item">
                      <button onClick={handleLogout}><span>↪️</span>Вийти з акаунту</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              <button className="btn-login" onClick={onLoginClick}>Вхід</button>
              <button className="btn-register" onClick={onRegisterClick}>Реєстрація</button>
            </>
          )}
        </div>
        
      </div>
    </header>
  );
};

export default Header;