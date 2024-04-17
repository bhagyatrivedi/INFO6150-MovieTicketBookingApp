import React, { useState } from 'react';
import { Box, Typography, Chip, Stack, Divider } from '@mui/material';

const genres = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Thriller', 'Sci-Fi'];
const actors = ['Leonardo DiCaprio', 'Jennifer Lawrence', 'Denzel Washington', 'Meryl Streep'];
const directors = ['Christopher Nolan', 'Quentin Tarantino', 'Greta Gerwig', 'Bong Joon Ho'];
const languages = ['English', 'Spanish', 'French', 'Mandarin'];

const PreferencesForm = () => {
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

  const selectionColor = {
    genres: '#E57373',
    actors: '#FFA726',
    directors: '#BA68C8',
    languages: '#4FC3F7',
  };

  const handleSubmit = () => {
    console.log({
      favoriteGenres: selectedGenres,
      favoriteActors: selectedActors,
      favoriteDirectors: selectedDirectors,
      preferredLanguages: selectedLanguages,
    });
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
    </Box>
  );
};

export default PreferencesForm;
