import { useState } from 'react';

import { Car, NewCar } from '../models/car';

export type AppendCar = (car: NewCar) => void;

export type ReplaceCar = (car: Car) => void;

export type RemoveCar = (carId: number) => void;

export type UseCarList = (
  initialCars: Car[],
) => [Car[], AppendCar, ReplaceCar, RemoveCar];

export const useCarList: UseCarList = (initialCars) => {
  const [cars, setCars] = useState(initialCars);

  const appendCar: AppendCar = (newCar: NewCar) => {
    setCars([
      ...cars,
      {
        ...newCar,
        id: Math.max(...cars.map((c) => c.id), 0) + 1,
      },
    ]);
  };

  const replaceCar: ReplaceCar = (car: Car) => {
    const carIndex = cars.findIndex((c) => c.id === car.id);
    const newCars = cars.concat();
    newCars[carIndex] = car;
    setCars(newCars);
  };

  const removeCar: RemoveCar = (carId: number) => {
    setCars(cars.filter((c) => c.id !== carId));
  };

  return [cars, appendCar, replaceCar, removeCar];
};
