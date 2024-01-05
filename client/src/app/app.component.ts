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
  weatherData: any = null; // Variable to store weather data


  constructor(private weatherService: WeatherService) {}

  getlocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log(position);
        this.getWeather();
      });
    }
  }

  getWeather(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        this.weatherService.getWeather(this.latitude, this.longitude)
          .subscribe(response => {
            console.log('Weather data received successfully', response);
            this.weatherData = response; // Assign the response to the weatherData variable
          }, error => {
            console.error('Error fetching weather data', error);
          });
      });
    }
  }
}
