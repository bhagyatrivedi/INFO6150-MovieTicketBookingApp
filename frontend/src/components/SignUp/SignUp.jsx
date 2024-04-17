import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Card, CardContent, FormControl, InputLabel, Select, MenuItem, Alert } from '@mui/material';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [type, setType] = useState('customer'); // Default to 'customer'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleFullNameChange = (event) => setFullName(event.target.value);
  const handleTypeChange = (event) => setType(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccessMessage('');

    try {
      const url = 'http://localhost:3000'; // Replace with your backend URL
      const response = await fetch(`${url}/user/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          type,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors ? data.errors.map(err => err.msg).join(', ') : 'Failed to register');
      }

      setSuccessMessage('Registration successful! You can now log in.');
      setEmail('');
      setPassword('');
      setFullName('');
      setType('customer');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const backgroundImageUrl = `${process.env.PUBLIC_URL}/jumbotron-img.png`; // Adjust the image path as needed

  return (
    <Box
      sx={{
        position: 'relative', // Make this Box relative to allow the nested Boxes to position correctly
        width: '100vw',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Card raised sx={{ maxWidth: 400, backgroundColor: 'rgba(255, 255, 255, 0.85)' }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              Sign Up
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                label="Full Name"
                variant="outlined"
                type="text"
                value={fullName}
                onChange={handleFullNameChange}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={handleEmailChange}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>User Type</InputLabel>
                <Select
                  value={type}
                  label="User Type"
                  onChange={handleTypeChange}
                  required
                >
                  <MenuItem value="customer">Customer</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                fullWidth
              >
                Register
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default SignupPage;
