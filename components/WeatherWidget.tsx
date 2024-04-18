'use client';

import {
  ForecastDataProps,
  RecentCitiesProps,
  WeatherDataProps,
} from '@/types';
import { fetchWeatherData } from '@/utils/weather';
import React, { useState } from 'react';
import CurrentWeather from './CurrentWeather';
import Error from './Error';
import Forecast from './Forecast';
import LoadingRing from './LoadingRing';
import TemperatureToggle from './TemperatureToggle';
import {
  TemperatureContext,
  TemperatureProvider,
} from '@/context/TemperatureContext';
import RecentCities from './RecentCities';
import { motion } from 'framer-motion';

const WeatherWidget = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherDataProps | any>(null);
  const [forecastData, setForecastData] = useState<ForecastDataProps[] | any>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentCities, setRecentCities] = useState<RecentCitiesProps[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const data = await fetchWeatherData(city);
    // FIXME: Improve the error handling process just use if/else
    if (data.message === 'Network Error') {
      setError('Please check your internet connection');
      setIsLoading(false);
      setWeatherData(null);
      setForecastData(null);
    } else if (data.message === 'Request failed with status code 404') {
      setError(data.response.data.message);
      setIsLoading(false);
      setWeatherData(null);
      setForecastData(null);
    } else {
      setWeatherData(data.weatherData);
      setForecastData(data.forecastData.list);
      setRecentCities((prevCities) => [
        {
          city,
          description: data.weatherData.weather[0].description,
          temperature: data.weatherData.main.temp,
          icon: data.weatherData.weather[0].icon,
        },
        ...prevCities.slice(0, 4),
      ]);
    }
    setIsLoading(false);
  };

  return (
    <TemperatureProvider>
      <TemperatureContext.Consumer>
        {({ toggleTemperature, isCelsius, convertTemperature }) => (
          <div className="container mx-auto p-4  transitionEase">
            <motion.div
              initial={{ opacity: 0, y: -200 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-between bg-gray-200/45 rounded-lg py-4 px-4 mb-8"
            >
              <h1 className="text-3xl sm:text-2xl text-slate-800 font-semibold mb-4 sm:mb-0">
                Weather App
              </h1>
              <form
                onSubmit={handleSubmit}
                className="flex w-full sm:w-auto lg:mb-0 mb-3"
              >
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city name"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500/15 w-full sm:w-auto"
                />
                <button
                  type="submit"
                  className="flex-shrink lg:px-4 px-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500/15 w-full"
                >
                  Get Weather
                </button>
              </form>
              <TemperatureToggle
                temperatureUnit={isCelsius ? 'celsius' : 'fahrenheit'}
                onToggle={toggleTemperature}
              />
            </motion.div>

            {isLoading && (
              <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-5 rounded-lg flex items-center gap-3">
                  <p>Fetching Weather Report...</p>
                  <LoadingRing />
                </div>
              </div>
            )}
            {error && !weatherData && <Error message={error} />}

            {/* {weatherData && (
              <div className="flex flex-col lg:flex-row lg:px-8 px-0 gap-8">
                <CurrentWeather
                  weatherData={weatherData}
                  convertTemperature={convertTemperature}
                />
                <Forecast
                  forecastData={forecastData}
                  convertTemperature={convertTemperature}
                />
              </div>
            )} */}

            {weatherData && (
              <div className="flex flex-col lg:flex-row lg:px-14 px-0 gap-8">
                <CurrentWeather
                  weatherData={weatherData}
                  convertTemperature={convertTemperature}
                />
                <RecentCities
                  cities={recentCities}
                  convertTemperature={convertTemperature}
                />
              </div>
            )}
          </div>
        )}
      </TemperatureContext.Consumer>
    </TemperatureProvider>
  );
};

export default WeatherWidget;
