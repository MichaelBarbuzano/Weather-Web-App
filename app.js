
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors'); // Import cors middleware

const app = express();
const PORT = process.env.PORT || 3000;


//use cors middleware
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mean-stack-app', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
  res.send('Weather App');
});

app.get('/weather', async (req, res) => {
  try {
    const apiKey = 'e9d35c0de7261ef359b944c47c6ea1c7'; 
    const city = 'Charlotte'; // Replace with the actual city name

    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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
