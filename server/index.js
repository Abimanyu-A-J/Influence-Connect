const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

// Enable CORS for React frontend
app.use(cors());

// Parse JSON request body
app.use(express.json());

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'project1'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Could not connect to MySQL', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Create API endpoint to fetch users
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM login-credentials', (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error retrieving data' });
      return;
    }
    res.json(results);
  });
});

// Create API endpoint to create a new user



app.post('/api/users', (req, res) => {
  const {User_id, username, password, role } = req.body;

  // Insert new user into the database
  db.query('INSERT INTO `login-credentials` (User_id, User_name, password, role) VALUES (? ,?, ?, ?)', [User_id,username, password, role], (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.status(201).json({ message: 'User created successfully', userId: results.insertId });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
