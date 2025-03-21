const mongoose = require('mongoose');

const farmhouseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  features: { type: [String], required: true }, // Array of features
  images: { type: [String], required: true }, // Array of image URLs
  address: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('Farmhouse', farmhouseSchema);