import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Slide, useScrollTrigger, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

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
  return (
    <HideOnScroll {...props}>
      <AppBar sx={{ bgcolor: 'black' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CineGenie
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
