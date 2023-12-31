import { Component, OnInit } from '@angular/core';
import { GeolocationService } from './geolocation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Weather App';
  
  getlocation(): void {
    // Your code to get the location and update userCity goes here
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
      });
    }
  }
}

