const express = require('express');
const Movie = require('../Models/Movie');
const jwtAuth = require('../middleware/auth');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3'); // Correct import
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Initialize S3 client with AWS SDK v3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Multer configuration for parsing multipart/form-data
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory
  limits: { fileSize: 5 * 1024 * 1024 }, // Example: limit file size to 5MB
});

router.post('/add-movie', jwtAuth(['admin']), upload.single('poster'), async (req, res) => {
  const { title, rating, genre, synopsis, cast, category } = req.body;
  const showtimesString = req.body.showtimes;
  let showtimes;

  try {
    showtimes = JSON.parse(showtimesString);
    showtimes.forEach(st => {
      if (!st.theatre || !st.datetime) {
        throw new Error("Each showtime must include a theatre and datetime.");
      }
    });
  } catch (error) {
    console.error('Error parsing showtimes:', error);
    return res.status(400).json({ message: "Invalid showtimes format" });
  }

  let imageUrl = null;
  if (req.file) {
    const uploadParams = {
      Bucket: 'movie-app-info6150',
      Key: `uploads/poster-${Date.now()}-${path.basename(req.file.originalname)}`,
      Body: req.file.buffer,
    };

    try {
      await s3Client.send(new PutObjectCommand(uploadParams));
      imageUrl = `https://${uploadParams.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
    } catch (uploadError) {
      console.error('Error uploading file to S3:', uploadError);
      return res.status(500).json({ message: "Failed to upload image to S3" });
    }
  }
  if (!imageUrl) {
    return res.status(400).json({ message: "Poster image is required" });
  }

  const movieData = { title, rating, genre, synopsis, cast, showtimes, imageUrl, category };

  try {
    const movie = new Movie(movieData);
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    console.error('Error saving movie:', err);
    res.status(400).json({ message: err.message });
  }
});



router.get('/:category', jwtAuth(['customer', 'admin', 'theatre admin']),async (req, res) => {
  try {
    const movies = await Movie.find({ category: req.params.category });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/', jwtAuth(['customer', 'admin', 'theatre admin']),async (req, res) => {
  try {
    // .populate() will replace 'theatre' ObjectId with actual 'Theatre' document
    const movies = await Movie.find().populate('showtimes.theatre');
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/movie/:id', jwtAuth(['customer', 'admin', 'theatre admin']), async (req, res) => {
  try {
    console.log("In API")
    const movie = await Movie.findById(req.params.id).populate('showtimes.theatre');
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    console.log('Movie fetched:', movie.data);
    res.json(movie);
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
