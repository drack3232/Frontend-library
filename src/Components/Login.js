import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      // Зберігаємо токен у локальному сховищі браузера
      localStorage.setItem('token', response.data.token);
      alert('Вхід успішний!');
      window.location.reload(); // Перезавантажуємо сторінку, щоб оновити стан
    } catch (err) {
      setError('Неправильний email або пароль.');
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Вхід</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Увійти</button>
        </form>
        <button className="btn-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default LoginForm;