import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
        <header>
            <p className="title-head1">Market Analysis Tool</p>
            <Link to='/Home' className='HomeButton' ><button>Home</button>
            </Link>
        </header>
      <h1>About Us</h1>
      <p>Welcome to Market Analysis application! Here at Market Analysis Inc., we strive to provide the best market insights and analysis to help you make informed decisions. Our team is dedicated to offering top-notch services and support to ensure your success.</p>
      <h2>Developed By</h2>
      <p>Praveen Benakannanavar</p>
      <h2>College</h2>
      <p>Christ Academy Istitute for advance studies</p>
      <h2>Contact Us</h2>
      <p>If you have any questions or need further information, please feel free to reach out to us at:</p>
      <ul>
        <li>Email: praveenbenakannanavar@gmail.com</li>
        <li>Phone: 9535055419</li>
        <li>Address: Banglore IN</li>
      </ul>
    </div>
  );
};

export default About;
