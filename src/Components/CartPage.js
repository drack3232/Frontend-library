import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = "http://localhost:5000";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id'); // Беремо ID з localStorage

    if (!token || !userId) {
      setError("Будь ласка, увійдіть, щоб побачити свій кошик.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/cart/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCartItems(res.data);
      setError(null);
    } catch (err) {
      console.error("Помилка завантаження кошика:", err);
      setError("Не вдалося завантажити кошик.");
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
         setError("Сесія застаріла. Будь ласка, увійдіть знову.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Функція для розрахунку загальної суми
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price || 0), 0).toFixed(2);
  };

  // --- Рендер ---
  
  if (loading) {
    return <div className="container" style={{padding: '20px', textAlign: 'center'}}>🔄 Завантаження кошика...</div>;
  }

  if (error) {
    return <div className="container" style={{padding: '20px', textAlign: 'center', color: 'red'}}>{error}</div>;
  }

  return (
    <div className="container" style={{paddingTop: '30px', paddingBottom: '30px'}}>
      <h1 style={{textAlign: 'left', fontSize: '2.2rem'}}>Ваш кошик</h1>

      {cartItems.length === 0 ? (
        <div style={{textAlign: 'center', padding: '40px', background: '#fff', borderRadius: '8px'}}>
          <p style={{fontSize: '1.2rem'}}>Кошик порожній.</p>
          <Link to="/" className="btn-register" style={{textDecoration: 'none'}}>
            Перейти до каталогу
          </Link>
        </div>
      ) : (
        <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', alignItems: 'flex-start'}}>
          
          {/* Колонка 1: Список товарів */}
          <div className="cart-items-list" style={{background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.07)'}}>
            {cartItems.map((item) => (
              <div key={item.id} style={{display: 'flex', gap: '15px', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '15px'}}>
                <img src={item.cover_url} alt={item.title} style={{width: '80px', height: '120px', objectFit: 'cover', borderRadius: '4px'}} />
                <div style={{flexGrow: 1}}>
                  <h3 style={{marginTop: 0, marginBottom: '5px'}}>{item.title}</h3>
                  <p style={{margin: 0, color: '#6c757d'}}>{item.author}</p>
                  <p style={{margin: '10px 0 0', fontWeight: '700', fontSize: '1.1rem'}}>{item.price} грн</p>
                </div>
                <button 
                  className="btn-delete" 
                  style={{background: '#e74c3c', color: 'white', height: '40px', alignSelf: 'center'}}
                  onClick={() => alert('Видалення ще не реалізовано')}
                >
                  Видалити
                </button>
              </div>
            ))}
          </div>

          {/* Колонка 2: Підсумок */}
          <div className="cart-summary" style={{background: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #e9ecef', position: 'sticky', top: '100px'}}>
            <h2 style={{marginTop: 0, textAlign: 'left', fontSize: '1.5rem'}}>Підсумок</h2>
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', marginBottom: '10px'}}>
              <span>Товари ({cartItems.length}):</span>
              <span>{getTotalPrice()} грн</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', marginBottom: '20px'}}>
              <span>Доставка:</span>
              <span>Безкоштовно</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: '700', borderTop: '2px solid #ccc', paddingTop: '15px'}}>
              <span>Разом:</span>
              <span>{getTotalPrice()} грн</span>
            </div>
            <button className="btn-register" style={{width: '100%', marginTop: '20px', fontSize: '1.1rem'}}>
              Перейти до оформлення
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
