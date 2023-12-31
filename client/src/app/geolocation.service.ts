import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  getlocation(): void {
    // Your code to get the location and update userCity goes here
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
      });
    }else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}
