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
    <div className="about-page" style={{padding:'6rem 5%', maxWidth:'1000px', margin:'0 auto'}}>
      <h1 style={{fontSize:'3.5rem', marginBottom:'2rem', textAlign:'center'}}>{content.title}</h1>
      <p style={{fontSize:'1.2rem', color:'var(--text-muted)', lineHeight:'1.8', marginBottom:'4rem', textAlign:'center'}}>
        {content.description}
      </p>
      
      <div className="about-grid" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3rem'}}>
        <div className="about-card" style={{background:'var(--bg-card)', padding:'2.5rem', borderRadius:'20px'}}>
          <h2 style={{color:'var(--primary)', marginBottom:'1rem'}}>OUR MISSION</h2>
          <p>{content.mission}</p>
        </div>
        <div className="about-card" style={{background:'var(--bg-card)', padding:'2.5rem', borderRadius:'20px'}}>
          <h2 style={{color:'var(--accent)', marginBottom:'1rem'}}>OUR VISION</h2>
          <p>{content.vision}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
