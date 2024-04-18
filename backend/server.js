const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();
// Connect to Database
connectDB();

// Middleware
app.use(cors()); // Use CORS middleware here to allow cross-origin requests
app.use(express.json({extended: false}));

// Routes
const moviesRoutes = require('./Routes/moviesRoutes');
const theatreRoutes = require('./Routes/theatreRoutes');
const userRoutes = require('./Routes/userRoutes');
app.use('/movies', moviesRoutes);
app.use('/theatres', theatreRoutes);
app.use('/', userRoutes);
// Serve static files from the 'images' directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API Running');
});

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  try {
      const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: 'usd',
      });
      res.send({
          clientSecret: paymentIntent.client_secret,
      });
  } catch (error) {
      res.status(500).send({ error: error.message });
  }
});

// Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
