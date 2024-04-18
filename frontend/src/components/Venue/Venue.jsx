import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Stack, Card, CardContent, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MovieFilters = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/movies/');
        setMovies(response.data);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
        setSnackbar({ open: true, message: 'Failed to fetch movies' });
      }
    };
    fetchMovies();
  }, []);

  const handleBookNow = (movie, selectedShowtime) => {
    if (movie.showtimes && movie.showtimes.length > 0) {
      const theatre = movie.showtimes.find(showtime => showtime.datetime === selectedShowtime).theatre;
      if (!theatre || !theatre.name) {
        setSnackbar({ open: true, message: 'Theater information is not available.' });
        return;
      }
      navigate('/seating', {
        state: {
          theater: theatre.name,
          showtime: selectedShowtime,
          movieTitle: movie.title,
        },
      });
    } else {
      setSnackbar({ open: true, message: 'No showtimes available for this movie.' });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ padding: 4, pt: 6 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'medium' }}>
        Movie Listings
      </Typography>
      {movies.map((movie, index) => (
        <Card key={index} sx={{ marginBottom: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>{movie.title}</Typography>
            <Typography variant="body2" gutterBottom>{movie.synopsis}</Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
            {movie.showtimes.map((showtime, idx) => (
  <Button 
    key={idx} 
    variant="outlined" 
    color="primary"
    onClick={() => handleBookNow(movie, showtime.datetime)} // This now includes the selected showtime
  >
    {new Date(showtime.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
  </Button>
))}
              <Button variant="contained" color="secondary" onClick={() => handleBookNow(movie)}>Book Now</Button>
            </Stack>
          </CardContent>
        </Card>
      ))}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MovieFilters;
