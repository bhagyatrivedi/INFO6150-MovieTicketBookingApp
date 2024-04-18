import React, { useState, useContext } from 'react';
import { Button, TextField, Box, Typography, Container, Grid, Link, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext'; // Ensure the path is correct

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setLoginSuccess(false);

    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to login');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('userType', data.type);
      localStorage.setItem('user', JSON.stringify(data.user));
      login(data.user, data.token);
      setLoginSuccess(true);
      navigate('/customer-preferences');
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const backgroundImageUrl = `${process.env.PUBLIC_URL}/jumbotron-img.png`;

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
        }}
      />
      <Container component="main" maxWidth="xs" sx={{ pt: 8, pb: 6 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: 3,
            padding: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: 1,
          }}
        >
          <Typography component="h1" variant="h5">
            LOGIN
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            {error && <Alert severity="error">{error}</Alert>}
            {loginSuccess && <Alert severity="success">Logged in successfully!</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={handleUsernameChange}
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
              value={password}
              onChange={handlePasswordChange}
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
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
