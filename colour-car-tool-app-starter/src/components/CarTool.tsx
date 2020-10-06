import React from 'react';

import { Car, CarsOrder, ORDER_ASC } from '../models/car';

import { useCarStoreContext } from '../contexts/carStoreContext';
import { ToolHeader } from './ToolHeader';
import { CarTable } from './CarTable';
import { CarForm } from './CarForm';

export const orderCars = (cars: Car[], carsOrder: CarsOrder) => {
  return cars.concat().sort((a: Car, b: Car) => {
    const left = String(a[carsOrder.column]).toUpperCase();
    const right = String(b[carsOrder.column]).toUpperCase();

    if (left < right) {
      return carsOrder.direction === ORDER_ASC ? -1 : 1;
    } else if (left > right) {
      return carsOrder.direction === ORDER_ASC ? 1 : -1;
    } else {
      return 0;
    }
  });
};

export interface CarToolProps {}

export function CarTool(props: CarToolProps) {
  const {
    cars,
    editCarId,
    carsOrder,
    addCar,
    saveCar,
    deleteCar,
    editCar,
    cancelCar,
    sortCars,
  } = useCarStoreContext();

  return (
    <>
      <ToolHeader headerText="Car Tool" />
      <CarTable
        cars={orderCars(cars, carsOrder)}
        editCarId={editCarId}
        carsOrder={carsOrder}
        onEditCar={editCar}
        onDeleteCar={deleteCar}
        onSaveCar={saveCar}
        onCancelCar={cancelCar}
        onSortCars={sortCars}
      />
      <CarForm buttonText="Add Car" onSubmitCar={addCar} />
    </>
  );
}
