import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const AboutUs = () => {
  const [content, setContent] = useState({
    title: "About Our Studio",
    description: "We are a creative team dedicated to excellence.",
    mission: "To inspire and create.",
    vision: "To be the leading creative hub."
  });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "pages", "about"), (doc) => {
      if (doc.exists()) {
        setContent(doc.data());
      }
    });
    return () => unsub();
  }, []);

  return (
    <div className="about-page" style={{padding:'6rem 5%', maxWidth:'1200px', margin:'0 auto'}}>
      <div className="about-container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '4rem',
        alignItems: 'start'
      }}>
        {/* Left Side: Image */}
        <div className="about-image-side">
          <div style={{
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <img 
              src={content.imageUrl || "https://i.postimg.cc/zBSTNcSz/MG-9694.png"} 
              alt={content.name} 
              style={{width:'100%', display:'block', filter: 'grayscale(20%)'}}
            />
          </div>
        </div>

        {/* Right Side: Info */}
        <div className="about-content-side">
          <span style={{color: 'var(--primary)', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem'}}>ABOUT US</span>
          <h1 style={{fontSize:'3.5rem', marginBottom:'1.5rem', lineHeight: '1.1', color: '#fff'}}>
            {content.name || "KWIZERA Jean Marie Vianney"}
          </h1>
          <p style={{fontSize:'1.1rem', color:'var(--text-muted)', lineHeight:'1.8', marginBottom:'2.5rem'}}>
            {content.description}
          </p>
          
          <div className="goals-grid" style={{display:'flex', flexDirection: 'column', gap:'1.5rem'}}>
            <div className="goal-item" style={{background:'var(--bg-card)', padding:'1.5rem', borderRadius:'15px', borderLeft: '4px solid var(--primary)'}}>
              <h3 style={{color:'var(--primary)', marginBottom:'0.5rem', fontSize: '1rem', textTransform: 'uppercase'}}>OUR MISSION</h3>
              <p style={{fontSize: '0.95rem', margin: 0}}>{content.mission}</p>
            </div>
            <div className="goal-item" style={{background:'var(--bg-card)', padding:'1.5rem', borderRadius:'15px', borderLeft: '4px solid var(--accent)'}}>
              <h3 style={{color:'var(--accent)', marginBottom:'0.5rem', fontSize: '1rem', textTransform: 'uppercase'}}>OUR VISION</h3>
              <p style={{fontSize: '0.95rem', margin: 0}}>{content.vision}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
