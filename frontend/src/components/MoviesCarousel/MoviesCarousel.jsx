import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MovieCarousel = ({ category }) => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Retrieve the JWT token from localStorage
        const token = localStorage.getItem('token');
        
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies/${category}`, {
          headers: {
            // Include the JWT token in the Authorization header
            Authorization: `Bearer ${token}`
          }
        });
        setMovies(response.data);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
        // Navigate to login if a 401 Unauthorized error occurred
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchMovies();
  }, [category, navigate]);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };
  
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: 'white' }}>
        {category.replace('-', ' ').toUpperCase()}
      </Typography>
      <Carousel
        autoPlay={true}
        interval={3000}
        animation="slide"
        indicators={true}
        navButtonsAlwaysVisible={true}
        navButtonsProps={{
          style: {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: 0,
            color: '#ffffff'
          }
        }}
      >
        {movies.map((movie) => (
          <Card 
            key={movie._id} 
            sx={{ display: 'flex', justifyContent: 'center', bgcolor: 'transparent' }}
            onClick={() => handleMovieClick(movie._id)}
          >
            <CardMedia
              component="img"
              image={movie.imageUrl}
              alt={movie.title}
              sx={{ height: 450, maxWidth: '100%', objectFit: 'contain', marginBottom: 10 }}
            />
            <CardContent sx={{ position: 'absolute', bottom: 0, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <Typography gutterBottom variant="h5" component="div">
                {movie.title}
              </Typography>
              <Typography variant="body2">
                {movie.synopsis}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Carousel>
    </Box>
  );
};

export default MovieCarousel;
