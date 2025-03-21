const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: String, required: true }, // Name of the user who left the review
  comment: { type: String, required: true }, // Review comment
  rating: { type: Number, required: true, min: 1, max: 5 }, // Rating (1 to 5)
  date: { type: Date, default: Date.now }, // Date of the review
});

const farmhouseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  features: { type: [String], required: true },
  images: { type: [String], required: true },
  address: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  capacity: { type: Number, required: true }, // Maximum number of guests
  rating: { type: Number, default: 0 }, // Average rating
  reviews: [reviewSchema], // Array of reviews
});

module.exports = mongoose.model('Farmhouse', farmhouseSchema);