const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

app.get('/', (req, res) =>{
    res.send('API running')
});


connectDB();

app.use(express.json({extended:false}));
app.use(cors());

app.use('/images', express.static('images'));

// app.use('/', require('./api/routes/user'))
const port = 3000;
app.listen(port, () => {
    console.log(`[INFO] - server running on port ${port}`)
});