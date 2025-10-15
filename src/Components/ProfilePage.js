import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (error) {
        console.error("Не вдалося завантажити профіль", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="loading">🔄 Завантаження профілю...</div>;
  }

  if (!user) {
    return (
      <div className="container">
        <h2>Будь ласка, увійдіть, щоб побачити свій кабінет.</h2>
      </div>
    );
  }

  return (
    <div className="profile-page-container">
      <div className="profile-card">
        <h1>Особистий кабінет</h1>
        <div className="profile-section">
          <h2>Мої дані</h2>
          <div className="profile-details">
            <p><strong>Ім'я:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;