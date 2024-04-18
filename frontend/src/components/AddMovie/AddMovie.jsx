import React, { useState, useEffect, Fragment } from 'react';
import {
  Box, Button, Card, CardContent, TextField, Typography, Select, MenuItem, FormControl, InputLabel, Grid, Alert, IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from 'axios';

const CustomTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#ff9100',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#ff9100',
    },
    '& input': {
      color: 'white',
    },
    '& fieldset': {
      borderColor: '#b3b3b3',
    },
    '&:hover fieldset': {
      borderColor: '#ffcc80',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#b3b3b3',
  },
});

const AddMovie = () => {
  const generatePredefinedShowtimes = () => {
    const startHour = 12; // Starting at 12 PM
    const endHour = 24; // Ending at 12 AM
    const intervalHours = 3; // 3-hour difference
    const showtimes = [];

    for (let hour = startHour; hour <= endHour; hour += intervalHours) {
      const time = new Date();
      time.setHours(hour, 0, 0); // Setting minutes and seconds to 0
      showtimes.push({ theatre: '', datetime: time });
    }

    return showtimes;
  };
  const [predefinedShowtimes] = useState(generatePredefinedShowtimes()); // Removed setPredefinedShowtimes
  const [movie, setMovie] = useState({
    title: '',
    rating: '',
    genre: '',
    synopsis: '',
    cast: '',
    category: '',
    poster: null,
    theater: '',
    showtimes: [],
  });
  const [theatres, setTheatres] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/theatres/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTheatres(response.data);
      } catch (error) {
        console.error('Failed to fetch theatres:', error);
        setError('Failed to fetch theatres');
      }
    };
  
    fetchTheatres();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    setMovie(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setMovie(prevState => ({
      ...prevState,
      poster: event.target.files[0],
    }));
  };

  const addShowtime = () => {
    setMovie(prevMovie => ({
      ...prevMovie,
      showtimes: [...prevMovie.showtimes, { theatre: '', datetime: new Date() }],
    }));
  };

  const handleAddPredefinedShowtime = (predefinedShowtime) => {
    if (!movie.theater) {
      setError('Please select a theater before adding a showtime.');
      return;
    }
  
    const selectedTheatreObject = theatres.find(theatre => theatre._id === movie.theater);
    console.log(theatres.find(theatre => theatre._id === movie.theater));
    if (!selectedTheatreObject) {
      setError('Selected theater does not exist.');
      return;
    }
  
    const newShowtime = {
      theatre: selectedTheatreObject._id,
      datetime: predefinedShowtime.datetime,
      id: Date.now(),
    };
  
    setMovie(prevMovie => ({
      ...prevMovie,
      showtimes: [...prevMovie.showtimes, newShowtime],
    }));
  };

  const removeSelectedShowtime = (id) => {
    setMovie(prevMovie => ({
      ...prevMovie,
      showtimes: prevMovie.showtimes.filter(showtime => showtime.id !== id),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Retrieve the JWT token from localStorage
  const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('title', movie.title);
    formData.append('rating', movie.rating);
    formData.append('genre', movie.genre);
    formData.append('synopsis', movie.synopsis);
    formData.append('cast', movie.cast);
    formData.append('category', movie.category);
    formData.append('showtimes', JSON.stringify(movie.showtimes));
    if (movie.poster) {
      formData.append('poster', movie.poster);
    }
  
   try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/movies/add-movie`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`, // Include the token in the request headers
      },
    });
    setSuccessMessage('Movie added successfully!');
    console.log('Response:', response);
  } catch (error) {
    console.error('Failed to add movie:', error);
    setError('Failed to add movie');
  }
};


  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#121212',
      paddingTop: '100px',
      paddingBottom: '100px'
    }}>
      <Card raised sx={{
        maxWidth: 900,
        mx: 2,
        display: 'flex',
        flexDirection: 'row',
        bgcolor: '#333333',
        boxShadow: '5px 5px 15px #000000',
      }}>
        <Grid container>
          <Grid item xs={8}>
            <CardContent>
              <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#ff9100' }}>
                Add New Movie
              </Typography>
              <form onSubmit={handleSubmit}>
                <CustomTextField
                  label="Title"
                  variant="outlined"
                  name="title"
                  value={movie.title}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />
                <CustomTextField
                  label="Rating"
                  variant="outlined"
                  name="rating"
                  value={movie.rating}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />
                <CustomTextField
                  label="Genre"
                  variant="outlined"
                  name="genre"
                  value={movie.genre}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />
                <CustomTextField
                  label="Synopsis"
                  variant="outlined"
                  name="synopsis"
                  multiline
                  rows={4}
                  value={movie.synopsis}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />
                <CustomTextField
                  label="Cast"
                  variant="outlined"
                  name="cast"
                  value={movie.cast}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="theater-label" style={{ color: '#b3b3b3' }}>Theater</InputLabel>
                <Select
                labelId="theater-label"
                id="theater"
                name="theater"
                value={movie.theater || ''}
                onChange={handleChange}
                  sx={{
                    color: 'white',
                    '& .MuiSvgIcon-root': { color: 'white' }
                  }}
                >
                   {theatres.map((theatre) => (
    <MenuItem key={theatre._id} value={theatre._id}>
      {theatre.name}
    </MenuItem>
  ))}
              </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="category-label" style={{ color: '#b3b3b3' }}>Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  name="category"
                  value={movie.category}
                  label="Category"
                  onChange={handleChange}
                  sx={{
                    color: 'white',
                    '& .MuiSvgIcon-root': { color: 'white' }
                  }}
                >
                  <MenuItem value="upcoming">Upcoming</MenuItem>
                  <MenuItem value="now-showing">Now Showing</MenuItem>
                  <MenuItem value="recommendations">Recommendations</MenuItem>
                </Select>
              </FormControl>
              <Typography variant="h5" sx={{ mt: 2, color: 'white' }}>Select Predefined Showtimes</Typography>
        {predefinedShowtimes.map((showtime, index) => (
          <Fragment key={index}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={8}>
                <Typography>
                  {showtime.datetime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Button variant="outlined" onClick={() => handleAddPredefinedShowtime(showtime)}>
                  Add
                </Button>
              </Grid>
            </Grid>
          </Fragment>
        ))}

        <Typography variant="h5" sx={{ mt: 2, color: 'white' }}>Selected Showtimes</Typography>
        {movie.showtimes.map((showtime, index) => (
          <Fragment key={showtime.id}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={8}>
                <Typography>
                  {showtime.datetime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <IconButton onClick={() => removeSelectedShowtime(showtime.id)}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Fragment>
        ))}
                <Button startIcon={<AddCircleOutlineIcon />} onClick={addShowtime}>
                  Add Showtime
                </Button>
                <Button type="submit" variant="contained" color="secondary" fullWidth sx={{ bgcolor: '#ff3d00' }}>
                  Add Movie
                </Button>
              </form>
            </CardContent>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 2 }}>
            <Box sx={{ width: '100%' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#ff9100' }}>
                Upload Poster
              </Typography>
              <input
                accept="image/*"
                type="file"
                onChange={handleFileChange}
                required
                style={{ display: 'block', marginBottom: 16, color: '#ffcc80' }}
              />
              {movie.poster && (
                <Box
                  component="img"
                  sx={{
                    height: 233,
                    width: '100%',
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                    borderRadius: '4px'
                  }}
                  alt="Uploaded movie poster preview"
                  src={URL.createObjectURL(movie.poster)}
                />
              )}
            </Box>
            
          </Grid>
        </Grid>
      </Card>
      {error && <Alert severity="error">{error}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
    </Box>
  );
};

export default AddMovie;
