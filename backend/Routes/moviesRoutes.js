const express = require('express');
const multer = require('multer');
const path = require('path');
const Movie = require('../Models/Movie');

const router = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/'); // Target folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Prefixing the filename with a timestamp
  },
});

const upload = multer({ storage: storage });

router.post('/add-movie', upload.single('poster'), async (req, res) => {
  const { title, rating, genre, synopsis, cast, theater, releaseDate, category } = req.body;
  
  // Ensure req.file exists and then construct the imageUrl
  const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : '';
  
  // Verify imageUrl is not empty since it's required
  if (!imageUrl) {
    return res.status(400).json({ message: "Poster image is required" });
  }

  const movie = new Movie({
    title,
    rating,
    genre,
    synopsis,
    cast,
    theater,
    imageUrl, // Use the constructed URL
    releaseDate,
    category,
  });

  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Fetch movies by category
router.get('/:category', async (req, res) => {
  try {
    const movies = await Movie.find({ category: req.params.category });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
