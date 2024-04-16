import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, Grid } from '@mui/material';
import m1 from '../../img/movie1.png';
import m2 from '../../img/movie2.png';
import m3 from '../../img/movie3.png';
import m4 from '../../img/movie4.png';
import m5 from '../../img/movie5.png';
import jumbotronImage from '../../img/jumbotron-img.png';

function Home() {
  // Array of movie objects for mapping
  const movies = [
    { image: m1, title: 'Twisters', description: 'Some description.', rating: '8.2/10 - 52.1K Votes' },
    { image: m2, title: 'Come Together', description: 'Some description.', rating: '9/10 - 40.1K Votes' },
    { image: m3, title: 'Fighter', description: 'Some description.', rating: '9.5/10 - 60.1K Votes' },
    { image: m4, title: 'K.G.F Chapter 2', description: 'Some description.', rating: '9.1/10 - 80.1K Votes' },
    { image: m5, title: 'BRAHMASTRA', description: 'Some description.', rating: '8.5/10 - 30.1K Votes' },
  ];

  return (
    <Box>
      {/* Jumbotron/Header Section */}
      <Box sx={{
        backgroundImage: `url(${jumbotronImage})`,
        backgroundSize: 'cover',
        height: '95vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        padding: 5
      }}>
        <Box sx={{ textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.6)', p: 4 }}>
          <Typography variant="h3" gutterBottom>Welcome to CineGenie</Typography>
          <Typography variant="h5" gutterBottom>Book your tickets for the latest movies!</Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>Browse Movies</Button>
        </Box>
      </Box>

      {/* Recommended Movies Section */}
      <Box sx={{ my: 5, mx: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: 'rgb(226, 43, 89)', backgroundColor: 'bisque', p: 2 }}>
          Recommended Movies
        </Typography>
        <Grid container spacing={2}>
          {movies.map((movie, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={movie.image}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {movie.description}
                  </Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>{movie.rating}</Typography>
                  <Button size="small">Book Now</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Home;
