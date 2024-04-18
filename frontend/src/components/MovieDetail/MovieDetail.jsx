import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Chip, Box, CardMedia } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({ title: '', rating: '', genre: '', synopsis: '', cast: '', showtimes: [], imageUrl: '' });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies/movie/${movieId}`);
        setMovie(response.data); // Assuming response.data contains the movie object
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) return <Typography>No movie found.</Typography>;

  const headerFooterHeight = '64px'; // Assume header and footer are each 64px

  return (
    <Box sx={{ pt: headerFooterHeight, pb: headerFooterHeight, minHeight: `calc(100vh - ${headerFooterHeight} * 2)`, display: 'flex', flexDirection: 'column' }}>
      <Card raised sx={{ maxWidth: 900, margin: 'auto', mt: 2, mb: 2, flexGrow: 1 }}>
        <CardMedia
          component="img"
          image={movie.imageUrl || 'path_to_some_default_placeholder_image.jpg'}
          alt={movie.title}
          sx={{ height: 450, objectFit: 'cover' }} // You can adjust the height and objectFit as needed
        />
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {movie.title}
          </Typography>
          <Chip label={`Rating: ${movie.rating || 'Not available'}`} color="primary" icon={<StarIcon />} sx={{ mb: 2 }} />
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            Genre: {movie.genre || 'Not available'}
          </Typography>
          <Typography variant="body1" sx={{ my: 2 }}>
            Synopsis: {movie.synopsis || 'Not available'}
          </Typography>
          <Typography variant="body1">
            Cast: {movie.cast || 'Not available'}
          </Typography>
          {movie.showtimes && movie.showtimes.map((showtime, index) => (
            <Typography key={index}>
              Theatre: {showtime.theatre?.name || 'Unknown'}, Time: {new Date(showtime.datetime).toLocaleString()}
            </Typography>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default MovieDetail;
