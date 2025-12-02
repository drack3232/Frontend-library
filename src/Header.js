import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const IconProfile = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 25 25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);


const IconSun = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
)

const IconMoon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const IconBox = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

const IconLibrary = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v15H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
  </svg>
);

const IconLogout = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const IconChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const IconHeart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);
const IconTrash = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const Header = ({ 
  onLoginClick, 
  onRegisterClick, 
  cartItems,
  cartTotal,
  onRemoveFromCart,
  cartItemCount,
  userName,   
  theme, 
  toggleTheme        
 
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id');
  const isLoggedIn = token && userId;
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  

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
  const handleOpenCart = () => {
    setCartModalOpen(true);
  };

  const handleCloseCart = () => {
    setCartModalOpen(false);
  };
 
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };
  
  return (
    <> 
      <header className="app-header">
        <div className="container header-container-flex">
          
          <div className="header-left-flex">
            <Link to="/" className="logo">📚 Kormak book</Link>
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

          {/* === СЕКЦІЯ ІКОНОК (ПРАВОРУЧ) === */}
          <div className="user-actions">
            <button 
              onClick={toggleTheme} 
              className="theme-button"
              title={theme === 'light' ? 'Перемкнути на темну' : 'Перемкнути на світлу'}
            >
              {theme === 'light' ? <IconMoon /> : <IconSun />}
            </button>
            {isLoggedIn ? (
              <>
                {/* --- ІКОНКА БАЖАНЬ --- */}
                <Link to="/wishlist" className="wishlist-icon-link" title="Список бажань">
                  <IconHeart />
                </Link>

                {/* --- ІКОНКА КОШИКА --- */}
                <button 
                  onClick={handleOpenCart} 
                  className="cart-icon-link" 
                  title="Перейти до кошика"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  {cartItemCount > 0 && (
                    <span className="cart-badge">{cartItemCount}</span>
                  )}
                </button>

                {/* --- КНОПКА ПРОФІЛЮ --- */}
                <div className="profile-menu">
                  <button 
                    className="profile-button"
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                  >
                    <span className="profile-icon-wrapper">
                      <IconProfile />
                     
                    </span>
                    <div className="profile-button-text">
                      <span>{userName}</span>
                      <strong>Вітаємо!</strong>
                    </div>
                    <span className={`profile-chevron ${isDropdownOpen ? 'open' : ''}`}>
                      <IconChevronDown />
                    </span>
                  </button>

                  {/* ---ВИПАДАЮЧЕ МЕНЮ --- */}
                  {isDropdownOpen && (
                    <div className="dropdown-content">
                      <ul>
                        <li>
                          <Link to="/profile">
                            <IconProfile />
                            <span>Профіль</span>
                          </Link>
                        </li>
                    
                        <li>
                          <Link to="/orders">
                            <IconBox />
                            <span>Мої замовлення</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/library">
                            <IconLibrary />
                            <span>Бібліотека</span>
                          </Link>
                        </li>
                        <li className="logout-item">
                          <button onClick={handleLogout}>
                            <IconLogout />
                            <span>Вийти з акаунту</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* --- Версія для неавторизованого користувача --- */}
                <Link to="/wishlist" className="wishlist-icon-link" title="Список бажань">
                  <IconHeart />
                </Link>
                <button 
                  onClick={handleOpenCart} 
                  className="cart-icon-link" 
                  title="Перейти до кошика"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  {cartItemCount > 0 && (
                    <span className="cart-badge">{cartItemCount}</span>
                  )}
                </button>
                <button className="btn-login" onClick={onLoginClick}>Вхід</button>
                <button className="btn-register" onClick={onRegisterClick}>Реєстрація</button>
              </>
            )}
          </div>
          
        </div>
      </header>

      {/* --- Модальне вікно кошика  --- */}
      {isCartModalOpen && (
        <div className="modal-overlay" onClick={handleCloseCart}>
          <div className="modal-content" onClick={handleModalContentClick}>
            <div className="modal-header">
              <button onClick={handleCloseCart} className="close-button">&times;</button>
              <h2>Кошик</h2>
            </div>
            <div className="modal-tabs">
              <a href="#" className="tab-active">Фізичні товари ({cartItems.length})</a>
            </div>
            <div className="modal-body">
              {cartItems.length === 0 ? (
                <p>Ваш кошик порожній.</p>
              ) : (
                <ul className="cart-items-list">
                  {cartItems.map(item => {
                     const price = parseFloat(item.price) || 0
                      const quantity = parseInt(item.quantity, 10) || 1
                      const itemTotal = price * quantity
                      return(
                    <li key={item.id} className="cart-item">
                      <img 
                        src={item.cover_url || 'https://placehold.co/60x90/f7f7f7/aaa?text=Book'}
                        alt={item.title} 
                        className="cart-item-image" 
                      />
                      <div className="cart-item-details">
                        <h4>{item.title}</h4>
                        <p>Кількість: {item.quantity}</p>
                      </div>
                     
                       <div className="cart-item-controls">
                      <span className="cart-item-price">{itemTotal.toFixed(2)} грн</span>
                      <button className="cart-item-remove-button" title="Видалити" onClick = {() => onRemoveFromCart(item.id)} > 
                        
                          
                          <IconTrash />
                          </button>
                          </div>
                    </li>
)})}
                </ul>
              )}
              <br/>
            </div>
            <div className="cart-modal-footer">
              <span className="total-price-badge">Разом: <strong>{cartTotal ? cartTotal.toFixed(2) : '0.00'} грн</strong></span>
              <button className="checkout-button">
                Продовжити &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;