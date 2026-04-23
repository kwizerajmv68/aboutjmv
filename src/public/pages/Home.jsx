import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const Home = () => {
  const [hero, setHero] = useState({
    title: "CAPTURING CREATIVITY",
    subtitle: "Professional Graphic Design, Video Production, and Scripture Artistry tailored for your unique vision."
  });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "hero"), (doc) => {
      if (doc.exists()) {
        setHero(doc.data());
      }
    });
    return () => unsub();
  }, []);

  return (
    <section className="hero">
      <h1>{hero.title}</h1>
      <p>{hero.subtitle}</p>
      <Link to="/book" className="btn-primary">
        BOOK US NOW
      </Link>
    </section>
  );
};

export default Home;
