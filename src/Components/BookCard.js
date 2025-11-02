import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book, isBookInWishlist, onToggleWishlist }) => {
  return (
    <div className="book-card-container h-full flex flex-col bg-white rounded-lg shadow overflow-hidden transition-shadow hover:shadow-lg">
      
      <div className="flex-grow">
        
        {/* === БЛОК ОБКЛАДИНКИ З УМОВОЮ === */}
        <Link to={`/books/${book.id}`} className="book-card-link">
          <div className="book-cover-container h-64 bg-gray-200"> {/* Завжди має фон-заглушку */}
            
            {/* Ми перевіряємо: чи існує `book.cover_url`?
            */}
            {book.cover_url ? (
              // ТАК: Рендеримо <img>
              <img
                className="w-full h-full object-cover"
                src={book.cover_url}
                alt={book.title}
                // onError тепер просто ховає поламане зображення, якщо URL виявився битим
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : (
              // НІ: (url = null) Рендеримо <div>-заглушку з іконкою
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400 text-5xl" role="img" aria-label="book icon">📚</span>
              </div>
            )}
          </div>
        </Link>
        {/* === КІНЕЦЬ БЛОКУ ОБКЛАДИНКИ === */}


        <div className="book-info p-4">
          <div className="flex items-center mb-1 text-sm">
            <span className="text-yellow-500 font-bold">★ {parseFloat(book.rating || 0).toFixed(1)}</span>
            <span className="text-gray-400 ml-2">({book.reviews_count || 0} оцінок)</span>
          </div>
          
          <Link to={`/books/${book.id}`}>
            {/* Залишаємо фіксовану висоту для заголовка */}
            <h3 
              className="book-title h-14 overflow-hidden font-bold text-lg mb-1 hover:text-blue-600 transition-colors"
              title={book.title}
            >
              {book.title}
            </h3>
          </Link>
          
          <p className="book-author text-gray-600 text-sm truncate">{book.author}</p>
          
          <p className="text-lg font-bold text-gray-900 mt-2">
            {book.price} грн
          </p>
        </div>
      </div>

      {/* Кнопка (залишається притиснутою до низу) */}
      <div className="p-4 pt-0">
        <button
          onClick={() => onToggleWishlist(book.id)}
          className={`w-full p-2 rounded transition-colors text-sm font-medium ${
            isBookInWishlist
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
        >
          {isBookInWishlist ? '✅ В бібліотеці' : '🧡 Додати в бібліотеку'}
        </button>
      </div>

    </div>
  );
};

export default BookCard;