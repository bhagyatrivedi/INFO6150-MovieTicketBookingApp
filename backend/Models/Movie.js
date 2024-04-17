const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  rating: { type: String, required: true },
  genre: { type: String, required: true },
  synopsis: { type: String, required: true },
  cast: { type: String, required: true },
  theater: { type: String, required: true },
  imageUrl: {type: String, required: true},
  category: String, // e.g., 'upcoming', 'now-showing', 'recommendations'
});

module.exports = mongoose.model('Movie', movieSchema);
