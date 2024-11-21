const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const SECRET_KEY = 'your_secret_key'; // Change this to a secure key

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'Recipe_Radar',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database: Recipe_Radar');
});

// API Routes

// 1. Signup Endpoint
app.post('/api/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
  db.query(query, [firstName, lastName, email, hashedPassword], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).json({ message: 'Error signing up user.' });
    }
    res.status(201).json({ message: 'Signup successful!' });
  });
});

// 2. Login Endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ message: 'Error logging in.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful!', token });
  });
});

// 3. Get Logged-in User Endpoint
app.get('/api/user', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const query = 'SELECT id, first_name, last_name, email FROM users WHERE id = ?';
    db.query(query, [decoded.id], (err, results) => {
      if (err) {
        console.error('Error fetching user data:', err);
        return res.status(500).json({ message: 'Error fetching user data.' });
      }
      res.status(200).json(results[0]);
    });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
