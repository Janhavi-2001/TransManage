import React, { useEffect, useState } from 'react';
import Homepage from './Components/Homepage/Homepage';
import Navbar from './Components/Navbar/Navbar';
import Loader from './Components/Loader/Loader';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import { useLocation } from 'react-router-dom';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const AppContent = () => {
    const location = useLocation();
    const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
      <>
        {!hideNavbar && <Navbar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </>
    );
  };

  return (
    <div className="App">
      {loading ? (
        <Loader />
      ) : (
        <Router>
          <AppContent />
        </Router>
      )}
    </div>
  );
}

export default App;