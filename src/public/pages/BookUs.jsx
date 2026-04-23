import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const BookUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Video Production',
    date: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', msg: '' });

    try {
      await addDoc(collection(db, "bookings"), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'pending'
      });
      setStatus({ type: 'success', msg: 'Booking request sent successfully! We will contact you soon.' });
      setFormData({ name: '', email: '', phone: '', service: 'Video Production', date: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', msg: 'Something went wrong. Please try again later.' });
    }
    setLoading(false);
  };

  return (
    <div className="book-us-page" style={{padding:'6rem 5%', maxWidth:'800px', margin:'0 auto'}}>
      <div style={{textAlign:'center', marginBottom:'4rem'}}>
        <h1 style={{fontSize:'3.5rem', marginBottom:'1rem'}}>BOOK US</h1>
        <p style={{color:'var(--text-muted)', fontSize:'1.1rem'}}>Fill out the form below and we'll get back to you to discuss your project.</p>
      </div>

      {status.msg && (
        <div style={{
          padding:'1rem', 
          borderRadius:'8px', 
          marginBottom:'2rem',
          backgroundColor: status.type === 'success' ? 'rgba(22, 163, 74, 0.1)' : 'rgba(220, 38, 38, 0.1)',
          color: status.type === 'success' ? '#16a34a' : '#dc2626',
          textAlign: 'center'
        }}>
          {status.msg}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{display:'grid', gap:'1.5rem'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem'}}>
          <div className="form-group">
            <label style={{display:'block', marginBottom:'0.5rem', fontWeight:'600'}}>Full Name</label>
            <input 
              required
              name="name" 
              value={formData.name} 
              onChange={handleChange}
              placeholder="John Doe"
              style={{width:'100%', padding:'1rem', borderRadius:'8px', border:'1px solid rgba(255,255,255,0.1)', background:'var(--bg-card)', color:'white'}}
            />
          </div>
          <div className="form-group">
            <label style={{display:'block', marginBottom:'0.5rem', fontWeight:'600'}}>Email Address</label>
            <input 
              required
              type="email"
              name="email" 
              value={formData.email} 
              onChange={handleChange}
              placeholder="john@example.com"
              style={{width:'100%', padding:'1rem', borderRadius:'8px', border:'1px solid rgba(255,255,255,0.1)', background:'var(--bg-card)', color:'white'}}
            />
          </div>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem'}}>
          <div className="form-group">
            <label style={{display:'block', marginBottom:'0.5rem', fontWeight:'600'}}>Phone Number</label>
            <input 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange}
              placeholder="+250..."
              style={{width:'100%', padding:'1rem', borderRadius:'8px', border:'1px solid rgba(255,255,255,0.1)', background:'var(--bg-card)', color:'white'}}
            />
          </div>
          <div className="form-group">
            <label style={{display:'block', marginBottom:'0.5rem', fontWeight:'600'}}>Service Type</label>
            <select 
              name="service" 
              value={formData.service} 
              onChange={handleChange}
              style={{width:'100%', padding:'1rem', borderRadius:'8px', border:'1px solid rgba(255,255,255,0.1)', background:'var(--bg-card)', color:'white'}}
            >
              <option>Video Production</option>
              <option>Graphic Design</option>
              <option>Photography</option>
              <option>Script Writing</option>
              <option>Full Branding</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label style={{display:'block', marginBottom:'0.5rem', fontWeight:'600'}}>Preferred Date</label>
          <input 
            type="date"
            name="date" 
            value={formData.date} 
            onChange={handleChange}
            style={{width:'100%', padding:'1rem', borderRadius:'8px', border:'1px solid rgba(255,255,255,0.1)', background:'var(--bg-card)', color:'white'}}
          />
        </div>

        <div className="form-group">
          <label style={{display:'block', marginBottom:'0.5rem', fontWeight:'600'}}>Project Details</label>
          <textarea 
            required
            name="message" 
            value={formData.message} 
            onChange={handleChange}
            placeholder="Tell us about your vision..."
            style={{width:'100%', height:'150px', padding:'1rem', borderRadius:'8px', border:'1px solid rgba(255,255,255,0.1)', background:'var(--bg-card)', color:'white', resize:'none'}}
          />
        </div>

        <button 
          disabled={loading}
          type="submit" 
          style={{
            padding:'1.2rem', 
            background:'var(--primary)', 
            color:'black', 
            borderRadius:'8px', 
            fontWeight:'700', 
            fontSize:'1.1rem',
            marginTop:'1rem',
            transition:'all 0.3s ease'
          }}
        >
          {loading ? 'SENDING...' : 'SEND BOOKING REQUEST'}
        </button>
      </form>
    </div>
  );
};

export default BookUs;
