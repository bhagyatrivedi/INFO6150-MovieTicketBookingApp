import React, { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Stack,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
const genres = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Thriller', 'Sci-Fi'];
const actors = ['Leonardo DiCaprio', 'Jennifer Lawrence', 'Denzel Washington', 'Meryl Streep'];
const directors = ['Christopher Nolan', 'Quentin Tarantino', 'Greta Gerwig', 'Bong Joon Ho'];
const languages = ['English', 'Spanish', 'French', 'Mandarin'];

const PreferencesForm = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]);
  const [selectedDirectors, setSelectedDirectors] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const handleToggle = (category, item) => {
    const setList = {
      genres: setSelectedGenres,
      actors: setSelectedActors,
      directors: setSelectedDirectors,
      languages: setSelectedLanguages
    }[category];

    setList(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const handleClose = () => {
    setOpenDialog(false);
    navigate('/venue'); // Navigate to venue page after closing the dialog
  };
  const selectionColor = {
    genres: '#E57373',
    actors: '#FFA726',
    directors: '#BA68C8',
    languages: '#4FC3F7',
  };

  const handleSubmit = async () => {
    try {
        const authToken = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/updatePreferences`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                favoriteGenres: selectedGenres,
                favoriteActors: selectedActors,
                favoriteDirectors: selectedDirectors,
                preferredLanguages: selectedLanguages,
            })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not update preferences');
        }
        console.log('Preferences updated successfully!', data);
        setOpenDialog(true);
    } catch (error) {
        console.error('Error updating preferences:', error.message);
        // Handle error (e.g., show an error message)
    }
};

  return (
    <Box sx={{ padding: 5, bgcolor: '#fff', borderRadius: 1 }}>
      <Typography variant="h4" textAlign="center" sx={{ mb: 4, fontWeight: 'bold' }}>
        Set Your Preferences
      </Typography>

      
      {[
        { title: 'Favorite Genres', category: 'genres', list: genres, selected: selectedGenres },
        { title: 'Favorite Actors', category: 'actors', list: actors, selected: selectedActors },
        { title: 'Favorite Directors', category: 'directors', list: directors, selected: selectedDirectors },
        { title: 'Preferred Languages', category: 'languages', list: languages, selected: selectedLanguages },
      ].map((section, index) => (
        <Box key={section.title}>
          {index > 0 && <Divider sx={{ my: 2, borderColor: '#000' }} />} 
          <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold', textAlign: 'center' }}>
            {section.title}
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
            {section.list.map(item => (
              <Chip
                key={item}
                label={item}
                clickable
                onClick={() => handleToggle(section.category, item)}
                sx={{
                  backgroundColor: section.selected.includes(item) ? selectionColor[section.category] : '#e0e0e0',
                  '&:hover': {
                    backgroundColor: selectionColor[section.category],
                    opacity: 0.87,
                  },
                  borderColor: 'transparent',
                }}
              />
            ))}
          </Stack>
        </Box>
      ))}

<Box textAlign="center" sx={{ mt: 4 }}>
        <Chip
          label="Save Preferences"
          onClick={handleSubmit}
          sx={{
            bgcolor: '#455a64',
            color: 'white',
            '&:hover': {
              bgcolor: '#1c313a',
            },
          }}
        />
      </Box>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Preferences Saved Successfully!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your preferences have been saved. You will now be redirected to the venue page.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PreferencesForm;
