// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import CaseForm from './CaseForm';
import Login from './Login';

function App() {
  const [token, setToken] = useState(null);
  const [isGuest, setIsGuest] = useState(false); // Track if they are a guest

  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');
    if (savedToken) setToken(savedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
    setToken(null);
    setIsGuest(false); // Reset guest mode
  };

  // Show the Form if: (User has a Token) OR (User is a Guest)
  if (token || isGuest) {
    return (
      <div>
         <div style={{position: 'absolute', top: '20px', right: '20px', zIndex: 1000}}>
           {token && <span style={{marginRight: '10px', fontSize: '13px', color: '#627d98'}}>Logged in</span>}
           <button onClick={handleLogout} className="btn-secondary" style={{padding: '5px 10px', fontSize: '12px'}}>
             {token ? 'Logout' : 'Exit Guest Mode'}
           </button>
         </div>
         <CaseForm />
      </div>
    );
  }

  // Otherwise, show Login with the Guest Option
  return (
    <div className="App">
      <Login 
        onLogin={setToken} 
        onGuest={() => setIsGuest(true)} 
      />
    </div>
  );
}

export default App;