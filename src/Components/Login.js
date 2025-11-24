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
      const res = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user_id', res.data.user.id);
      window.location.reload(); 
      onClose(); 
    } catch (err) {
      console.error("Помилка входу:", err);
      setError(err.response?.data?.error || 'Помилка входу. Спробуйте ще раз.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn-register">
            Увійти
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;