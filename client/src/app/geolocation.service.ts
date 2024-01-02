// geolocation.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private backendUrl = 'http://localhost:3000/'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  sendLocation(latitude: number, longitude: number): Observable<any> {
    const url = `${this.backendUrl}api/send-location`;
    const data = { latitude, longitude };

    return this.http.post(url, data);
  }
}
