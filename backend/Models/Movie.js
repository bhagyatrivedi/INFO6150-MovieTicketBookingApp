// Movie Schema
const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
  theatre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theatre',
    required: true
  },
  datetime: {
    type: Date,
    required: true
  }
});

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  rating: { type: String, required: true },
  genre: { type: String, required: true },
  synopsis: { type: String, required: true },
  cast: { type: String, required: true },
  showtimes: [showtimeSchema],
  imageUrl: { type: String, required: true },
  category: String,
});

module.exports = mongoose.model('Movie', movieSchema);
