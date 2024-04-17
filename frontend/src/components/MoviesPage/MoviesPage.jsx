import React from 'react';
import { Box, Typography } from '@mui/material';
import MovieCarousel from '../MoviesCarousel/MoviesCarousel';

function MoviesPage() {
  return (
    <Box sx={{ padding: 2, bgcolor: 'background.default', color: 'text.primary', marginTop: 10 }}>
      <Typography variant="h2" gutterBottom sx={{ color: 'primary.main', textAlign: 'center', fontWeight: 'bold', mb: 4 }}>
        Explore Our Movies
      </Typography>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'secondary.main', mb: 2, fontWeight: 'medium', textTransform: 'uppercase' }}>
          Upcoming Releases
        </Typography>
        <MovieCarousel category="upcoming" />
      </Box>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'error.main', mb: 2, fontWeight: 'medium', textTransform: 'uppercase' }}>
          Now Showing
        </Typography>
        <MovieCarousel category="now-showing" />
      </Box>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'info.main', mb: 2, fontWeight: 'medium', textTransform: 'uppercase' }}>
          Our Recommendations
        </Typography>
        <MovieCarousel category="recommendations" />
      </Box>
    </Box>
  );
}

export default MoviesPage;
