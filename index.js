const express = require('express');
const mongoose = require('./database');
const Farmhouse = require('./models/farmhouse');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/farmhouselist', async (req, res) => {
  const farmhouses = await Farmhouse.find();
  res.render('farmhouselist', { farmhouses });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});