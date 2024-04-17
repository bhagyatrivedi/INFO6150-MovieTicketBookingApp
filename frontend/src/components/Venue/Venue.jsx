import React, { useState, useEffect } from 'react';
import {
  Box, FormControl, InputLabel, Select, MenuItem, Button, Typography, Stack, Card, CardContent, TextField, IconButton, Divider, Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(2),
  minWidth: 120,
  maxWidth: 200
}));

const SessionTimeButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
}));

const movieSessionsData = [
  {
    id: 1,
    cinema: 'Cinepolis: Nexus Seawoods, Navi Mumbai',
    times: ['03:15 PM'],
    attributes: ['IMAX'],
  },
  {
    id: 2,
    cinema: 'Cinepolis: Viviana Mall, Thane',
    times: ['09:00 AM', '04:15 PM'],
    attributes: ['IMAX SCREEN'],
  },
  {
    id: 3,
    cinema: 'INOX: Inorbit Mall, Vashi',
    times: ['08:15 AM', '06:15 PM', '09:00 PM', '11:45 PM'],
    attributes: ['IMAX SCREEN'],
  },
  {
    id: 4,
    cinema: 'INOX: Palm Beach Galleria Mall, Vashi',
    times: ['09:00 AM', '04:15 PM', '12:00 PM'],
    attributes: ['2D'],
  },
  {
    id: 5,
    cinema: 'PVR: Oberoi, Kandivali',
    times: ['09:00 AM', '11:30PM','04:15 PM', '10:25 PM'],
    attributes: ['IMAX 3D'],
  },
  // Add more sessions as needed
];

const MovieFilters = () => {
  const [filters, setFilters] = useState({
    language: '',
    format: '',
    subRegion: '',
    date: '',
    searchQuery: ''
  });

  const [filteredSessions, setFilteredSessions] = useState(movieSessionsData);

  const language= ["Hindi", "English"];
  const format = ["IMAX 3D", "2D", "IMAX"];
  const subRegion = ["All Regions", "Region A", "Region B"];
  const date = ["2024-04-16", "2024-04-17", "2024-04-18"];

  useEffect(() => {
    const filtered = movieSessionsData.filter(session => {
      return (!filters.language || session.language === filters.language) &&
             (!filters.format || session.format === filters.format) &&
             (!filters.subRegion || session.subRegion === filters.subRegion) &&
             (!filters.date || session.date === filters.date);
    });
    setFilters(prev => ({ ...prev, filteredSessions: filtered }));
  }, [filters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    alert(`Search for: ${filters.searchQuery}`);
  };

  const renderSessions = () => {
    return filters.filteredSessions?.map((session, index) => (
      <Card key={index} sx={{ marginBottom: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>{session.cinema}</Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
            {session.times.map((time, idx) => (
              <SessionTimeButton key={idx} variant="contained" color="primary">
                {time}
              </SessionTimeButton>
            ))}
            {session.attributes.map((attr, idx) => (
              <Chip key={idx} label={attr} color="primary" variant="outlined" sx={{ marginLeft: 1 }} />
            ))}
          </Stack>
        </CardContent>
      </Card>
    ));
  };

  return (
    <Box sx={{ padding: 4, pt: 6 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'medium' }}>
        Movie Session Filters
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 2 }}>
        <StyledFormControl variant="outlined">
          <InputLabel>Language</InputLabel>
          <Select
            value={filters.language}
            onChange={handleFilterChange}
            name="language"
            label="Language"
          >
            {['Hindi', 'English'].map(lang => (
              <MenuItem key={lang} value={lang}>{lang}</MenuItem>
            ))}
          </Select>
        </StyledFormControl>
        <StyledFormControl variant="outlined">
          <InputLabel>Format</InputLabel>
          <Select
            value={filters.format}
            onChange={handleFilterChange}
            name="format"
            label="Format"
          >
            {['IMAX 3D', '2D', 'IMAX'].map(fmt => (
              <MenuItem key={fmt} value={fmt}>{fmt}</MenuItem>
            ))}
          </Select>
        </StyledFormControl>
        <StyledFormControl variant="outlined">
          <InputLabel>Sub Region</InputLabel>
          <Select
            value={filters.subRegion}
            onChange={handleFilterChange}
            name="subRegion"
            label="Sub Region"
          >
            {['All Regions', 'Region A', 'Region B'].map(region => (
              <MenuItem key={region} value={region}>{region}</MenuItem>
            ))}
          </Select>
        </StyledFormControl>
        <StyledFormControl variant="outlined">
          <InputLabel>Date</InputLabel>
          <Select
            value={filters.date}
            onChange={handleFilterChange}
            name="date"
            label="Date"
          >
            {['2024-04-16', '2024-04-17', '2024-04-18'].map(d => (
              <MenuItem key={d} value={d}>{d}</MenuItem>
            ))}
          </Select>
        </StyledFormControl>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', m: 1 }}>
          <TextField
            id="search"
            label="Search"
            type="search"
            value={filters.searchQuery}
            onChange={handleFilterChange}
            name="searchQuery"
            variant="outlined"
            size="small"
          />
          <IconButton aria-label="search" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider sx={{ my: 4 }} />
      {renderSessions()}
    </Box>
  );
};

export default MovieFilters;
