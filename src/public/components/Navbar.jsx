import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-logo">
        JMV PORTFOLIO
      </NavLink>
      
      {/* Mobile Toggle */}
      <button 
        className="mobile-menu-btn" 
        onClick={() => setIsOpen(!isOpen)}
        style={{display:'none'}} // Styled in CSS
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <NavLink to="/" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>HOME</NavLink>
        <NavLink to="/graphics" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>GRAPHICS</NavLink>
        <NavLink to="/videos" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>VIDEOS</NavLink>
        <NavLink to="/scriptures" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>SCRIPTURES</NavLink>
        <NavLink to="/about" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>ABOUT US</NavLink>
        <NavLink to="/book" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>BOOK US</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
