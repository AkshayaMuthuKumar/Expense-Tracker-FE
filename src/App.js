// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Auth from './Auth';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setUser({ name: response.data.username }); // Assuming the API returns the username
      })
      .catch(error => {
        console.log('Failed to fetch user', error);
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth setUser={setUser} />} />
        <Route
          path="/dashboard"
          element={<Dashboard user={user} onLogout={handleLogout} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
