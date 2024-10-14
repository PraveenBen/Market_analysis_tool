import React, { useState } from 'react';
import './signup.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number format';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:5000/signup', formData);
        alert('Signup successful',{response});
        navigate('/');
      } catch (error) {
        console.error('Signup error:', error);
        alert('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className='signup-page'>
      <form className='signup-form' onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'invalid' : ''}
        />
        {errors.name && <p className='error'>{errors.name}</p>}
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'invalid' : ''}
        />
        {errors.email && <p className='error'>{errors.email}</p>}
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? 'invalid' : ''}
        />
        {errors.password && <p className='error'>{errors.password}</p>}
        <input
          type='password'
          name='confirmPassword'
          placeholder='Confirm Password'
          value={formData.confirmPassword}
          onChange={handleChange}
          className={errors.confirmPassword ? 'invalid' : ''}
        />
        {errors.confirmPassword && <p className='error'>{errors.confirmPassword}</p>}
        <input
          type='text'
          name='phone'
          placeholder='Phone Number'
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? 'invalid' : ''}
        />
        {errors.phone && <p className='error'>{errors.phone}</p>}
        <button type='submit' className='btn btn2'>Signup</button>
        <p>
          Already have an account? <Link to='/login'>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
