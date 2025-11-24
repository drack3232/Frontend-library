import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onLoginClick, onRegisterClick }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/'; 
  };

  return (
    <header className="app-header">
      <div className="container header-container">
        <div className="header-left">
          <Link to="/" className="logo">📚 Онлайн Бібліотека</Link>
          <nav className="main-nav">
            <ul>
              <li><Link to="/">Головна</Link></li>
            </ul>
          </nav>
        </div>
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
                    <li><a href="#"><span>🛍️</span>Мої замовлення</a></li>
                    <li><a href="#"><span>📚</span>Бібліотека</a></li>
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