import { Component, OnInit } from '@angular/core';
import { LocationService } from './geolocation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Weather App';
  latitude = 0  ;
  longitude = 0;
  

  constructor(private locationService: LocationService) {}

  getlocation(): void {
    
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log(position);
        this.sendLocationToBackend();

      });
    }
  }

  sendLocationToBackend(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        this.locationService.sendLocation(this.latitude, this.longitude)
          .subscribe(response => {
            console.log('Location sent successfully', response);
          }, error => {
            console.error('Error sending location', error);
          });
      });
    }
  }
}

