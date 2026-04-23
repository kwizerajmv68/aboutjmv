import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-logo">
        JMV PORTFOLIO
      </NavLink>
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>HOME</NavLink>
        <NavLink to="/graphics" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>GRAPHICS</NavLink>
        <NavLink to="/videos" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>VIDEOS</NavLink>
        <NavLink to="/scriptures" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>SCRIPTURES</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>ABOUT US</NavLink>
        <NavLink to="/book" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>BOOK US</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
