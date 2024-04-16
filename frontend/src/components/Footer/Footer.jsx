import React from 'react';
import { Box, Typography, Link, Grid, List, ListItem, ListItemText } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'black', color: 'white', py: 3 }}>
      <Grid container spacing={3} justifyContent="space-around">
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>Company</Typography>
          <List>
            <ListItem disablePadding>
              <Link href="#" color="inherit" underline="none">About Us</Link>
            </ListItem>
            <ListItem disablePadding>
              <Link href="#" color="inherit" underline="none">Contact</Link>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>Support</Typography>
          <List>
            <ListItem disablePadding>
              <Link href="#" color="inherit" underline="none">Help Center</Link>
            </ListItem>
            <ListItem disablePadding>
              <Link href="#" color="inherit" underline="none">Privacy Policy</Link>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>Follow Us</Typography>
          <Link href="#" color="inherit">
            <FacebookIcon sx={{ marginRight: '10px' }} />
          </Link>
          <Link href="#" color="inherit">
            <TwitterIcon sx={{ marginRight: '10px' }} />
          </Link>
          <Link href="#" color="inherit">
            <InstagramIcon />
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
