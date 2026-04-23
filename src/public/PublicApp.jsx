import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Graphics from './pages/Graphics';
import Videos from './pages/Videos';
import Scriptures from './pages/Scriptures';
import AboutUs from './pages/AboutUs';
import BookUs from './pages/BookUs';
import './styles/public.css';

const PublicApp = () => {
  return (
    <div className="public-container">
      <Navbar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/graphics" element={<Graphics />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/scriptures" element={<Scriptures />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/book" element={<BookUs />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default PublicApp;
