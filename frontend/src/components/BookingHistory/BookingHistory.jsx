import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Divider, Typography, Rating, TextField } from '@mui/material';
import Pagination from '@mui/material/Pagination';

const bookings = [
    { id: 1, movieTitle: "Inception", date: "April 10, 2024", rating: 5 },
    { id: 2, movieTitle: "Interstellar", date: "March 22, 2024", rating: 4 },
    { id: 3, movieTitle: "The Matrix", date: "February 15, 2024", rating: 5 },
    { id: 4, movieTitle: "Parasite", date: "January 10, 2024", rating: 5 },
    { id: 5, movieTitle: "Parasite", date: "January 10, 2024", rating: 5 },
    { id: 6, movieTitle: "Parasite", date: "January 10, 2024", rating: 5 },
    { id: 7, movieTitle: "Parasite", date: "January 10, 2024", rating: 5 },
    // Add more bookings here if needed
];

const itemsPerPage = 5;

const BookingHistory = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);

    const filteredBookings = bookings.filter(booking => 
        booking.movieTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const paginatedBookings = filteredBookings.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <Box sx={{ maxWidth: 600, m: 'auto', p: 4, pt: 8 }}> {/* Add pt: 8 for padding on the top */}
            <Typography variant="h4" gutterBottom>
                Booking History
            </Typography>
            <TextField
                fullWidth
                label="Search by Movie Title"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mb: 2 }}
            />
            <List>
                {paginatedBookings.map((booking) => (
                    <React.Fragment key={booking.id}>
                        <ListItem>
                            <ListItemText
                                primary={booking.movieTitle}
                                secondary={`Booked on: ${booking.date}`}
                            />
                            <Rating name="read-only" value={booking.rating} readOnly />
                        </ListItem>
                        <Divider component="li" />
                    </React.Fragment>
                ))}
                {filteredBookings.length === 0 && (
                    <ListItem>
                        <ListItemText primary="No bookings found for the search criteria." />
                    </ListItem>
                )}
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination
                    count={Math.ceil(filteredBookings.length / itemsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                    shape="rounded"
                />
            </Box>
        </Box>
    );
};

export default BookingHistory;
