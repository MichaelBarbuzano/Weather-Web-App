import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Weather App';
  latitude = 0  ;
  longitude = 0;
  weatherData: any = null;//any[] = []; // Variable to store weather data
  currentWeather: any = null;

  ngOnInit() {
    this.getlocation();
  }
  constructor(private weatherService: WeatherService) {}

  getlocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log(position);
        this.getCurrentWeather();
        this.getWeather();
      });
    }
  }

  getWeather(): void {
    this.weatherService.getWeather(this.latitude, this.longitude)
      .subscribe(response => {
        console.log('Weather data received successfully', response);
        this.weatherData = response; // Assign the response to the weatherData variable
      }, error => {
        console.error('Error fetching weather data', error);
      });
  }

  getCurrentWeather(): void {
    this.weatherService.getCurrentWeather(this.latitude, this.longitude)
      .subscribe(response => {
        console.log('Current weather data received successfully', response);
        this.currentWeather = response; // Assign the response to the currentWeather variable
      }, error => {
        console.error('Error fetching current weather data', error);
      });
  }

  conditionToImage: { [key: string]: string } = {
    'sunny': 'assets/image/sunny.jpg',
    'rainy': 'assets/images/rainy.jpg',
    'cloudy': 'assets/images/cloudy.jpg',
    'few clouds': 'assets/images/cloudy.jpg',
    // ... add other conditions
  };

  getWeatherImage(condition: string): string {
    const lowerCaseCondition = condition.toLowerCase();

    // Check if the condition contains certain words and map them to the same image
  if (lowerCaseCondition.includes('clouds')) {
    return this.conditionToImage['cloudy'];
  }
  if (lowerCaseCondition.includes('rain')) {
    return this.conditionToImage['rainy'];
  }
  if (lowerCaseCondition.includes('sunny')) {
    return this.conditionToImage['sunny'];
  }

    return this.conditionToImage[condition.toLowerCase()] || 'assets/images/default-image.jpg';
  }

}
