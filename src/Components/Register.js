import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = ({ onClose, onLoginClick }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/register', { name, email, password });
      alert('Реєстрація успішна! Тепер ви можете увійти.');
      onClose(); // Закриваємо вікно реєстрації
      onLoginClick(); // Відкриваємо вікно логіну
    } catch (err) {
      setError('Помилка реєстрації. Можливо, такий email вже існує.');
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Реєстрація</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ваше ім'я"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <button type="submit">Зареєструватися</button>
        </form>
        <button className="btn-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default RegisterForm;