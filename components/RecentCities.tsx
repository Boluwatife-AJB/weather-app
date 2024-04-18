import { RecentCitiesProps } from '@/types';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

interface RecentCitiesComponentProps {
  cities: RecentCitiesProps[];
  convertTemperature: (temperature: number) => {
    value: number;
    abbreviation: string;
  };
}

const RecentCities: React.FC<RecentCitiesComponentProps> = ({
  cities,
  convertTemperature,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full lg:w-1/2 bg-white/95 p-6 rounded-xl"
    >
      <h1 className="text-xl lg:text-3xl font-bold text-center mb-4">
        Recent Searches
      </h1>
      <ul className="grid lg:grid-cols-2 grid-cols-1  gap-4">
        {cities.map((city, index) => {
          const { value, abbreviation } = convertTemperature(city.temperature);
          return (
            <motion.li
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              className="hover:bg-slate-400/80 rounded-lg bg-gray-200 transition-colors duration-200 shadow-md p-4 flex items-center gap-4"
            >
              <div className="flex-shrink-0">
                <Image
                  src={`/svg/${city.icon}.svg`}
                  width={60}
                  height={60}
                  alt="weather-icon"
                />
              </div>
              <div className="flex-grow text-end">
                <h3 className="font-semibold">{city.city}</h3>
                <p className="capitalize">{city.description}</p>
                <p className="text-gray-700">
                  {Math.round(value)}
                  {abbreviation}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default RecentCities;
