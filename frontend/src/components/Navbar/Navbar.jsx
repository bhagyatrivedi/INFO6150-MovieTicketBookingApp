import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Slide, useScrollTrigger, Button } from '@mui/material';
import { AuthContext } from '../../AuthContext'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Navbar(props) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Navigate to login after logout
  };

  return (
    <HideOnScroll {...props}>
      <AppBar sx={{ bgcolor: 'black' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
            CineGenie
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
          
          {/* Common Link for authenticated users
          {user && (
            <Button color="inherit" onClick={() => navigate('/bookinghistory')}>My Bookings</Button>
          )} */}

          {/* Customer-specific Links */}
          {user && user.type === 'customer' && (
            <Button color="inherit" onClick={() => navigate('/movies')}>Movies</Button>
          )}

          {/* Admin-specific Links */}
          {user && user.type === 'admin' && (
            <>
              <Button color="inherit" onClick={() => navigate('/add-movie')}>Add Movie</Button>
              <Button color="inherit" onClick={() => navigate('/movies')}>Manage Movies</Button>
            </>
          )}

          {/* Theatre Admin-specific Links */}
          {user && user.type === 'theatre admin' && (
            <Button color="inherit" onClick={() => navigate('/add-theatre')}>Add Theatre</Button>
          )}

          {user ? (
            <>
              <Typography variant="subtitle1" sx={{ marginRight: 2 }}>
                Welcome, {user.fullName}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
              <Button color="inherit" onClick={() => navigate('/sign-up')}>Sign Up</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
