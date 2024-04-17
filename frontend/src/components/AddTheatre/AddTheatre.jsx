import React, { useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography, Grid, MenuItem, Alert } from '@mui/material';


const AddTheatre = () => {
  const initialState = {
    name: '',
    company: '',
    street: '',
    city: '',
    state: '',
    zip: ''
  };
  const [theatre, setTheatre] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [pincodeError, setPincodeError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'zip' && !/^\d*$/.test(value)) {
      return;
    }
    if (name === 'zip' && value.length > 6) {
      return;
    }
    if (name === 'zip' && value.length === 6) {
      setPincodeError(false);
    }
    setTheatre(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:3000/theatres/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(theatre),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add theatre');
      }

      setSuccessMessage('Theatre added successfully!');
      setTheatre(initialState); // Reset the form fields after successful submission
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card raised sx={{ maxWidth: 600, mx: 2 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            Add New Theatre
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Theatre Name"
              variant="outlined"
              name="name"
              value={theatre.name}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Theatre Company"
              variant="outlined"
              name="company"
              value={theatre.company}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Street Address"
              variant="outlined"
              name="street"
              value={theatre.street}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="City"
                  variant="outlined"
                  name="city"
                  value={theatre.city}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  select
                  label="State"
                  variant="outlined"
                  name="state"
                  value={theatre.state}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                >
                  {states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  error={pincodeError}
                  helperText={pincodeError ? "Please enter a 6-digit pin code" : ""}
                  label="Zip Code"
                  variant="outlined"
                  name="zip"
                  value={theatre.zip}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Theatre
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
  'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

export default AddTheatre;
