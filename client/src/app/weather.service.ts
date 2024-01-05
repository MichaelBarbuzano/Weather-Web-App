// weather.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private backendUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getWeather(latitude: number, longitude: number): Observable<any> {
    const url = `${this.backendUrl}weather`;
    const params = new HttpParams().set('latitude', latitude.toString()).set('longitude', longitude.toString());

    return this.http.get(url, { params });
  }
}
