import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  title = 'Weather App';
  weatherData: any; // Assuming the data structure returned by your API

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchWeatherData();
  }

  fetchWeatherData() {
    this.http.get<any>('http://localhost:3000/weather').subscribe(
      (response) => {
        // Assuming the data structure returned by the server is like { temp: ..., condition: ... }
        this.weatherData = response;
      },
      (error) => {
        console.error('Error fetching weather data:', error);
      }
    );
  }
}
