import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(latitude: number, longitude: number) {
    const apiKey = 'e9d35c0de7261ef359b944c47c6ea1c7';  //OpenWeatherMap API key
    const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
    return this.http.get(apiUrl);
  }

  getCurrentWeather(latitude: number, longitude: number) {
    const apiKey = 'e9d35c0de7261ef359b944c47c6ea1c7'; //  OpenWeatherMap API key
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
    return this.http.get(apiUrl);
  }
}