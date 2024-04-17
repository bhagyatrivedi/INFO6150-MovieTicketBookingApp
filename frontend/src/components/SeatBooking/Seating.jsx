import React, { useState, useMemo } from 'react';
import { Box, Typography, Button, Grid, Paper, styled, MenuItem, Select, FormControl, InputLabel, useMediaQuery } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useTheme } from '@mui/material/styles';


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
    normal: 25
  };
  
const venues = ["Theater A", "Theater B", "Theater C"];
const seatNumbers = [1, 2, 3, 4, 5];
const createInitialSeats = (rows, seatsPerRow) => {
  return Array.from({ length: rows }, (_, rowIndex) => Array.from({ length: seatsPerRow }, (_, seatIndex) => ({
    number: seatIndex + 1,
    booked: Math.random() < 0.3,
  })));
};

const Seating = () => {
  const [venue, setVenue] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState('');
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
    const newSelectedSeats = {
      ...selectedSeats,
      [seatId]: !selectedSeats[seatId]
    };
    setSelectedSeats(newSelectedSeats);
  };

  const renderSeatRows = (rows, category, includeSides = false) => {
    return rows.map((row, rowIndex) => (
      <Grid container key={`${category}-row-${rowIndex}`} justifyContent="center" spacing={2}>
        {includeSides && (
          <Grid item>
            <SideSeat number="" booked={true} /> 
          </Grid>
        )}
        {row.map((seat, seatIndex) => (
          <Seat
            key={`${category}-seat-${rowIndex}-${seatIndex}`}
            number={seat.number}
            booked={seat.booked}
            selected={selectedSeats[`${category}-${rowIndex}-${seatIndex}`]}
            onSelect={() => toggleSeatSelection(category, rowIndex, seatIndex)}
          />
        ))}
        {includeSides && (
          <Grid item>
            <SideSeat number="" booked={true} />  {/* Placeholder for gap */}
          </Grid>
        )}
      </Grid>
    ));
  };
  const totalSeats = Math.max(...Object.values(sections).map(section => section[0].length));
  

  const handleVenueChange = (event) => {
    setVenue(event.target.value);
  };

  const handleNumberOfSeatsChange = (event) => {
    setNumberOfSeats(event.target.value);
  };

  const checkout = () => {
    const selectedCount = Object.keys(selectedSeats).filter(key => selectedSeats[key]).length;
    if (selectedCount === parseInt(numberOfSeats, 10)) {
      alert('Proceeding to checkout');
    } else {
      alert('Please select the correct number of seats');
    }
  };

  const handleCheckoutClick = () => {
    const selectedCount = Object.keys(selectedSeats).filter(key => selectedSeats[key]).length;
    if (selectedCount === parseInt(numberOfSeats, 10)) {
      setDialogContent(`You are about to purchase ${selectedCount} tickets for a total of $${totalPrice.toFixed(2)}.`);
    } else {
      setDialogContent('Please select the correct number of seats.');
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Paper elevation={3} sx={{ margin: 'auto', overflow: 'hidden', p: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Movie Seat Booking
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="venue-label">Venue</InputLabel>
          <Select
            labelId="venue-label"
            id="venue-select"
            value={venue}
            label="Venue"
            onChange={handleVenueChange}
          >
            {venues.map(v => (
              <MenuItem key={v} value={v}>{v}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="seat-number-label">Number of Seats</InputLabel>
          <Select
            labelId="seat-number-label"
            id="seat-number-select"
            value={numberOfSeats}
            label="Number of Seats"
            onChange={handleNumberOfSeatsChange}
          >
            {seatNumbers.map(number => (
              <MenuItem key={number} value={number}>{number}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>


{Object.entries(sections).map(([category, rows]) => (
        <Box key={category} sx={{ mt: 2 }}>
          {/* Update this Typography to include the price */}
          <Typography variant="subtitle1" gutterBottom textAlign="center">
            {`${category.toUpperCase()} - Seats $${sectionPricing[category]}`}
          </Typography>
          {renderSeatRows(rows, category, category === 'premium')}
        </Box>
      ))}


            {/* Screen representation below the seat grid */}
            <Box sx={{
        height: '20px',
        backgroundColor: 'darkgray',
        mt: 2,
        mx: 'auto', // Centers the screen box
        width: `calc(${totalSeats * 48}px - ${8}px)`, // Calculate the screen width based on the number of seats and margins
      }}>
        <Typography variant="caption" display="block" textAlign="center" color="white">
          Screen
        </Typography>
      </Box>

      {!isMobile && (
        <Box sx={{ position: 'absolute', bottom: 20, left: 30, textAlign: 'center' }}>
          <Typography variant="h5" color="primary">
            Entry <ArrowDownwardIcon fontSize="large" />
          </Typography>
        </Box>
      )}

      {!isMobile && (
        <Box sx={{ position: 'absolute', bottom: 20, right: 30, textAlign: 'center' }}>
          <Typography variant="h5" color="secondary">
            Exit <ArrowDownwardIcon fontSize="large" />
          </Typography>
        </Box>
      )}


      <Button
        variant="contained"
        color="primary"
        onClick={handleCheckoutClick}
        sx={{ mt: 2 }}
      >
        {`Checkout - $${totalPrice.toFixed(2)}`}
      </Button>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogContent>
          <DialogContentText>
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCloseDialog} autoFocus>
            Confirm
          </Button>
        </DialogActions>
        </Dialog>
    </Paper>
  );
};

export default Seating;
