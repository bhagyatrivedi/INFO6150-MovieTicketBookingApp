import React from 'react';
import { Box, Typography, Link, Grid, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'black', color: 'white', py: 1 }}>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ flexWrap: 'wrap-reverse'}}>
        
        {/* Left - Contact Info */}
        <Grid item xs={12} md={4} textAlign={{ xs: 'center', md: 'left'}}>
          <Typography variant="body2" gutterBottom>
            CONTACT US
          </Typography>
          <Typography variant="body2" gutterBottom>
            360, Huntington Ave, Boston, MA, 02215
          </Typography>
          <Typography variant="body2" gutterBottom>
            Phone: <Link href="tel:+12345678900" color="inherit">+1 2345 6789 00</Link>
          </Typography>
          <Typography variant="body2" gutterBottom>
            Email: <Link href="mailto:cinemoviemovies@hotmail.com" color="inherit">support@cinegenie.com</Link>
          </Typography>
        </Grid>

        {/* Center - Copyright */}
        <Grid item xs={12} md={4} textAlign="center" sx={{ order: { xs: 3, md: 2 } }}>
          <Typography variant="body2">
            © Copyright CineGenie Technologies. All Rights Reserved.
          </Typography>
          <Typography variant="body2" sx={{ pt: 1 }}>
            Designed by CineGenie Technology
          </Typography>
        </Grid>

        {/* Right - Social Icons */}
        <Grid item xs={12} md={4} textAlign={{ xs: 'center', md: 'right' }} sx={{ order: { xs: 2, md: 3 } }}>
          <Typography variant="body2" gutterBottom sx={{ display: { xs: 'none', md: 'inline' } }}>
            FOLLOW US
          </Typography>
          <IconButton color="inherit" href="#">
            <FacebookIcon />
          </IconButton>
          <IconButton color="inherit" href="#">
            <TwitterIcon />
          </IconButton>
          <IconButton color="inherit" href="#">
            <InstagramIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}
