import React from 'react';
import { CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/components/Home/Home'; // Example page component
import Login from '../src/components/Login/Login'; // Example page component
import Seating from '../src/components/SeatBooking/Seating'; // Example page component
import PaymentForm from './components/PaymentForm/PaymentForm';
import Venue from './components/Venue/Venue';

function App() {
  return (
    <Router>
      <CssBaseline /> 
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/seating" element={<Seating />} />
            <Route path="/venue" element={<Venue/>} />
            <Route path="/paymentForm" element={<PaymentForm />} />

          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
