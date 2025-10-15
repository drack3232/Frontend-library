// src/components/Footer.js

import React from 'react';


const Footer = () => {
  const currentYear = new Date().getFullYear(); // Автоматично отримуємо поточний рік

  return (
    <footer className="app-footer">
      <div className="container">
        <p>&copy; {currentYear} Онлайн Бібліотека. Всі права захищено.</p>
        <div className="social-links">
          <a href="#">Facebook</a>
          <a href="#">Telegram</a>
          <a href="#">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;