import React from 'react';
import { Link } from 'react-router-dom';


const IconTrash = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);


const CartPage = ({ cartItems = [], cartTotal, onRemoveFromCart }) => {

  return (
    <div className="main-container cart-page-container">
      <h1>Ваш кошик</h1>

      {cartItems.length === 0 ? (
        <div className="cart-empty-message-container">
          <p>Кошик порожній.</p>
          <Link to="/" className="checkout-button">
            Перейти до каталогу
          </Link>
        </div>
      ) : (
        <div className="cart-page-layout">
          
          
          <div className="cart-items-list-fullpage">
            {cartItems.map((item) => {
              const price = parseFloat(item.price) || 0;
              const quantity = parseInt(item.quantity, 10) || 1;
              const itemTotal = price * quantity;

              return (
                <div key={item.id} className="cart-item">
                  <img 
                    src={item.cover_url || 'https://placehold.co/80x120/f0f0f0/ccc?text=Book'} 
                    alt={item.title} 
                    className="cart-item-image" 
                  />
                  <div className="cart-item-details">
                    <h3>{item.title}</h3>
                    <p>{item.author}</p>
                  </div>
                  <div className="cart-item-controls-fullpage">
                    <p className="cart-item-price">{itemTotal.toFixed(2)} грн</p>
                    <button 
                      className="cart-item-remove-button" 
                      onClick={() => onRemoveFromCart(item.id)}
                    >
                      <IconTrash />
                    </button>
                  </div>
              </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <h2>Підсумок</h2>
            <div className="cart-summary-row">
              <span>Товари ({cartItems.length}):</span>
              <span>{cartTotal ? cartTotal.toFixed(2) : '0.00'} грн</span>
            </div>
            <div className="cart-summary-row">
              <span>Доставка:</span>
              <span>Безкоштовно</span>
            </div>
            <div className="cart-summary-total">
              <span>Разом:</span>
              <span>{cartTotal ? cartTotal.toFixed(2) : '0.00'} грн</span>
            </div>
            <button className="checkout-button" style={{width: '100%', marginTop: '20px'}}>
              Перейти до оформлення
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default CartPage;