import React, { useState } from 'react';
import './Login.css';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setEmailValid(validateEmail(newEmail));
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordValid(newPassword.length >= 6);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (emailValid && passwordValid) {
      try {
        const response = await axios.post('http://localhost:5001/login', { email, password });
        onLogin(response.data);
        navigate('/home');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert('Invalid email or password.');
        } else {
          alert('An error occurred. Please try again later.');
        }
      }
    } else {
      alert('Please enter valid email and password.');
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className='login-page'>
      <form className='login-form' onSubmit={handleLogin}>
        <img src={require('../Assets/Group 3.png')} alt="Logo" />
        <h2>Welcome To Mraket Analysis Tool</h2>
        <input 
          type="email" 
          name="email" 
          value={email} 
          onChange={handleEmailChange} 
          placeholder="Email" 
          className={emailValid ? 'valid' : 'invalid'}
        />
        <input 
          type="password" 
          name="password"
          value={password} 
          onChange={handlePasswordChange} 
          placeholder="Password" 
          className={passwordValid ? 'valid' : 'invalid'}
        />
        <button type="submit" className='btn btn2'>Login</button><br /><br /><br />
        <NavLink to="/forgotpassword" className='forgot-pass'>Forgot Password?</NavLink>
        <p>
            Don't have an account? <br/><Link to="/SignUp" href="/SignUp">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
