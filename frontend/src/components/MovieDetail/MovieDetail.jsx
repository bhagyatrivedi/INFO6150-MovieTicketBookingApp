import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import YouTube from 'react-youtube';
import mockMovies from './mockMovies'; // Import mock data

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const movieData = mockMovies.find(m => m.id === movieId);
    setMovie(movieData);
  }, [movieId]);

  const getYouTubeId = url => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  if (!movie) return <Typography>No movie found.</Typography>;

  const videoId = getYouTubeId(movie.trailerUrl);

  const videoOpts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 1,
    },
  };

  // Assume header and footer are each 64px. Adjust these values as necessary.
  const headerFooterHeight = '64px'; 

  return (
    <Box sx={{ pt: headerFooterHeight, pb: headerFooterHeight, minHeight: `calc(100vh - ${headerFooterHeight} * 2)`, display: 'flex', flexDirection: 'column' }}>
      <Card raised sx={{ maxWidth: 900, margin: 'auto', mt: 2, mb: 2, flexGrow: 1 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {movie.title}
          </Typography>
          <Chip label={`Rating: ${movie.rating}`} color="primary" icon={<StarIcon />} sx={{ mb: 2 }} />
          <YouTube videoId={videoId} opts={videoOpts} />
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            {movie.genre.join(', ')}
          </Typography>
          <Typography variant="body1" sx={{ my: 2 }}>
            Synopsis: {movie.synopsis}
          </Typography>
          <Typography variant="body1">
            Cast: {movie.cast.join(', ')}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MovieDetail;
