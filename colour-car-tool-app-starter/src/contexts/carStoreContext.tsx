import React, { createContext, useContext, useDebugValue } from 'react';

import { Car } from '../models/car';
import { CarStore } from '../models/carStore';
import { useCarStore } from '../hooks/useCarStore';

const carStoreContext = createContext({} as CarStore);

export type CarStoreProviderProps = {
  cars: Car[];
  children: JSX.Element;
};

export const CarStoreProvider = ({ children, cars }: CarStoreProviderProps) => {
  return (
    <carStoreContext.Provider value={useCarStore(cars)}>
      {children}
    </carStoreContext.Provider>
  );
};

export const useCarStoreContext = () => {
  useDebugValue('this is fun!');

  return useContext(carStoreContext);
};
