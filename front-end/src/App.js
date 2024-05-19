import React, {  useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Authentication/Login';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import AmazonPage from './Pages/AmazonPage.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);

  const handleLogin = (profileData) => {
    setIsLoggedIn(true);
    setProfile(profileData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setProfile(null);
  };

  return (
    <div>
      
      <Router>
    <Routes>
      <Route path="/" element={<Login onLogin={handleLogin} />} />
      <Route path="/home" element={<Home isLoggedIn={isLoggedIn} />} />
      <Route path="/AmazonPage" element={<AmazonPage isLoggedIn={isLoggedIn} />} />
      <Route path="/profile" element={<Profile profile={profile} onLogout={handleLogout} />} />
    </Routes>
  </Router>
    </div>
  );
}

export default App;
