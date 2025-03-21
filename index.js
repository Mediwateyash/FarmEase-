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
// Serve images from the 'public' folder
app.use(express.static("public"));

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

// Handle JSON POST request to add a new farmhouse
app.post('/add-farmhouse', async (req, res) => {
  console.log('Request Body:', req.body); // Debugging: Log the request body

  const { name, features, images, address, location, price, description } = req.body;

  // Convert features and images from arrays (if they are not already arrays)
  const featuresArray = Array.isArray(features) ? features : [features];
  const imagesArray = Array.isArray(images) ? images : [images];

  try {
    const newFarmhouse = new Farmhouse({
      name,
      features: featuresArray,
      images: imagesArray,
      address,
      location,
      price: parseFloat(price),
      description,
    });

    await newFarmhouse.save();
    res.status(201).json({ message: 'Farmhouse added successfully', farmhouse: newFarmhouse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error saving farmhouse' });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});