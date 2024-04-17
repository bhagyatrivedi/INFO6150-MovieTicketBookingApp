import React, { useState, useEffect } from 'react';
import {
  Box, Button, Card, CardContent, TextField, Typography, Select, MenuItem, FormControl, InputLabel, Grid, Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#ff9100',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#ff9100',
    },
  },
  '& .MuiOutlinedInput-input': {
    color: 'white',
  },
  '& .MuiInputLabel-root': {
    color: '#b3b3b3',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#b3b3b3',
    },
    '&:hover fieldset': {
      borderColor: '#ffcc80',
    },
  },
});

const AddMovie = () => {
  const [movie, setMovie] = useState({
    title: '',
    rating: '',
    genre: '',
    synopsis: '',
    cast: '',
    theater: '',
    releaseDate: '',
    category: '',
    poster: null
  });
  const [theatres, setTheatres] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        const response = await fetch('http://localhost:3000/theatres/');
        if (!response.ok) {
          throw new Error('Failed to fetch theatres');
        }
        const data = await response.json();
        setTheatres(data);
      } catch (error) {
        console.error('Error fetching theatres:', error);
      }
    };

    fetchTheatres();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMovie(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    setMovie(prevState => ({
      ...prevState,
      poster: event.target.files[0]
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccessMessage('');

    const formData = new FormData();
    Object.keys(movie).forEach(key => {
      formData.append(key, movie[key]);
    });

    try {
      const response = await fetch('http://localhost:3000/movies/add-movie', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add movie');
      }

      await response.json();
      setSuccessMessage('Movie added successfully!');
      setMovie({
        title: '',
        rating: '',
        genre: '',
        synopsis: '',
        cast: '',
        theater: '',
        releaseDate: '',
        category: '',
        poster: null
      }); // Reset form fields
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#121212'
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
                  value={movie.theater}
                  onChange={handleChange}
                  sx={{
                    color: 'white',
                    '& .MuiSvgIcon-root': { color: 'white' }
                  }}
                >
                  {theatres.map((theatre) => (
                    <MenuItem key={theatre._id} value={theatre.name}>
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
