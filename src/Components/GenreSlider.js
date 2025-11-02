import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import BookCard from './BookCard'; // Використовуємо наш існуючий компонент картки

// Імпортуємо стилі Swiper
import 'swiper/css';
import 'swiper/css/navigation';

const GenreSlider = ({ genre }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooksByGenre = async () => {
      try {
        // Робимо запит, додаючи жанр як параметр
        const res = await axios.get(`http://localhost:5000/books?genre=${genre}`);
        setBooks(res.data);
      } catch (error) {
        console.error(`Помилка завантаження жанру ${genre}:`, error);
      }
    };
    fetchBooksByGenre();
  }, [genre]); // Ефект спрацює, якщо зміниться жанр

  if (books.length === 0) {
    return null; // Якщо книг немає, нічого не показуємо
  }

  return (
    <div className="container genre-slider-container">
      <h2>{genre}</h2>
      <Swiper
        spaceBetween={20} // Відстань між слайдами
        slidesPerView={'auto'} // Автоматично визначати кількість видимих слайдів
        // Налаштування для різної ширини екрана
        breakpoints={{
          320: { slidesPerView: 1.5 },
          480: { slidesPerView: 2.5 },
          768: { slidesPerView: 3.5 },
          1024: { slidesPerView: 5.5 },
        }}
      >
        {books.map(book => (
          <SwiperSlide key={book.id}>
            <BookCard book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GenreSlider;