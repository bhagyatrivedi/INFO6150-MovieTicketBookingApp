import React from 'react';
import { Button, TextField, Box, Typography, Container, Grid, Link } from '@mui/material';

export default function Login() {
  const handleLogin = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const username = event.target.username.value;
    const password = event.target.password.value;

    if (!username || !password) {
      console.log('Please fill in all fields'); // Replace with a more user-friendly feedback mechanism
    } else {
      console.log('Proceed with form submission');
      // Proceed with actual login logic
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: 3,
        padding: 2
      }}>
        <Typography component="h1" variant="h5">
          LOGIN
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="SignUpPage.html" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
