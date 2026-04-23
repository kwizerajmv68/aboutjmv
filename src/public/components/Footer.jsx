import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const Footer = () => {
  const [settings, setSettings] = useState({
    aboutText: "Welcome to JMV Portfolio. We provide high-quality digital content including graphics, videos, and scriptures. Our mission is to deliver excellence in every project.",
    socials: {
      instagram: "#",
      tiktok: "#",
      x: "#",
      youtube: "#",
      email: "mailto:info@example.com",
      whatsapp: "#"
    }
  });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "footer"), (doc) => {
      if (doc.exists()) {
        setSettings(doc.data());
      }
    });
    return () => unsub();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col footer-about">
          <h3>ABOUT US</h3>
          <p>{settings.aboutText}</p>
        </div>
        
        <div className="footer-col footer-links">
          <h3>QUICK LINKS</h3>
          <ul>
            <li><Link to="/videos">VIDEOS</Link></li>
            <li><Link to="/graphics">GRAPHICS</Link></li>
            <li><Link to="/book">BOOK US</Link></li>
          </ul>
        </div>
        
        <div className="footer-col footer-links">
          <h3>PARTNERS</h3>
          <ul>
            <li><a href="https://extremestudio.web.app/" target="_blank" rel="noopener noreferrer">EXTREME FILMS</a></li>
            <li><a href="https://extremestudios.netlify.app/" target="_blank" rel="noopener noreferrer">EXTREME STUDIOS</a></li>
            <li><a href="https://nadportfolio.web.app/" target="_blank" rel="noopener noreferrer">BOOK NAD</a></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h3>SOCIAL ACCOUNTS</h3>
          <div className="social-links">
            <a href={settings.socials.instagram} className="social-icon" title="Instagram">
              <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" />
            </a>
            <a href={settings.socials.tiktok} className="social-icon" title="TikTok">
              <img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" alt="TikTok" />
            </a>
            <a href={settings.socials.x} className="social-icon" title="X (Twitter)">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="X" />
            </a>
            <a href={settings.socials.youtube} className="social-icon" title="YouTube">
              <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube" />
            </a>
            <a href={settings.socials.email} className="social-icon" title="Email">
              <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="Email" />
            </a>
            <a href={settings.socials.whatsapp} className="social-icon" title="WhatsApp">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} JMV Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
