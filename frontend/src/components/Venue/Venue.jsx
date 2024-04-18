import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, CardActions, CardMedia, Snackbar, Alert, MenuItem, FormControl, Select } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MovieFilters = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [selectedShowtimes, setSelectedShowtimes] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setSnackbar({ open: true, message: 'You are not authorized. Please log in.' });
          navigate('/login');
          return;
        }
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setMovies(response.data);
        // Initialize the selected showtimes state
        const initialShowtimes = {};
        response.data.forEach(movie => {
          initialShowtimes[movie._id] = movie.showtimes.length > 0 ? movie.showtimes[0].datetime : '';
        });
        setSelectedShowtimes(initialShowtimes);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
        setSnackbar({ open: true, message: 'Failed to fetch movies' });
      }
    };
    fetchMovies();
  }, [navigate]);

  const handleSelectShowtime = (movieId, datetime) => {
    setSelectedShowtimes(prevShowtimes => ({
      ...prevShowtimes,
      [movieId]: datetime,
    }));
  };

  const handleBookNow = (movieId) => {
    const movie = movies.find(movie => movie._id === movieId);
    const selectedShowtime = selectedShowtimes[movieId];
    if (selectedShowtime && movie) {
      navigate('/seating', {
        state: {
          theater: movie.showtimes.find(showtime => showtime.datetime === selectedShowtime).theatre.name,
          showtime: selectedShowtime,
          movieTitle: movie.title,
        },
      });
    } else {
      setSnackbar({ open: true, message: 'Please select a showtime.' });
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
      {movies.map(movie => (
        <Card key={movie._id} sx={{ display: 'flex', marginBottom: 2, boxShadow: 3 }}>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={movie.imageUrl}
            alt={`Cover for ${movie.title}`}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography variant="h5" component="div">{movie.showtimes[0]?.theatre.name} - {movie.title}</Typography>
              <Typography variant="body2" color="text.secondary" component="div">{movie.synopsis}</Typography>
              <FormControl fullWidth>
                <Select
                  value={selectedShowtimes[movie._id]}
                  onChange={(event) => handleSelectShowtime(movie._id, event.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Select showtime' }}
                >
                  {movie.showtimes.map((showtime, idx) => (
                    <MenuItem key={idx} value={showtime.datetime}>
                      {new Date(showtime.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" onClick={() => handleBookNow(movie._id)}>
                Book Now
              </Button>
            </CardActions>
          </Box>
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
