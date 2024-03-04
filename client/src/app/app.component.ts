import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  temperature: number | undefined;
  forecast: any = null;
  weatherData: any = null;//any[] = []; // Variable to store weather data
  currentWeather: any = null;
  groupedForecast: any[] = [];

  ngOnInit() {
    this.getlocation();
  }

  constructor(private weatherService: WeatherService, private cdr: ChangeDetectorRef) {}

  getlocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log(position);
        console.log("Coordiantes ", position.coords.latitude, position.coords.longitude)
        this.getCurrentWeather();
        this.getForecast();
      });
    }
  }
  getForecast(): void {
    this.weatherService.getForecast(this.latitude, this.longitude)
      .subscribe(response => {
        console.log('Current weather data received successfully', response);

        console.log(response);
        this.weatherData = response;
        console.log("Testing Forecast", this.weatherData)
        this.groupedForecast = this.groupForecastByDay(this.weatherData.list);
        console.log("Grouped Forecast!", this.weatherData);

      }, error => {
        console.error('Error fetching current weather data', error);
      });
  }
  getCurrentWeather(): void {
    this.weatherService.getCurrentWeather(this.latitude, this.longitude)
      .subscribe(response => {
        console.log('Current weather data received successfully', response);

        this.currentWeather = response;
        console.log(this.currentWeather.main.temp);
        console.log(this.currentWeather.weather[0].description);
        const condition = this.currentWeather.weather[0].description;
        console.log("Condition = ", condition);

        //this.cdr.detectChanges();

        //this.currentWeather = response; // Assign the response to the currentWeather variable
      }, error => {
        console.error('Error fetching current weather data', error);
      });
  }


  conditionToImage: { [key: string]: string } = {
    
    'sunny': 'assets/images/sunny.png',
    'rainy': 'assets/images/rainy.png',
    'cloudy': 'assets/images/cloudy.png',
    'few clouds': 'assets/images/cloudy.png',
    'snow': 'assets/images/snowy.png',
    
    // ... add other conditions
  };

  getWeatherImage(condition: string): string {
    const lowerCaseCondition = condition.toLowerCase();

    // Check if the condition contains certain words and map them to the same image
  if (lowerCaseCondition.includes('cloud')) {
    return this.conditionToImage['cloudy'];
  }
  if (lowerCaseCondition.includes('rain')) {
    return this.conditionToImage['rainy'];
  }
  if (lowerCaseCondition.includes('sunny') || lowerCaseCondition.includes('sun') || lowerCaseCondition.includes('clear sky')) {
    return this.conditionToImage['sunny'];
  }
  if (lowerCaseCondition.includes('snow') || lowerCaseCondition.includes('hail')) {
    return this.conditionToImage['snow'];
  }

    return this.conditionToImage[condition.toLowerCase()] || 'assets/images/default-image.png';
  }

  groupForecastByDay(forecast: any[]): any[] {
    
    console.log("Received forecast data:", forecast);
  
    if (!forecast || !Array.isArray(forecast)) {
      console.log("Forecast data is not valid:", forecast);
      return [];
    }
  
    const currentDate = new Date();
    const groupedForecast: any[] = [];
    const groupedByDate: { [key: string]: any[] } = {};
  
    // Group forecast data by date
    forecast.forEach((item: any) => {
      const date = new Date(item.dt * 1000); // Convert timestamp to Date object
      const dateString = date.toDateString();
  
      if (!groupedByDate[dateString]) {
        groupedByDate[dateString] = [];
      }
  
      groupedByDate[dateString].push(item);
    });
  
    // Convert grouped data to array format
    for (const date in groupedByDate) {
      if (Object.prototype.hasOwnProperty.call(groupedByDate, date)) {
        const forecastData = groupedByDate[date];

        const conditionCounter: { [key: string]: number } = {};
        forecastData.forEach(item => {
          // Convert the timestamp to a Date object
          const dateObj = new Date(item.dt * 1000);
          if (dateObj.getHours() >= 10 && dateObj.getHours() <= 17) {
          const condition = item.weather[0].description;
          conditionCounter[condition] = (conditionCounter[condition] || 0) + 1;
          }
        });
        let avgCondition = "";
        let maxCount = 0;
        for (const condition in conditionCounter) {
          if (conditionCounter[condition] > maxCount) {
            avgCondition = condition;
            maxCount = conditionCounter[condition];
          }
        }


        const minTemp = Math.min(...forecastData.map(item => item.main.temp));
        const maxTemp = Math.max(...forecastData.map(item => item.main.temp));
        //if current date != date
        if(date != currentDate.toDateString()){
          groupedForecast.push({ date, forecast: forecastData, minTemp, maxTemp, avgCondition });
        }
      }
    }
  
    console.log("Grouped Forecast:", groupedForecast);
    return groupedForecast;
  } 
  getCurrentDate(): string {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return currentDate.toLocaleDateString('en-US', options);
  }
}
