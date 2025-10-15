import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3005/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        setMessage("✅ Вхід виконано!");
      } else {
        setMessage(data.message || "❌ Помилка входу!");
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Проблема з сервером");
    }
  };

  return (
    <div>
      <h2>Вхід</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Увійти</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
