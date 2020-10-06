import { useState } from 'react';

import {
  Car,
  CarsOrder,
  ORDER_ASC,
  NewCar,
  CarKeys,
  ORDER_DESC,
} from '../models/car';
import { CarStore } from '../models/carStore';
import { useList } from '../hooks/useList';

export type UseCarStore = (initialCars: Car[]) => CarStore;

export const useCarStore = (initialCars: Car[]) => {
  const [cars, appendCar, replaceCar, removeCar] = useList<Car>(initialCars);
  const [carsOrder, setCarsOrder] = useState<CarsOrder>({
    column: 'id',
    direction: ORDER_ASC,
  });
  const [editCarId, setEditCarId] = useState(-1);

  const addCar = (newCar: NewCar) => {
    appendCar(newCar);
    setEditCarId(-1);
  };

  const saveCar = (car: Car) => {
    replaceCar(car);
    setEditCarId(-1);
  };

  const deleteCar = (carId: number) => {
    removeCar(carId);
    setEditCarId(-1);
  };

  const cancelCar = () => {
    setEditCarId(-1);
  };

  const sortCars = (column: CarKeys) => {
    setCarsOrder({
      column,
      direction:
        column !== carsOrder.column
          ? ORDER_ASC
          : carsOrder.direction === ORDER_DESC
          ? ORDER_ASC
          : ORDER_DESC,
    });
  };

  const editCar = (carId: number) => {
    setEditCarId(carId);
  };

  return {
    cars,
    editCarId,
    carsOrder,
    addCar,
    saveCar,
    deleteCar,
    editCar,
    cancelCar,
    sortCars,
  };
};
