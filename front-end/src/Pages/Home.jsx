import React, { useState } from 'react';
import axios from 'axios';
import './Home.css'

const HomePage = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [operation, setOperation] = useState('');

  const handleSearch = async () => {
    try {
      if (operation === 'Amazon') {
        // Perform operation 1
        console.log("amazon started");
        const response = await axios.post('http://127.0.0.1:5000/Amazon_handler', {
          searchText: searchText
        });
        setSearchResult(response.data);
      } else if (operation === 'Flipkart') {
        // Perform operation 2
        console.log("Flipkart started");
        const response = await axios.post('http://127.0.0.1:5000/Flipkart_handler', {
          searchText: searchText
        });
        setSearchResult(JSON.parse(response.data));
        console.log(response.data);
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  


  return (
    <div>
      <h1>Search Page</h1>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={() => {setOperation('Amazon'); handleSearch();}}>Amazon Search</button>
      <button onClick={() => {setOperation('Flipkart'); handleSearch();}}>Flipkart search</button>
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
                  <a href={product.Link} target="_blank" rel="noopener noreferrer">View on Flipkart</a>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
  
};

export default HomePage;
