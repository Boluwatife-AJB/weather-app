import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { WeatherDataProps } from '@/types';

interface CurrentWeatherProps {
  weatherData: WeatherDataProps | any;
  convertTemperature: (temperature: number) => {
    value: number;
    abbreviation: string;
  };
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  weatherData,
  convertTemperature,
}) => {
  const { temp, temp_min, temp_max } = weatherData.main;
  const { value: currentTemp, abbreviation: currentAbbreviation } =
    convertTemperature(temp);
  const { value: minTemp, abbreviation: minAbbreviation } =
    convertTemperature(temp_min);
  const { value: maxTemp, abbreviation: maxAbbreviation } =
    convertTemperature(temp_max);

  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/95 rounded-xl shadow-lg lg:px-6 px-4 py-8 mx-auto flex-grow w-full md:w-1/2 lg:w-1/2 transitionEase"
    >
      <h1 className="text-xl lg:text-3xl font-bold text-center mb-4">
        Current Weather Report
      </h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-between mb-4"
      >
        <div className="flex flex-col items-center">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-800">
            {`${weatherData.name}, ${weatherData.sys.country}`}
          </h2>
          <p className="text-gray-600">
            {new Date(weatherData.dt * 1000).toLocaleDateString()}
          </p>
        </div>
        <div className="flex-shrink-0">
          <Image
            src={`/svg/${weatherData.weather[0].icon}.svg`}
            width={120}
            height={120}
            alt={weatherData.weather[0].description}
          />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mb-5"
      >
        <p className="text-xl lg:text-3xl font-bold text-blue-800 capitalize mb-1">
          {weatherData.weather[0].description}
        </p>
        <p className="text-lg lg:text-2xl font-semibold text-gray-700">
          {Math.round(currentTemp)}
          {currentAbbreviation}
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 gap-3"
      >
        <WeatherCard
          title="Temperature Range"
          value={`${Math.round(minTemp)}${minAbbreviation} / ${Math.round(
            maxTemp
          )}${maxAbbreviation}`}
        />
        <WeatherCard
          title="Pressure"
          value={`${weatherData.main.pressure} hPa`}
        />
        <WeatherCard
          title="Humidity"
          value={`${weatherData.main.humidity} %`}
        />
        <WeatherCard title="Wind" value={`${weatherData.wind.speed} m/s`} />
      </motion.div>
    </motion.div>
  );
};

interface WeatherCardProps {
  title: string;
  value: string | number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ title, value }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="p-4 bg-gray-200 rounded-lg shadow-sm text-gray-800 hover:bg-blue-600 hover:text-white text-center"
    >
      <p className="text-base lg:text-lg font-medium ">{title}</p>
      <p className="text-base lg:text-lg font-semibold ">{value}</p>
    </motion.div>
  );
};

export default CurrentWeather;
