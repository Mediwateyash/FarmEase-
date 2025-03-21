const express = require('express');
const mongoose = require('./database');
const Farmhouse = require('./models/farmhouse');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(express.static("public")); // Serve images from the 'public' folder

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

// Display all farmhouses
app.get('/farmhouselist', async (req, res) => {
  try {
    const farmhouses = await Farmhouse.find();
    res.render('farmhouselist', { farmhouses });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Render form to add a new farmhouse
app.get('/add-farmhouse', (req, res) => {
  res.render('add-farmhouse');
});

// Display details of a specific farmhouse
app.get('/farmhouse/:id', async (req, res) => {
  try {
    const farmhouse = await Farmhouse.findById(req.params.id);
    if (!farmhouse) {
      return res.status(404).send('Farmhouse not found');
    }
    res.render('farmhouse', { farmhouse });
  } catch (err) {
    console.error("Error fetching farmhouse details:", err);
    res.status(500).send('Server Error');
  }
});

// Handle JSON POST request to add a new farmhouse
app.post('/add-farmhouse', async (req, res) => {
  console.log('Request Body:', req.body); // Log the request body for debugging

  const { name, features, images, address, location, price, description, capacity, rating, reviews } = req.body;

  try {
    // Validate required fields
    if (!name || !features || !images || !address || !location || !price || !description || !capacity || !rating) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newFarmhouse = new Farmhouse({
      name,
      features,
      images,
      address,
      location,
      price: parseFloat(price),
      description,
      capacity: parseInt(capacity),
      rating: parseFloat(rating),
      reviews: reviews || [], // Default to an empty array if reviews are not provided
    });

    await newFarmhouse.save();
    res.status(201).json({ message: "Farmhouse added successfully", farmhouse: newFarmhouse });
  } catch (err) {
    console.error("Error saving farmhouse:", err); // Log the full error
    res.status(500).json({ error: "Error saving farmhouse", details: err.message });
  }
});

// New API endpoint to fetch farmhouses by location
app.get('/api/farmhouses', async (req, res) => {
  const { location } = req.query; // Get location from query parameter

  try {
    const farmhouses = await Farmhouse.find({ location }); // Fetch farmhouses from the database
    res.json(farmhouses); // Send the data as JSON
  } catch (error) {
    console.error('Error fetching farmhouses:', error);
    res.status(500).json({ error: 'Failed to fetch farmhouses' });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});