const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'market_analysis_db'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Route to handle GET requests to the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the API. Use POST /login to login.');
});

// Route to handle GET requests for favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204));

// Route to handle POST requests to /login
app.post('/login', (req, res) => {
  console.log('POST /login endpoint hit');
  console.log('Request body:', req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required' });
  }

  const query = 'SELECT * FROM users1 WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }

    if (results.length > 0) {
      const userProfile = results[0];
      res.send({
        name: userProfile.name,
        description: 'Current Super Admin'
      });
    } else {
      res.status(401).send({ message: 'Invalid email or password' });
    }
  });
});

app.post('/signup', (req, res) => {
    console.log('POST /signup endpoint hit');
    console.log('Request body:', req.body);
  
    const { name, email, password, phone } = req.body;
  
    if (!name || !email || !password || !phone) {
      return res.status(400).send({ message: 'All fields are required' });
    }
  
    const query = 'INSERT INTO users1 (name, email, password, phone) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, password, phone], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send({ message: 'Internal server error' });
      }
  
      res.send({ message: 'User registered successfully' });
    });
  });
  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
