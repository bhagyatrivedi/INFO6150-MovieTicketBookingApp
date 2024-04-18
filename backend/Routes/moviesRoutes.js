const express = require('express');
const multer = require('multer');
const path = require('path');
const Movie = require('../Models/Movie');

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  },
});

const upload = multer({ storage: storage });

router.post('/add-movie', upload.single('poster'), async (req, res) => {
  const { title, rating, genre, synopsis, cast, category } = req.body;
  const showtimesString = req.body.showtimes; // You may need to ensure this is being sent as a JSON string

  let showtimes;
  try {
    showtimes = JSON.parse(showtimesString); // Parsing the JSON string
    showtimes.forEach(st => {
      if (!st.theatre || !st.datetime) {
        throw new Error("Each showtime must include a theatre and datetime.");
      }
    });
  } catch (error) {
    console.error('Error parsing showtimes:', error);
    return res.status(400).json({ message: "Invalid showtimes format" });
  }

  const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : '';
  if (!imageUrl) {
    return res.status(400).json({ message: "Poster image is required" });
  }

  const movieData = {
    title, rating, genre, synopsis, cast, showtimes, imageUrl, category
  };

  try {
    const movie = new Movie(movieData);
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    console.error('Error saving movie:', err);
    res.status(400).json({ message: err.message });
  }
});



router.get('/:category', async (req, res) => {
  try {
    const movies = await Movie.find({ category: req.params.category });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/', async (req, res) => {
  try {
    // .populate() will replace 'theatre' ObjectId with actual 'Theatre' document
    const movies = await Movie.find().populate('showtimes.theatre');
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
