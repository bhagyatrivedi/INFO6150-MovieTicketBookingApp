import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MoviesListing = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTheater, setSelectedTheater] = useState('');
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/movies/`);
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    // Reset theater and showtime selection when movie changes
    setSelectedTheater('');
    setSelectedShowtime('');
  };

  const handleTheaterChange = (event) => {
    setSelectedTheater(event.target.value);
    setSelectedShowtime('');
  };

  const handleShowtimeChange = (event) => {
    setSelectedShowtime(event.target.value);
  };

  const handleBookNow = () => {
    navigate(`/seating?theater=${selectedTheater}&showtime=${selectedShowtime}`);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie._id}>
            <Typography variant="h5">{movie.title}</Typography>
            <Typography variant="body2">{movie.synopsis}</Typography>
            <Button onClick={() => handleMovieSelect(movie)}>Book Now</Button>
          </Grid>
        ))}
      </Grid>
      {selectedMovie && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Select Theater and Showtime for: {selectedMovie.title}
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Theater</InputLabel>
            <Select value={selectedTheater} label="Theater" onChange={handleTheaterChange}>
              {selectedMovie.showtimes.map((showtime) => (
                <MenuItem key={showtime.theater._id} value={showtime.theater._id}>
                  {showtime.theater.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Showtime</InputLabel>
            <Select value={selectedShowtime} label="Showtime" onChange={handleShowtimeChange} disabled={!selectedTheater}>
              {selectedTheater &&
                selectedMovie.showtimes.find((s) => s.theater._id === selectedTheater)?.times.map((time, index) => (
                  <MenuItem key={index} value={time}>
                    {new Date(time).toLocaleTimeString()}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleBookNow} disabled={!selectedShowtime}>
            Proceed to Seats Selection
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MoviesListing;
