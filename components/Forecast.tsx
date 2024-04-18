import { ForecastDataProps } from '@/types';
import Image from 'next/image';
import React from 'react';

interface ForecastProps {
  forecastData: ForecastDataProps[] | null;
  convertTemperature: (temperature: number) => {
    value: number;
    abbreviation: string;
  };
  
}

const Forecast: React.FC<ForecastProps> = ({
  forecastData,
  convertTemperature,
  
}) => {
  return (
    <>
      <ul className="w-full lg:w-1/2 flex flex-col bg-white rounded-lg shadow-md p-6 gap-4">
        <h1 className="text-2xl font-bold text-center mb-4 transitionEase">
          Weather Forecast
        </h1>
        {forecastData &&
          forecastData.map((forecast: ForecastDataProps, index: number) => (
            <li
              key={index}
              className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between gap-4 hover:bg-gray-200 transition-colors duration-200"
            >
              <div className="flex-shrink-0">
                <Image
                  src={`/svg/${forecast.weather[0].icon}.svg`}
                  width={60}
                  height={60}
                  alt="Weather Icon"
                />
              </div>
              <div className="flex-grow flex flex-col justify-center items-start">
                <h3 className="text-lg font-semibold text-gray-800 mb-1 capitalize">
                  {forecast.weather[0].description}
                </h3>
                <p className="text-gray-600">
                  Temperature:{' '}
                  <span className="font-semibold">
                    {Math.round(
                      convertTemperature(forecast.main.temp_min).value
                    )}
                    {convertTemperature(forecast.main.temp_min).abbreviation} /{' '}
                    {Math.round(
                      convertTemperature(forecast.main.temp_max).value
                    )}
                    {convertTemperature(forecast.main.temp_max).abbreviation}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-600 mb-1 text-sm">
                  {new Date(forecast.dt * 1000).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Forecast;
