import React, { useState, useMemo } from 'react';
import { Box, Typography, Button, Grid, Paper, styled, useMediaQuery, Dialog, DialogActions, DialogContent, DialogContentText, ArrowDownwardIcon } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useLocation, useNavigate  } from 'react-router-dom'; 

const SeatButton = styled(Button)(({ theme, booked, selected }) => ({
  minWidth: '36px',
  height: '36px',
  margin: theme.spacing(2),
  backgroundColor: booked ? 'grey' : selected ? 'blue' : 'green',
  '&:hover': {
    backgroundColor: selected ? 'darkblue' : 'lightgreen',
  },
  '&.Mui-disabled': {
    backgroundColor: 'grey',
    color: 'black',
  },
}));

const SmallSeatButton = styled(SeatButton)({
  minWidth: '18px',
  height: '18px',
  padding: 0,
  margin: '2px',
});

const SideSeat = ({ number, booked, selected, onSelect }) => (
  <SmallSeatButton
    variant="contained"
    booked={booked}
    selected={selected}
    onClick={onSelect}
    disabled={booked}
  >
    {number}
  </SmallSeatButton>
);

const Seat = ({ number, booked, selected, onSelect }) => (
  <SeatButton
    variant="contained"
    booked={booked}
    selected={selected}
    onClick={onSelect}
    disabled={booked}
  >
    {number}
  </SeatButton>
);

const sectionPricing = {
  premium: 60,
  executive: 50,
  normal: 25,
};

const createInitialSeats = (rows, seatsPerRow) => {
  return Array.from({ length: rows }, (_, rowIndex) => Array.from({ length: seatsPerRow }, (_, seatIndex) => ({
    number: seatIndex + 1,
    booked: Math.random() < 0.3,
  })));
};

const Seating = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // Using destructuring directly for convenience
  const [selectedSeats, setSelectedSeats] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [sections, setSections] = useState({
    premium: createInitialSeats(3, 10),
    executive: createInitialSeats(2, 10),
    normal: createInitialSeats(5, 10),
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState('');

  // Retrieve theater and movieTitle from the navigation state
  const { theater = 'Unknown Theater', movieTitle = 'Unknown Movie', showtime } = state || {};

  const totalPrice = useMemo(() => {
    return Object.entries(selectedSeats).reduce((acc, [key, isSelected]) => {
      if (isSelected) {
        const [section] = key.split('-');
        return acc + sectionPricing[section];
      }
      return acc;
    }, 0);
  }, [selectedSeats]);

  const toggleSeatSelection = (category, rowIndex, seatIndex) => {
    const seatId = `${category}-${rowIndex}-${seatIndex}`;
    setSelectedSeats((prevSelectedSeats) => ({
      ...prevSelectedSeats,
      [seatId]: !prevSelectedSeats[seatId],
    }));
  };

  const renderSeatRows = (rows, category) => {
    return rows.map((row, rowIndex) => (
      <Grid container key={`${category}-row-${rowIndex}`} justifyContent="center" spacing={2}>
        {row.map((seat, seatIndex) => (
          <Seat
            key={`${category}-seat-${rowIndex}-${seatIndex}`}
            number={seat.number}
            booked={seat.booked}
            selected={selectedSeats[`${category}-${rowIndex}-${seatIndex}`]}
            onSelect={() => toggleSeatSelection(category, rowIndex, seatIndex)}
          />
        ))}
      </Grid>
    ));
  };

  const handleCheckoutClick = () => {
    const selectedCount = Object.values(selectedSeats).filter(Boolean).length;
    setDialogContent(`You are about to purchase ${selectedCount} tickets for a total of $${totalPrice.toFixed(2)}.`);
    setOpenDialog(true);
  };

  const handleCloseDialog = (confirm = false) => {
    setOpenDialog(false);
    if (confirm) {
      navigate('/paymentForm', { 
        state: { 
          theater, 
          movieTitle, 
          showtime, // include the showtime here
          selectedSeats: Object.keys(selectedSeats).filter(key => selectedSeats[key]), 
          totalPrice 
        } 
      });
    }
  };

  return (
    <Paper elevation={3} sx={{ margin: 'auto', overflow: 'hidden', p: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Movie Seat Booking
      </Typography>
      <Typography variant="h5" gutterBottom>
        Movie: {movieTitle}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Theatre: {theater}
      </Typography>
      <Typography variant="h6" gutterBottom>
  Showtime: {new Date(showtime).toLocaleString()}
</Typography>
      {Object.entries(sections).map(([category, rows]) => (
        <Box key={category} sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom textAlign="center">
            {`${category.toUpperCase()} - Seats $${sectionPricing[category]}`}
          </Typography>
          {renderSeatRows(rows, category)}
        </Box>
      ))}
      <Button variant="contained" color="primary" onClick={handleCheckoutClick} sx={{ mt: 2 }}>
        Checkout - ${totalPrice.toFixed(2)}
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <DialogContentText>{dialogContent}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={() => handleCloseDialog(true)} autoFocus>
        Confirm
      </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Seating;
