
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors'); // Import cors middleware
const dotenv = require('dotenv'); // Import dotenv

dotenv.config(); // Load environment variables from .env file


const app = express();
const PORT = process.env.PORT || 3000;


//use cors middleware
app.use(cors());

// Connect to MongoDB
//mongoose.connect('mongodb://localhost:27017/project1', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json()); // Parse JSON bodies


app.post('/api/send-location', (req, res) => {
  const { latitude, longitude } = req.body;
  console.log('Received location:', { latitude, longitude });

  // Use latitude and longitude in your OpenWeatherMap API call or other logic
  // ...
  
  res.json({ message: 'Location received successfully' });
});

app.get('/', (req, res) => {
  res.send('Weather App');
});

app.get('/weather', async (req, res) => {
  try {
    const apiKey = process.env.API_KEY; 
    const { latitude, longitude } = req.body; // Retrieve latitude and longitude from the request body



    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    const response = await axios.get(apiUrl);

    const weatherData = {
      temp: (response.data.main.temp * 9/5) + 32,
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
