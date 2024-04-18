import React, { createContext, ReactNode, useState } from 'react';

interface TemperatureContextProps {
  children: ReactNode;
}

interface TemperatureContextValue {
  convertTemperature: (temperature: number) => {
    value: number;
    abbreviation: string;
  };
  isCelsius: boolean;
  toggleTemperature: () => void;
}

export const TemperatureContext = createContext<TemperatureContextValue>({
  convertTemperature: () => ({ value: 0, abbreviation: '°C' }),
  isCelsius: true,
  toggleTemperature: () => {},
});

export const TemperatureProvider: React.FC<TemperatureContextProps> = ({
  children,
}) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const convertTemperature = (temperature: number) => {
    const fahrenheit = (temperature * 9) / 5 + 32;
    const abbreviation = isCelsius ? '°C' : '°F';
    return { value: isCelsius ? temperature : fahrenheit, abbreviation };
  };

  const toggleTemperature = () => {
    setIsCelsius((prevState) => !prevState);
  };

  const value = {
    convertTemperature,
    isCelsius,
    toggleTemperature,
  };

  return (
    <TemperatureContext.Provider value={value}>
      {children}
    </TemperatureContext.Provider>
  );
};
