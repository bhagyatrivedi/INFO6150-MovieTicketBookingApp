import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Divider, Pagination, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TheatreList = ({ theatres }) => {
  // Dummy data
  const dummyTheatres = [
    { id: 1, name: 'ABC Theatre', street: '123 Main St', city: 'Cityville', state: 'CA', zip: '12345' },
    { id: 2, name: 'XYZ Theatre', street: '456 Elm St', city: 'Townsville', state: 'NY', zip: '67890' },
    { id: 3, name: 'PQR Theatre', street: '789 Oak St', city: 'Villageton', state: 'FL', zip: '54321' },
    { id: 4, name: 'LMN Theatre', street: '101 Maple St', city: 'Townville', state: 'CA', zip: '98765' },
    { id: 5, name: 'STU Theatre', street: '456 Pine St', city: 'Cityville', state: 'TX', zip: '13579' },
    { id: 6, name: 'VWX Theatre', street: '789 Cedar St', city: 'Villageton', state: 'WA', zip: '24680' },
    { id: 7, name: 'MNO Theatre', street: '101 Walnut St', city: 'Townsville', state: 'IL', zip: '86420' },
  ];

  // Pagination
  const itemsPerPage = 5;
  const [page, setPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTheatres = dummyTheatres.slice(startIndex, endIndex);

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 4, pt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Theatre List
      </Typography>
      <List sx={{ mb: 4 }}>
        {paginatedTheatres.map((theatre, index) => (
          <Paper key={theatre.id} elevation={3} sx={{ mb: 2 }}>
            <ListItem>
              <ListItemText
                primary={theatre.name}
                secondary={`${theatre.street}, ${theatre.city}, ${theatre.state} ${theatre.zip}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" sx={{ color: 'red' }}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Paper>
        ))}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={Math.ceil(dummyTheatres.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
    </Box>
  );
};

export default TheatreList;
