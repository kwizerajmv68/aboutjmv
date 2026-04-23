import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const ManageSettings = () => {
  const [footerSettings, setFooterSettings] = useState({
    aboutText: "",
    socials: {
      instagram: "",
      tiktok: "",
      x: "",
      youtube: "",
      email: "",
      whatsapp: ""
    }
  });

  const [heroSettings, setHeroSettings] = useState({
    title: "",
    subtitle: ""
  });

  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const footerDoc = await getDoc(doc(db, "settings", "footer"));
      if (footerDoc.exists()) {
        setFooterSettings(footerDoc.data());
      }
      
      const heroDoc = await getDoc(doc(db, "settings", "hero"));
      if (heroDoc.exists()) {
        setHeroSettings(heroDoc.data());
      }
      
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleFooterChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFooterSettings(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFooterSettings(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    setHeroSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    setMessage("");
    try {
      await setDoc(doc(db, "settings", "footer"), footerSettings);
      await setDoc(doc(db, "settings", "hero"), heroSettings);
      setMessage("Settings saved successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Error saving settings.");
    }
    setSaveLoading(false);
  };

  if (loading) return <div>Loading Settings...</div>;

  return (
    <div className="manage-settings">
      <h1>Site Settings</h1>
      {message && <div className={message.includes('Error') ? 'error-msg' : 'success-msg'}>{message}</div>}
      
      <form onSubmit={handleSave} className="settings-form">
        <section className="settings-section">
          <h3>Hero Section (Home Page)</h3>
          <div className="form-group">
            <label>Hero Title</label>
            <input 
              name="title" 
              value={heroSettings.title} 
              onChange={handleHeroChange} 
              placeholder="e.g. CAPTURING CREATIVITY"
            />
          </div>
          <div className="form-group">
            <label>Hero Subtitle</label>
            <textarea 
              name="subtitle" 
              value={heroSettings.subtitle} 
              onChange={handleHeroChange} 
              style={{width:'100%', height:'80px', padding:'1rem', borderRadius:'8px', border:'1px solid #e2e8f0'}}
              placeholder="Brief intro text..."
            />
          </div>
        </section>

        <section className="settings-section">
          <h3>Footer Settings</h3>
          <div className="form-group">
            <label>Brief About Us</label>
            <textarea 
              name="aboutText" 
              value={footerSettings.aboutText} 
              onChange={handleFooterChange} 
              style={{width:'100%', height:'100px', padding:'1rem', borderRadius:'8px', border:'1px solid #e2e8f0'}}
              placeholder="Footer about text..."
            />
          </div>
          
          <h4>Social Accounts</h4>
          <div className="social-grid">
            <div className="form-group">
              <label>Instagram URL</label>
              <input name="socials.instagram" value={footerSettings.socials.instagram} onChange={handleFooterChange} />
            </div>
            <div className="form-group">
              <label>TikTok URL</label>
              <input name="socials.tiktok" value={footerSettings.socials.tiktok} onChange={handleFooterChange} />
            </div>
            <div className="form-group">
              <label>X (Twitter) URL</label>
              <input name="socials.x" value={footerSettings.socials.x} onChange={handleFooterChange} />
            </div>
            <div className="form-group">
              <label>YouTube URL</label>
              <input name="socials.youtube" value={footerSettings.socials.youtube} onChange={handleFooterChange} />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input name="socials.email" value={footerSettings.socials.email} onChange={handleFooterChange} />
            </div>
            <div className="form-group">
              <label>WhatsApp Number/Link</label>
              <input name="socials.whatsapp" value={footerSettings.socials.whatsapp} onChange={handleFooterChange} />
            </div>
          </div>
        </section>

        <button type="submit" className="btn-auth" disabled={saveLoading}>
          {saveLoading ? 'Saving...' : 'Save All Settings'}
        </button>
      </form>
    </div>
  );
};

export default ManageSettings;
