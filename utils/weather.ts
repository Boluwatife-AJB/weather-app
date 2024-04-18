import axios from 'axios';

export async function fetchWeatherData(city: string): Promise<any> {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&cnt=5&units=metric`;

  try {
    const response = await axios.get(apiURL);
    const forecastResponse = await axios.get(forecastURL);

    // console.log(
    //   'weatherData:',
    //   response.data,
    //   'forecastData:',
    //   forecastResponse.data
    // );

    return { weatherData: response.data, forecastData: forecastResponse.data };
  } catch (error: any) {
    console.error('Error fetching weather data:', error);
    // console.log(error.message);
    return error;
  }
}
