// frontend/src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './CaseForm.css'; // Re-using our modern CSS

const Login = ({ onLogin, onGuest }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 1. Send credentials to Django Backend
      const res = await axios.post('https://trustflow-backend.onrender.com/api/login/', {
        username: username,
        password: password
      });

      // 2. If successful, get the Token
      const token = res.data.token;
      
      // 3. Save Token to LocalStorage (so they stay logged in)
      localStorage.setItem('auth_token', token);
      localStorage.setItem('username', username);

      // 4. Pass token up to App.js to switch screens
      onLogin(token);
    } catch (err) {
      console.error(err);
      setError('Invalid Username or Password');
    }
  };

  return (
    <div className="container" style={{maxWidth: '400px', marginTop: '80px'}}>
      
      {/* HEADER */}
      <div style={{textAlign: 'center', marginBottom: '30px'}}>
        <h2 className="brand-title" style={{justifyContent: 'center', fontSize: '28px'}}>
          <span>🔒</span> ChildProtect
        </h2>
        <p style={{color: '#627d98', margin: '5px 0'}}>Secure Child Protection Repository</p>
      </div>

      {/* STAFF LOGIN FORM */}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Staff Username</label>
          <input 
            type="text" 
            className="modern-input" 
            placeholder="Enter ID"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            className="modern-input" 
            placeholder="••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>

        {error && <p style={{color: '#e02424', textAlign: 'center', fontSize: '14px', marginBottom: '15px'}}>{error}</p>}

        <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
          Secure Staff Login
        </button>
      </form>

      {/* DIVIDER */}
      <div style={{display: 'flex', alignItems: 'center', margin: '25px 0'}}>
          <div style={{flex: 1, height: '1px', background: '#d9e2ec'}}></div>
          <span style={{padding: '0 10px', color: '#829ab1', fontSize: '13px', fontWeight: '600'}}>OR</span>
          <div style={{flex: 1, height: '1px', background: '#d9e2ec'}}></div>
      </div>

      {/* GUEST BUTTON */}
      <button 
        type="button" 
        onClick={onGuest} 
        className="btn btn-secondary" 
        style={{width: '100%', background: '#fff', border: '2px solid #d9e2ec', color: '#486581'}}
      >
        Continue as Guest (Report Anonymously)
      </button>

      {/* FOOTER */}
      <div style={{textAlign: 'center', marginTop: '30px', fontSize: '12px', color: '#bcccdc'}}>
        Restricted System • Monitoring Active • v1.0
      </div>

    </div>
  );
};

export default Login;