import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import RegisterPage from '../components/RegisterPage';
import DashboardPage from '../components/DashboardPage';
import LoginPage from '../components/LoginPage';

function RouterMain() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const getAccessToken = localStorage.getItem('token');

    if (!getAccessToken) {
      if (pathname !== '/' && pathname !== '/register') {
        navigate('/');
      }
    }
  }, [pathname, navigate]);

  return (
    <Routes>
      <Route path="/" element={<LoginPage setUser={setUser} />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage user={user} />} />
    </Routes>
  );
}

export default RouterMain;
