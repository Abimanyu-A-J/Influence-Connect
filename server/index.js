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
  password: '',
  database: 'project1',
  port: 3306
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Could not connect to MySQL', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM `login-credentials` WHERE User_name = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send({ message: err });
    } else if (results.length === 0) {
      res.status(401).send({ message: 'Invalid username or password' });
    } else {
      res.send({ message: 'Login successful' });
    }
  });
});

// Create API endpoint to fetch users
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM `login-credentials`', (err, results) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }
    res.json(results);
  });
});

// Create API endpoint to create a new user

app.get('/api/campaign', (req, res) => {
  db.query('SELECT * FROM `campaign`', (err, results) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }
    res.json(results);
  });
});

app.post('/api/campaign', (req, res) => {
  const { campaignname, company, startdate, desc, enddate, budget, targetviews } = req.body;

  // Insert new user into the database
  db.query('INSERT INTO `campaign` (Name, Description, Start_date, End_date, Budget, Targeted_views, Company_name) VALUES (?, ?, ?, ?, ?, ?, ?)', [campaignname, desc, startdate, enddate, budget, targetviews, company], (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.status(201).json({ message: 'Campaign created successfully', userId: results.insertId });
  });
});

app.post('/api/users', (req, res) => {
  const { username, password, role } = req.body;

  // Insert new user into the database
  db.query('INSERT INTO `login-credentials` (User_name, password, role) VALUES (?, ?, ?)', 
    [username, password, role], 
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return; // Prevent further execution
      }

      // Use the insertId from the first query for the second query
      const userId = results.insertId;
      db.query('INSERT INTO ' + role + ' (User_id,User_name) VALUES (?,?)', 
        [userId,username], 
        (err) => {
          if (err) {
            res.status(500).json({ message: err.message });
            return; // Prevent further execution
          }

          // Send the response only after the second query is complete
          res.status(201).json({ message: 'User created successfully', userId });
        }
      );
    }
  );
});


// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
