import React from 'react';

interface TemperatureToggleProps {
  temperatureUnit: 'celsius' | 'fahrenheit';
  onToggle: () => void;
}

const TemperatureToggle: React.FC<TemperatureToggleProps> = ({
  temperatureUnit,
  onToggle,
}) => {
  return (
    <div className="flex items-center">
      <span className="mr-2 text-gray-800">Temperature Unit:</span>
      <div
        className={`relative inline-block w-12 h-6 rounded-full cursor-pointer transition-colors ${
          temperatureUnit === 'celsius' ? 'bg-blue-500' : 'bg-gray-400'
        }`}
        onClick={onToggle}
      >
        <span
          className={`absolute inline-block mt-1 w-4 h-4 rounded-full bg-white transition-transform ${
            temperatureUnit === 'celsius' ? 'translate-x-1' : 'translate-x-7'
          }`}
        />
      </div>
      <span className="ml-2 text-base  font-semibold">
        {temperatureUnit === 'celsius' ? '°C' : '°F'}
      </span>
    </div>
  );
};

export default TemperatureToggle;
