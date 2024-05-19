import React, { useState } from 'react';
import './Login.css';
import { useNavigate, NavLink, Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setEmailValid(validateEmail(newEmail)); // Validate email format
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordValid(newPassword.length >= 6); // Validate minimum password length
  };

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent default form submission
    // Check if both email and password are valid
    if (emailValid && passwordValid) {
      // Perform authentication logic
      // If authentication is successful, fetch user profile data
      const profileData = {
        name: 'Praveen Benakannananavar',
        description: 'Current Super Admin.'
      };
      onLogin(profileData);
      navigate('/home');
    } else {
      alert('Please enter valid email and password.'); // Show alert if validation fails
    }
  };

  // Basic email validation function
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className='login-page'>
      <form className='login-form' onSubmit={handleLogin}>
        <img src={require('../Assets/Group 3.png')} alt="Logo" />
        <h2>Welcome To Login Page</h2>
        <input 
          type="email" 
          name="email" 
          value={email} 
          onChange={handleEmailChange} 
          placeholder="Email" 
          className={emailValid ? 'valid' : 'invalid'} // Apply CSS class based on validation status
        />
        <input 
          type="password" 
          name="password"
          value={password} 
          onChange={handlePasswordChange} 
          placeholder="Password" 
          className={passwordValid ? 'valid' : 'invalid'} // Apply CSS class based on validation status
        />
        <button type="submit" className='btn btn2'>Login</button><br /><br /><br />
        <NavLink to="/forgot-password" className='forgot-pass'>Forgot Password?</NavLink>
        <p>
            Don't have an account? <Link to="/SignUp" href="/SignUp">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
