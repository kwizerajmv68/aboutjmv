import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const ManageAboutUs = () => {
  const [content, setContent] = useState({
    title: "About Our Studio",
    description: "We are a creative team dedicated to excellence.",
    mission: "To inspire and create.",
    vision: "To be the leading creative hub."
  });
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const aboutDoc = await getDoc(doc(db, "pages", "about"));
      if (aboutDoc.exists()) {
        setContent(aboutDoc.data());
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    setMessage("");
    try {
      await setDoc(doc(db, "pages", "about"), content);
      setMessage("About Us content updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Error updating content.");
    }
    setSaveLoading(false);
  };

  if (loading) return <div>Loading About Us content...</div>;

  return (
    <div className="manage-about">
      <h1>Manage About Us Page</h1>
      {message && <div className={message.includes('Error') ? 'error-msg' : 'success-msg'}>{message}</div>}
      
      <form onSubmit={handleSave} className="settings-form">
        <div className="form-group">
          <label>Page Title</label>
          <input name="title" value={content.title} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Main Description</label>
          <textarea 
            name="description" 
            value={content.description} 
            onChange={handleChange} 
            style={{width:'100%', height:'150px', padding:'1rem', borderRadius:'8px', border:'1px solid #e2e8f0'}}
          />
        </div>
        <div className="form-group">
          <label>Our Mission</label>
          <input name="mission" value={content.mission} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Our Vision</label>
          <input name="vision" value={content.vision} onChange={handleChange} />
        </div>
        
        <button type="submit" className="btn-auth" disabled={saveLoading}>
          {saveLoading ? 'Saving...' : 'Update About Us Page'}
        </button>
      </form>
    </div>
  );
};

export default ManageAboutUs;
