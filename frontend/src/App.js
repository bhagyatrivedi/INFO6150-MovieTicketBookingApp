import React from 'react';
import { CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/components/Home/Home'; // Example page component
import Login from '../src/components/Login/Login';
import Seating from '../src/components/SeatBooking/Seating'; 
import BookingHistory from './components/BookingHistory/BookingHistory';
import PreferencesForm from './components/PreferencesForm/PreferencesForm';


import MovieDetail from './components/MovieDetail/MovieDetail';
import SignupPage from './components/SignUp/SignUp';
function App() {
  return (
    <Router>
      <CssBaseline /> 
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
           <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/seating" element={<Seating />} />
            <Route path="/bookinghistory" element={<BookingHistory />} />
            <Route path="/customer-preferences" element={<PreferencesForm />} />
            <Route path="/movie/:movieId" element={<MovieDetail />} />
            <Route path="/sign-up" element={<SignupPage />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;