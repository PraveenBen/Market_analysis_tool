import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';

const HomePage = ({ isLoggedIn }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [operation, setOperation] = useState('');
  const [pagename, setPagename] = useState('');

  const handleSearch = async () => {
    try {
      let response;
      if (operation === 'Amazon') {
        console.log("Amazon search started");
        setPagename('Amazon');
        response = await axios.post('http://127.0.0.1:5000/Amazon_handler', { searchText });
      } else if (operation === 'Flipkart') {
        console.log("Flipkart search started");
        setPagename('Flipkart');
        response = await axios.post('http://127.0.0.1:5000/Flipkart_handler', { searchText });
      }

      if (response && response.data) {
        setSearchResult(JSON.parse(response.data));
        console.log(response.data);
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div>
      
      
          <header>
            Market Analysis Tool
            <div class='header'>
              <Link to="/About" className='about-button'>
                <button class='about-button'>About</button>
              </Link>
              <Link to="/profile" className="profile-link" >
             <button class='profile-button'> Profile</button>
             </Link> 
             <Link to='/' className='Logout-button'>
              <button className='logout'>Logout</button>
              
            </Link>
            </div>
          </header>
          <main>
            <h1>Search Page</h1>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button onClick={() => { setOperation('Amazon'); handleSearch(); }}>Amazon Search</button>
            <button onClick={() => { setOperation('Flipkart'); handleSearch(); }}>Flipkart Search</button>
            {searchResult && (
              <div>
                <div className="products">
                  {Object.keys(searchResult).map((key) => {
                    const product = searchResult[key];
                    return (
                      <div className="product" key={key}>
                        <h2>{product.Name}</h2>
                        <p>Price: {product.Price}</p>
                        <p>Rating: {product.Rating}</p>
                        <p>Total Ratings: {product["Total Ratings"]}</p>
                        <a href={product.Link} target="_blank" rel="noopener noreferrer">View on {pagename}</a>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </main>
        
    </div>
  );
};

export default HomePage;
