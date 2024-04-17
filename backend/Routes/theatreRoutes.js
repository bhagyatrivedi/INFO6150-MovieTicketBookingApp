const express = require('express');
const Theatre = require('../Models/Theatre');

const router = express.Router();

// POST route to add a new theatre
router.post('/', async (req, res) => {
  const theatre = new Theatre({
    ...req.body
  });

  try {
    const newTheatre = await theatre.save();
    res.status(201).json(newTheatre);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
});

// GET route to fetch all theatres
router.get('/', async (req, res) => {
  try {
    const theatres = await Theatre.find();
    res.json(theatres);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
