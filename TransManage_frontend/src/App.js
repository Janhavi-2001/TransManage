import React, { useEffect, useState } from 'react';
import Homepage from './Components/Homepage/Homepage';
import Navbar from './Components/Navbar/Navbar';
import Loader from './Components/Loader/Loader';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Contact from './Components/Contact/Contact';
import Dashboard from './Components/Dashboard/Dashboard';
import Footer from './Components/Footer/Footer';
import Projects from './Components/Dashboard/Projects/Projects';
import Pages from './Components/Dashboard/Projects/Pages/Pages';
import TranslationKeys from './Components/Dashboard/Projects/Pages/TranslationKeys/TranslationKeys';
import './App.css';

import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { matchPath } from 'react-router';

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
  const footerHidden = ['/login', '/register', '/dashboard', '/projects', '/projects/:id/pages', '/projects/:id/pages/:pageId/translation-keys'].includes(location.pathname) 
  || matchPath('/projects/:id/pages', location.pathname) !== null
  || matchPath('/projects/:id/pages/:pageId/translation-keys', location.pathname) !== null;

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id/pages" element={<Pages />} />
        <Route path="/projects/:id/pages/:pageId/translation-keys" element={<TranslationKeys />} />
        <Route path="/" element={<Homepage />} />
      </Routes>

      {!footerHidden && <Footer />}
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