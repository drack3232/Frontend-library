
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const IconHeart = ({ filled = false, onClick }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" 
    viewBox="0 0 24 24" 
    fill={filled ? "#ff4757" : "none"} 
    stroke={filled ? "#ff4757" : "#333"} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="icon-heart"
    onClick={onClick}
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const IconShoppingCart = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const IconStar = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" height="20" 
    viewBox="0 0 24 24" 
    fill="#FFD700" 
    stroke="#FFD700" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="inline-block"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);


const IconNewBadge = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 24 24" 
    fill="#007bff" 
    stroke="white"
    strokeWidth="1"
    className="icon-new-badge"
  >
    <path d="M2 2v13.5a1.5 1.5 0 0 0 3 0V2H2z" />
    <path d="M5 2v13.5a1.5 1.5 0 0 0 3 0V2H5z" />
    <path d="M8 2v13.5a1.5 1.5 0 0 0 3 0V2H8z" />
    <path d="M11 2v13.5a1.5 1.5 0 0 0 3 0V2H11z" />
    <path d="M14 2v13.5a1.5 1.5 0 0 0 3 0V2H14z" />
    <path d="M17 2v13.5a1.5 1.5 0 0 0 3 0V2H17z" />
    <path d="M20 2v13.5a1.5 1.5 0 0 0 3 0V2H20z" />
  </svg>
);


const BookCard = ({ book, isWished, onToggleWishlist, onAddToCart }) => {
  const [imgError, setImgError] = useState(false);
  const { 
    id, 
    title = "Назва книги", 
    author = "Автор", 
    cover_url:imageUrl, 
    rating = 0, 
    reviewCount = 0, 
    price = 0, 
    discountPrice,
    isNew = false 
  } = book;
  const placeholderImg = "https://placehold.co/300x450/374151/FFFFFF?text=No+Image";
 const imageSrc = !imgError && book.cover_url 
    ? book.cover_url 
    : placeholderImg;
  // Вираховуємо, чи є знижка
  const hasDiscount = typeof discountPrice === 'number' && discountPrice < price;
  const finalPrice = hasDiscount ? discountPrice : price;

  const handleWishlistClick = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    onToggleWishlist(id);
  };

  const handleAddToCartClick = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    if (onAddToCart) {
        onAddToCart(book); 
    } else {
        console.error("onAddToCart function is not provided to BookCard");
    }
  };


  const stars = [];
  const fullStars = Math.floor(rating);
  for (let i = 0; i < fullStars; i++) {
    stars.push(<IconStar key={`star-${i}`} />);
  }
 

  return (
    <div className="book-card-container">
      <Link to={`/books/${id}`} className="book-card-link">
        
        <div className="book-card-image-wrapper">
          <img 
            src={imageSrc || 'https://placehold.co/250x380/f0f0f0/aaa?text=Book'} 
            alt={title} 
            className="book-card-image" 

            oonError={() => setImgError(true)}
          />
          
          {isNew && (
            <div className="book-card-new-badge">
              <IconNewBadge />
            </div>
          )}

          <button 
            className={`book-card-wishlist-button ${isWished ? 'wished' : ''}`} 
            onClick={handleWishlistClick}
            title={isWished ? "Видалити з бажаного" : "Додати до бажаного"}
          >
            <IconHeart filled={isWished} />
          </button>
        </div>
        
        <div className="book-card-details">
          <div className="book-card-rating">
            {stars.length > 0 ? stars : (
              <span className="no-rating">Немає оцінок</span>
            )}
            <span className="rating-value">{rating.toFixed(1)}</span>
            <span className="review-count">({reviewCount} оцінок)</span>
          </div>

          <h3 className="book-card-title">{title}</h3>
          <p className="book-card-author">{author}</p>
          
         
          <div className="book-card-footer">
            <div className="book-card-price">
              {hasDiscount && (
                <span className="original-price">{price} грн</span>
              )}
              <span className="current-price">{finalPrice} грн</span>
            </div>
            
            <button 
              className="book-card-cart-button" 
              onClick={handleAddToCartClick}
              title="Додати у кошик"
            >
              <IconShoppingCart />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;