import React, { useState } from 'react';
import axios from 'axios';
// Переконайся, що твої стилі імпортуються (зазвичай в App.js або index.js)

const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Скидаємо помилку

    try {
      const res = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });
      
      // Зберігаємо токен і перезавантажуємо сторінку
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user_id', res.data.user.id);
      window.location.reload(); // Найпростіший спосіб оновити стан
      
      onClose(); // Закриваємо модальне вікно
    } catch (err) {
      console.error("Помилка входу:", err);
      setError(err.response?.data?.error || 'Помилка входу. Спробуйте ще раз.');
    }
  };

  return (
    // 👇 Крок 1: Додай .modal-overlay
    <div className="modal-overlay" onClick={onClose}>
      
      {/* 👇 Крок 2: Додай .modal-content
          e.stopPropagation() не дає кліку по вікну закрити його 
      */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Кнопка "х" для закриття */}
        <button className="btn-close" onClick={onClose}>&times;</button>
        
        <h2 style={{ textAlign: 'center', marginTop: 0 }}>Вхід</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' }}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' }}
          />

          {/* Повідомлення про помилку */}
          {error && <p className="error-message">{error}</p>}
          
          {/* Використовуємо той самий клас .btn-register для кнопки */}
          <button type="submit" className="btn-register">
            Увійти
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;