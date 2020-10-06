import { Car, CarsOrder, NewCar, CarKeys } from './car';

export type CarStoreState = {
  cars: Car[];
  editCarId: number;
  carsOrder: CarsOrder;
};

export type CarStoreActions = {
  addCar: (car: NewCar) => void;
  saveCar: (car: Car) => void;
  deleteCar: (carId: number) => void;
  editCar: (carId: number) => void;
  cancelCar: () => void;
  sortCars: (column: CarKeys) => void;
};

export type CarStore = CarStoreState & CarStoreActions;
