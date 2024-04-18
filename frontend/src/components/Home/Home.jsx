import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Card, CardMedia, CardContent, Grid, AppBar, Toolbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Carousel from 'react-material-ui-carousel';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

import { AuthContext } from '../../AuthContext';

// Import images
import m1 from '../../img/movie1.png';
import m2 from '../../img/movie2.png';
import m3 from '../../img/movie3.png';
import m4 from '../../img/movie4.png';
import m5 from '../../img/movie5.png';
import m6 from '../../img/Avatar.png';
import m7 from '../../img/Titanic.png';
import m8 from '../../img/Dune.png';
import m9 from '../../img/Oppenheimer.png';
import m10 from '../../img/Barbie.png';
import m11 from '../../img/US.png';
import m12 from '../../img/Wood.png';

import jumbotronImage from '../../img/jumbotron-img.png';


function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const featuredMovies = [
    { image: m1, title: 'Twisters', description: 'Some description.', rating: '8.2/10 - 52.1K Votes' },
    { image: m2, title: 'Come Together', description: 'Some description.', rating: '9/10 - 40.1K Votes' },
    { image: m3, title: 'Fighter', description: 'Some description.', rating: '9.5/10 - 60.1K Votes' },
    { image: m4, title: 'K.G.F Chapter 2', description: 'Some description.', rating: '9.1/10 - 80.1K Votes' },
    { image: m5, title: 'BRAHMASTRA', description: 'Some description.', rating: '8.5/10 - 30.1K Votes' },
    { image: m6, title: 'Avatar', description: 'Some description.', rating: '9.2/10 - 30.1K Votes' },
    { image: m7, title: 'Titanic', description: 'Some description.', rating: '10/10 - 30.1K Votes' },
    { image: m8, title: 'Dune', description: 'Some description.', rating: '9.0/10 - 30.1K Votes' },
  ];

  const openingThisWeekMovies = [
    { image: m9, title: 'Oppenheimer', description: 'Some description.', rating: '8.3/10 - 30.1K Votes' },
    { image: m10, title: 'Barbie', description: 'Some description.', rating: '9.0/10 - 30.1K Votes' },
    { image: m11, title: 'US', description: 'Some description.', rating: '9.7/10 - 30.1K Votes' },
    { image: m12, title: 'Wood', description: 'Some description.', rating: '9.7/10 - 30.1K Votes' }
  ];

  const handleBookNowClick = () => {
    // Check if the user is not logged in
    if (!user) {
      navigate('/login');
    } else if (user.type === 'customer') {
      navigate('/customer-preferences');
    } else if (user.type === 'admin') {
      // For example, redirect an admin user somewhere relevant
      navigate('/admin-dashboard');
    }
  };

  return (
    <Box sx={{ bgcolor: 'black', color: 'white' }}>

      {/* Navbar placeholder */}
      <AppBar position="static" color="transparent">
        <Toolbar>
           <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          {/* Add navigation links or logo here */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CINEMA
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      {/* Featured Movie */}
      {/* This would be a large display card for a featured movie */}
      <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '95vh' }}>
        <CardMedia component="img" image={jumbotronImage} alt="Featured Movie" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        {/* Overlayed text and buttons */}
        <Box sx={{ position: 'absolute', p: 4, color: 'white' }}>
          <Typography variant="h3">Welcome to CineGenie</Typography>
          <Button variant="contained" onClick={handleBookNowClick}>Book Now</Button>
        </Box>
      </Card>

<Typography variant="h4" gutterBottom sx={{ my: 2, textAlign: 'center', color: 'white' }}>
  Featured Movies
</Typography>

<Carousel
  autoPlay={true}
  interval={5000} // Time in ms between auto play changes (3 seconds)
  animation="slide"
  NextIcon={<ArrowForwardIos sx={{ color: 'white' }} />}
  PrevIcon={<ArrowBackIos sx={{ color: 'white' }} />}
  navButtonsAlwaysVisible={true}
  navButtonsProps={{
    style: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: 0
    }
  }}
  indicators={true}
  sx={{ maxHeight: '600px' }} // Adjust this value as needed
>
  {featuredMovies.map((movie, index) => (
    <Box key={index} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '600px' }}>
      {/* Increase the height here if you want the images to be larger */}
      <img src={movie.image} alt={movie.title} style={{ height: '600px', maxWidth: '100%', objectFit: 'contain' }} />
    </Box>
  ))}
</Carousel>

      {/* Opening This Week Section */}
      <Typography variant="h4" gutterBottom sx={{ my: 2, textAlign: 'center', color: 'white' }}>
        Opening This Week
      </Typography>
      <Grid container spacing={2} sx={{ justifyContent: 'center', paddingBottom: 4 }}>
        {openingThisWeekMovies.map((movie, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ maxWidth: 345, bgcolor: 'grey.900', mx: 'auto', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                sx={{ height: 450, objectFit: 'cover' }} // Adjust height to control the image size
                image={movie.image}
                alt={movie.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div" color="white">
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="white">
                  {movie.description}
                </Typography>
                <Typography sx={{ fontWeight: 'bold', color: 'white' }}>
                  {movie.rating}
                </Typography>
              </CardContent>
              <Button variant="contained" color="primary" onClick={handleBookNowClick}>
          Book Now
        </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Home;
