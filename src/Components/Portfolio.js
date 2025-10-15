import React from 'react';

// Example data. In the future, this can be loaded from the server.
const featuredBooks = [
  {
    id: 1,
    title: 'Четверте крило',
    author: 'Ребекка Яррос',
    cover_url: 'https://covers.openlibrary.org/b/isbn/9781649374172-L.jpg'
  },
  {
    id: 2,
    title: '1984',
    author: 'Джордж Орвелл',
    cover_url: 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg'
  },
  {
    id: 3,
    title: 'Дюна',
    author: 'Френк Герберт',
    cover_url: 'https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg'
  }
];

const Portfolio = () => {
  return (
    <section className="portfolio-section">
      <div className="container">
        <h2 className="portfolio-title">Вибір редакції</h2>
        <div className="books-grid">
          {featuredBooks.map(book => (
            <div className="book-card" key={book.id}>
              <div className="book-cover-container">
                <img src={book.cover_url} alt={book.title} />
              </div>
              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">{book.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;