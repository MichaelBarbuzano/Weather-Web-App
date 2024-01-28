// geolocation.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private backendUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  // Updated sendLocation method to include latitude and longitude as parameters
  sendLocation(latitude: number, longitude: number): Observable<any> {
    const url = `${this.backendUrl}weather?latitude=${latitude}&longitude=${longitude}`;
    return this.http.get(url);
  }
}
