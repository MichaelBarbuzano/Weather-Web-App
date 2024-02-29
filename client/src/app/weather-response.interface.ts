// weather-response.interface.ts

export interface WeatherResponse {
    main: {
      temp: number;
    };
    weather: {
      description: string;
    }[];
  }