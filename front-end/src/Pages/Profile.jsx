// Profile.js

import React from 'react';
import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';

const Profile = ({ profile, onLogout }) => {
  const navigate = useNavigate(); // Access the navigation object

  const handleLogout = () => {
    // Perform logout logic
    // For example, clear any stored authentication tokens, user data, etc.

    // After logging out, navigate back to the login page
    navigate('/'); // Navigate to the login page
  };

  return (
    <div className='profile-container'>
      {profile && (
        <>
        <div className='profile-nav'>
        <h2>Hey {profile.name}</h2>
        <Link to="/home" className='gohome'><button className='gobtn'>Go to Home</button></Link>
        <button onClick={handleLogout} className='logout-btn'>Logout</button>
        </div>
          
          <p>{profile.description}</p>
          
           {/* Use handleLogout instead of onLogout */}
        </>
      )}
    </div>
  );
};

export default Profile;
