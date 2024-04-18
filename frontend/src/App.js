import React, { useContext } from 'react';
import { CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../src/components/Home/Home';
import Login from '../src/components/Login/Login';
import Seating from '../src/components/SeatBooking/Seating';
import PaymentForm from './components/PaymentForm/PaymentForm';
import Venue from './components/Venue/Venue';
import BookingHistory from './components/BookingHistory/BookingHistory';
import AddTheatre from './components/AddTheatre/AddTheatre';
import PreferencesForm from './components/PreferencesForm/PreferencesForm';
import MovieDetail from './components/MovieDetail/MovieDetail';
import SignupPage from './components/SignUp/SignUp';
import AddMovie from './components/AddMovie/AddMovie';
import MoviesPage from './components/MoviesPage/MoviesPage';
import { AuthProvider, AuthContext } from '../src/AuthContext';

// Updated PrivateRoute to check for allowed user types
function PrivateRoute({ children, allowedTypes }) {
  const { user } = useContext(AuthContext);

  // Redirect to login if not authenticated
  if (!user) return <Navigate to="/login" replace />;

  // Redirect to home if the user type is not allowed
  if (allowedTypes && !allowedTypes.includes(user.type)) return <Navigate to="/" replace />;

  return children;
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
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignupPage />} />

              {/* Routes accessible by all authenticated users */}
              <Route path="/seating" element={<PrivateRoute  allowedTypes={['customer']}><Seating /></PrivateRoute>} />
              <Route path="/venue" element={<PrivateRoute  allowedTypes={['customer']}><Venue/></PrivateRoute>} />
              <Route path="/paymentForm" element={<PrivateRoute  allowedTypes={['customer']}><PaymentForm /></PrivateRoute>} />
              <Route path="/bookinghistory" element={<PrivateRoute  allowedTypes={['customer']}><BookingHistory /></PrivateRoute>} />
              <Route path="/customer-preferences" element={<PrivateRoute allowedTypes={['customer']}><PreferencesForm /></PrivateRoute>} />

              {/* Routes for 'admin' only */}
              <Route path="/add-movie" element={<PrivateRoute allowedTypes={['admin']}><AddMovie /></PrivateRoute>} />
              <Route path="/movies" element={<PrivateRoute allowedTypes={['admin', 'customer']}><MoviesPage /></PrivateRoute>} />
              <Route path="/movie/:movieId" element={<PrivateRoute allowedTypes={['admin', 'customer']}><MovieDetail /></PrivateRoute>} />

              {/* Route for 'theatre admin' only */}
              <Route path="/add-theatre" element={<PrivateRoute allowedTypes={['theatre admin']}><AddTheatre/></PrivateRoute>} />

              {/* General catch-all route for unauthorized access */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </AuthProvider>
  );
}

export default App;
