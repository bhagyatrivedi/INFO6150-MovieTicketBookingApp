import React, { useContext } from 'react';
import { CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import Home from '../src/components/Home/Home';
import Login from '../src/components/Login/Login';
import Seating from '../src/components/SeatBooking/Seating';
import PaymentForm from './components/PaymentForm/PaymentForm';
import Venue from './components/Venue/Venue';
import BookingHistory from './components/BookingHistory/BookingHistory';
import AddTheatre from './components/AddTheatre/AddTheatre';
import TheatreList from './components/TheatreList/TheatreList';
import PreferencesForm from './components/PreferencesForm/PreferencesForm';
import MovieDetail from './components/MovieDetail/MovieDetail';
import SignupPage from './components/SignUp/SignUp';
import AddMovie from './components/AddMovie/AddMovie';
import MoviesPage from './components/MoviesPage/MoviesPage';
import MoviesListing from './components/MoviesListing/MoviesListing';
import { AuthProvider, AuthContext } from '../src/AuthContext';

// Adjust PrivateRoute to work with your Routes
function PrivateRoute({ children }) {
  const { authToken } = useContext(AuthContext);
  return authToken ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <CssBaseline /> 
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignupPage />} />
              {/* Wrap protected routes within a PrivateRoute */}
              <Route path="/seating" element={<PrivateRoute><Seating /></PrivateRoute>} />
              <Route path="/venue" element={<PrivateRoute><Venue/></PrivateRoute>} />
              <Route path="/paymentForm" element={<PrivateRoute><PaymentForm /></PrivateRoute>} />
              <Route path="/bookinghistory" element={<PrivateRoute><BookingHistory /></PrivateRoute>} />
              <Route path="/add-theatre" element={<PrivateRoute><AddTheatre/></PrivateRoute>} />
              <Route path="/customer-preferences" element={<PrivateRoute><PreferencesForm /></PrivateRoute>} />
              <Route path="/movie/:movieId" element={<PrivateRoute><MovieDetail /></PrivateRoute>} />
              <Route path="/add-movie" element={<PrivateRoute><AddMovie /></PrivateRoute>}/>
              <Route path="/movies" element={<PrivateRoute><MoviesPage /></PrivateRoute>} />
              <Route path="/book-movie" element={<PrivateRoute><MoviesListing /></PrivateRoute>} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </AuthProvider>
  );
}

export default App;
