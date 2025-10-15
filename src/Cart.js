import { useEffect, useState } from "react";

export default function Cart() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3005/cart/1") // тимчасово userId=1
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  return (
    <div>
      <h2>🛒 Мій кошик</h2>
      <ul>
        {books.map(b => (
          <li key={b.id}>{b.title} — {b.author}</li>
        ))}
      </ul>
    </div>
  );
}
