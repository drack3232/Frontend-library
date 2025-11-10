import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Ми припускаємо, що App.css або index.css імпортується в App.js/index.js

const Header = ({ onLoginClick, onRegisterClick }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const token = localStorage.getItem('token');
   const userId = localStorage.getItem('user_id');
   const isLoggedIn = token && userId;
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    window.location.href = '/';
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Тепер весь JSX використовує класи з твого App.css
  return (
    <header className="app-header">
      <div className="container header-container-flex">
        
        <div className="header-left-flex">
          <Link to="/" className="logo">📚 Онлайн Бібліотека</Link>
          <nav className="main-nav">
            <ul>
              <li><Link to="/" className="main-nav-link">Головна</Link></li>
            </ul>
          </nav>

          <form onSubmit={handleSearchSubmit} className="search-form-header">
            <input
              type="text"
              placeholder="Пошук в Онлайн Бібліотеці"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input-header"
            />
          </form>
        </div>

        <div className="user-actions">
          
          <Link to="/cart" className="cart-icon-link" title="Перейти до кошика">
            🛒
          </Link>

          {isLoggedIn ? (
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
              {/* Використовуємо класи .btn-login та .btn-register з App.css */}
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

