// frontend/src/CaseForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './CaseForm.css'; // <--- IMPORT THE NEW CSS

const CaseForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    victim_age: '',
    victim_gender: 'Female',
    is_anonymous: false,
    abuse_type: 'Physical',
    location: '',
    description: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      localStorage.setItem('unsent_report', JSON.stringify(formData));
      await axios.post('https://trustflow-backend.onrender.com/api/cases/', formData);
      setMessage('Report Submitted Successfully');
      localStorage.removeItem('unsent_report');
      setStep(4);
    } catch (error) {
      setMessage('Error: Server unreachable. Report saved offline.');
    }
  };

  return (
    <div className="container">
      
      {/* HEADER SECTION WITH ADMIN LOGIN */}
      <div className="header-row">
        <h2 className="brand-title">
          <span>🔒</span> ChildProtect
        </h2>
        {/* LINK TO DJANGO ADMIN */}
        <a href="https://trustflow-backend.onrender.com/" target="_blank" rel="noreferrer" className="admin-btn">
          Admin Login ›
        </a>
      </div>

      {/* PROGRESS BAR */}
      <div className="progress-bar">
        <span className={`step-indicator ${step === 1 ? 'active-step' : ''}`}>1. Victim Info</span>
        <span className={`step-indicator ${step === 2 ? 'active-step' : ''}`}>2. Incident Details</span>
        <span className={`step-indicator ${step === 3 ? 'active-step' : ''}`}>3. Review</span>
      </div>

      <form onSubmit={handleSubmit}>
        
        {/* STEP 1 */}
        {step === 1 && (
          <div className="step-content">
            <div className="form-group">
               <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  name="is_anonymous" 
                  checked={formData.is_anonymous} 
                  onChange={handleChange} 
                  style={{marginRight: '10px'}}
                /> 
                Keep this report anonymous
              </label>
            </div>
            
            <div className="form-group">
              <label>Victim's Age</label>
              <input 
                type="number" 
                name="victim_age" 
                className="modern-input"
                placeholder="e.g. 12" 
                value={formData.victim_age} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select name="victim_gender" value={formData.victim_gender} onChange={handleChange} className="modern-select">
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="button-row">
              <div></div> {/* Spacer */}
              <button type="button" onClick={() => setStep(2)} className="btn btn-primary">Next Step ›</button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="step-content">
             <div className="form-group">
              <label>Type of Abuse</label>
              <select name="abuse_type" value={formData.abuse_type} onChange={handleChange} className="modern-select">
                <option value="Physical">Physical Abuse</option>
                <option value="Sexual">Sexual Abuse</option>
                <option value="Emotional">Emotional Abuse</option>
                <option value="Neglect">Neglect</option>
              </select>
            </div>

            <div className="form-group">
              <label>Location of Incident</label>
              <input 
                type="text" 
                name="location" 
                className="modern-input"
                placeholder="e.g. School, Home, Street Address" 
                value={formData.location} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Description (Optional)</label>
              <textarea 
                name="description" 
                className="modern-textarea"
                placeholder="Please describe what happened..." 
                value={formData.description} 
                onChange={handleChange} 
              />
            </div>

            <div className="button-row">
              <button type="button" onClick={() => setStep(1)} className="btn btn-secondary">‹ Back</button>
              <button type="button" onClick={() => setStep(3)} className="btn btn-primary">Next Step ›</button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="step-content">
            <div style={{background: '#f8fafc', padding: '20px', borderRadius: '8px', marginBottom: '20px'}}>
              <h4 style={{marginTop: 0, color: '#102a43'}}>Summary</h4>
              <p><strong>Type:</strong> {formData.abuse_type}</p>
              <p><strong>Location:</strong> {formData.location}</p>
              <p><strong>Status:</strong> {formData.is_anonymous ? "Anonymous Report" : "Identified Report"}</p>
            </div>
            
            <div className="button-row">
              <button type="button" onClick={() => setStep(2)} className="btn btn-secondary">‹ Back</button>
              <button type="submit" className="btn btn-submit">Submit Report</button>
            </div>
          </div>
        )}

        {/* STEP 4: SUCCESS */}
        {step === 4 && (
          <div className="success-box">
            <span className="success-icon">✅</span>
            <h3 style={{color: '#3ebd93'}}>Submission Received</h3>
            <p style={{color: '#627d98'}}>{message}</p>
            <p style={{fontSize: '12px', color: '#829ab1'}}>Case ID: #Generated-{Math.floor(Math.random() * 1000)}</p>
            
            <div className="button-row" style={{justifyContent: 'center'}}>
              <button type="button" onClick={() => window.location.reload()} className="btn btn-primary">Submit Another</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CaseForm;