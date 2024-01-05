
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors'); // Import cors middleware
const dotenv = require('dotenv'); // Import dotenv
const cookieParser = require('cookie-parser');


dotenv.config(); // Load environment variables from .env file


const app = express();
const PORT = process.env.PORT || 3000;

// use cookie-parser middleware
app.use(cookieParser());

//use cors middleware
app.use(cors());

// Use express-session middleware
app.use(session({
  secret: 'your-secret-key', // Replace with a secure secret key
  resave: false,
  saveUninitialized: true,
}));

// Connect to MongoDB
//mongoose.connect('mongodb://localhost:27017/project1', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json()); // Parse JSON bodies





app.get('/', (req, res) => {
  res.send('Weather App');
});

app.get('/weather', async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;
    const { latitude, longitude } = req.query; // Retrieve latitude and longitude from the request query parameters
    console.log('Testing variables', { latitude, longitude });

    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude not provided in the request.' });
    }

    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
    const response = await axios.get(apiUrl);

    const weatherData = {
      temp: response.data.main.temp,
      condition: response.data.weather[0].description,
    };

    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).send('Internal Server Error');
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
