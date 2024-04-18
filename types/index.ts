export interface WeatherDataProps {
  weather: {
    description: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  name: string;
  sys: {
    country: string;
  };
  wind: {
    speed: number;
  };
}

export interface ForecastDataProps {
  dt: number;
  main: {
    temp_min: number;
    temp_max: number;
  };
  weather: {
    icon: string;
    description: string;
  }[];
  dt_txt: string;
}


export interface RecentCitiesProps{
  city: string;
  description: string;
  temperature: number;
  icon: string
}