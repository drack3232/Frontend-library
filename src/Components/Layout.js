import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header'; // Припускаю, що Header лежить тут
import Footer from './Footer'; // Припускаю, що Footer лежить тут

// Імпортуй свої модальні вікна
// import RegisterForm from '../RegisterForm';
// import LoginForm from '../LoginForm';

// Заглушки, якщо файлів ще немає
const RegisterForm = ({ onClose, onLoginClick }) => (
  <div style={modalStyles} onClick={onClose}>
    <div style={modalContentStyles} onClick={e => e.stopPropagation()}>
      <h2>Реєстрація (Заглушка)</h2>
      <button onClick={onLoginClick}>Вже є акаунт? Увійти</button>
      <button onClick={onClose}>Закрити</button>
    </div>
  </div>
);
const LoginForm = ({ onClose }) => (
  <div style={modalStyles} onClick={onClose}>
    <div style={modalContentStyles} onClick={e => e.stopPropagation()}>
      <h2>Логін (Заглушка)</h2>
      <button onClick={onClose}>Закрити</button>
    </div>
  </div>
);


export default function Layout() {
  // Стан модальних вікон тепер живе у Layout
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Функції для передачі в Header
  const handleOpenLogin = () => setShowLogin(true);
  const handleOpenRegister = () => setShowRegister(true);
  const handleCloseModals = () => {
    setShowLogin(false);
    setShowRegister(false);
  };
  const switchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  return (
    <div className="app-layout">
      {/* Передаємо функції в Header */}
      <Header 
        onLoginClick={handleOpenLogin} 
        onRegisterClick={handleOpenRegister}
      />

      <main className="main-content">
        {/* <Outlet> — це місце, куди React Router буде 
            вставляти твої сторінки (HomePage, ProfilePage, і т.д.) */}
        <Outlet />
      </main>

      <Footer />

      {/* Модальні вікна рендеряться тут, поверх усього */}
      {showRegister && 
        <RegisterForm 
          onClose={handleCloseModals} 
          onLoginClick={switchToLogin} 
        />}
      {showLogin && 
        <LoginForm 
          onClose={handleCloseModals} 
        />}
    </div>
  );
}

// Тимчасові стилі для модалок
const modalStyles = {
  position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
  alignItems: 'center', justifyContent: 'center', zIndex: 1000,
};
const modalContentStyles = {
  backgroundColor: 'white', padding: '2rem', borderRadius: '8px', color: 'black'
};
