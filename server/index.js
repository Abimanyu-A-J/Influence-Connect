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
  Password: String,
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

// Admin Schema
const AdminSchema = new mongoose.Schema({
  User_id: { type: String, required: true },
  Name: { type: String, required: true },
});

// Influencer Schema
const InfluencerSchema = new mongoose.Schema({
  User_id: { type: String, required: true },
  Name: { type: String, required: true },
  Category: { type: String, default: null },
  Reach: { type: String, default: null } // Default to null
});

// Sponsor Schema
const SponsorSchema = new mongoose.Schema({
  User_id: { type: String, required: true },
  Name: { type: String, required: true },
  Category: { type: String, default: null }, // Default to null
});

// Models
const Admin = mongoose.model('Admin', AdminSchema, 'admin');
const Influencer = mongoose.model('Influencer', InfluencerSchema, 'influencer');
const Sponsor = mongoose.model('Sponsor', SponsorSchema, 'sponsor');

// User Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ User_name: username, Password:password });
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

  const filter = {};
  const sortOption = {};

  let parsedValue = value;
  if (["Start_date", "End_date"].includes(attribute)) {
    parsedValue = new Date(value);
  } else if (!isNaN(value)) {
    parsedValue = Number(value);
  }

  try {
    switch (parseInt(sort)) {
      case 0: // Ascending sort
        sortOption[attribute] = 1;
        break;
      case 1: // Descending sort
        sortOption[attribute] = -1;
        break;
      case 2: // Greater than
        filter[attribute] = { $gt: parsedValue };
        break;
      case 3: // Less than
        filter[attribute] = { $lt: parsedValue };
        break;
      case 4: // Regex search (case-insensitive)
        filter[attribute] = new RegExp(parsedValue, "i");
        break;
      case 5: // Greater than or equal
        filter[attribute] = { $gte: parsedValue };
        break;
      case 6: // Less than or equal
        filter[attribute] = { $lte: parsedValue };
        break;
      default:
        return res.status(400).json({ message: "Invalid sort value" });
    }

    const campaigns = await Campaign.find(filter).sort(sortOption);
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/profile/update', async (req, res) => {
  const { userId, role, profile } = req.body;

  try {
    if (role === 'Admin') {
      await User.findByIdAndUpdate(userId, {
        User_name: profile.Name,
      });

      await Admin.findOneAndUpdate(
        { User_id: userId },
        { Name: profile.Name }
      );
    }

    else if (role === 'Influencer') {
      await User.findByIdAndUpdate(userId, {
        User_name: profile.Name,
      });
    
      await Influencer.findOneAndUpdate(
        { User_id: userId },
        {
          Name: profile.Name,
          Category: profile.Category || null,
          Reach: profile.Reach || null, // Ensure that Reach is updated too
        }
      );
    }    

    else if (role === 'Sponsor') {
      await User.findByIdAndUpdate(userId, {
        User_name: profile.Company_name,
      });

      await Sponsor.findOneAndUpdate(
        { User_id: userId },
        {
          Name: profile.Company_name,
          Category: profile.Category || null
        }
      );
    }

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ message: 'Error updating profile' });
  }
});


// Create a User
app.post('/api/users', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const userId = new mongoose.Types.ObjectId().toString(); // unique ID for cross-collection reference

    const newUser = new User({
      User_id: userId,
      User_name: username,
      Password: password,
      Role: role
    });

    await newUser.save();

    // Data to insert into role-specific collection
    const roleData = {
      User_id: userId,
      Name: username
    };

    // Add user to the role-specific collection
    switch (role.toLowerCase()) {
      case 'admin':
        await new Admin(roleData).save();
        break;
      case 'influencer':
        await new Influencer(roleData).save();
        break;
      case 'sponsor':
        await new Sponsor(roleData).save();
        break;
      default:
        return res.status(400).json({ message: 'Invalid role specified' });
    }

    res.status(201).json({
      message: 'User created successfully',
      userId: newUser.User_id
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Profile by userId and role (GET request)
app.get('/api/profile', async (req, res) => {
  const { userId, role } = req.query;

  try {
    let profileData = null;

    if (role === 'Admin') {
      profileData = await Admin.findOne({ User_id: userId });
    } else if (role === 'Influencer') {
      profileData = await Influencer.findOne({ User_id: userId });
    } else if (role === 'Sponsor') {
      profileData = await Sponsor.findOne({ User_id: userId });
    } else {
      return res.status(400).json({ message: 'Invalid role provided' });
    }

    if (!profileData) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json({ profile: profileData });
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});