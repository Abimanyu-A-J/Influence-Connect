const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

// Enable CORS for React frontend
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://Irjk915:IrfanIrfan@cluster0.llx9i.mongodb.net/project?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Mongoose Schemas & Models
const UserSchema = new mongoose.Schema({
  User_id: String,
  User_name: String,
  password: String,
  Role: String
});
const User = mongoose.model('User', UserSchema, 'login-credentials');

const CampaignSchema = new mongoose.Schema({
  Name: String,
  Description: String,
  Start_date: Date,
  End_date: Date,
  Budget: Number,
  Targeted_views: Number,
  Company_name: String
});
const Campaign = mongoose.model('Campaign', CampaignSchema, 'campaign');

// User Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ User_name: username, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    res.json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get All Users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get User by ID
app.post('/api/users/data', async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findOne({ User_id: id });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get All Campaigns
app.get('/api/campaign', async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a Campaign
app.post('/api/campaign', async (req, res) => {
  const { campaignname, company, startdate, desc, enddate, budget, targetviews } = req.body;
  try {
    const campaign = new Campaign({
      Name: campaignname,
      Description: desc,
      Start_date: new Date(startdate),
      End_date: new Date(enddate),
      Budget: budget,
      Targeted_views: targetviews,
      Company_name: company
    });
    await campaign.save();
    res.status(201).json({ message: 'Campaign created successfully', campaign });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Filter Campaigns
app.post('/api/campaign/filter', async (req, res) => {
  const { attribute, value, sort } = req.body;
  let filter = {};
  let sortOption = {};

  if (sort === 2) filter[attribute] = { $gt: value };
  else if (sort === 3) filter[attribute] = { $lt: value };
  else if (sort === 4) filter[attribute] = value;
  else if (sort === 5) filter[attribute] = { $gte: value };
  else if (sort === 6) filter[attribute] = { $lte: value };
  else if (sort === 0) sortOption[attribute] = 1;
  else if (sort === 1) sortOption[attribute] = -1;

  try {
    const campaigns = await Campaign.find(filter).sort(sortOption);
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a User
app.post('/api/users', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const newUser = new User({ User_name: username, password, Role: role });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', userId: newUser._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});