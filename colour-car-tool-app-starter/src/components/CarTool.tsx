import React, { useMemo, useRef } from 'react';

import { Car, CarsOrder, ORDER_ASC } from '../models/car';

import { useCarStoreContext } from '../contexts/carStoreContext';
import { ToolHeader } from './ToolHeader';
import { CarTable } from './CarTable';
import { CarForm } from './CarForm';

// pure function
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
  const lastSortCarsRef = useRef([] as Car[]);
  const deleteCarIdRef = useRef(-1);

  console.log('render CarTool, deleteCarIdRef: ', deleteCarIdRef.current);

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

  const sortedCars = useMemo(() => {
    if (deleteCarIdRef.current > 0) {
      console.log('skipping sort, row was deleted');

      const carIndex = lastSortCarsRef.current.findIndex(
        (c) => c.id === deleteCarIdRef.current,
      );

      lastSortCarsRef.current = [...lastSortCarsRef.current];
      lastSortCarsRef.current.splice(carIndex, 1);

      deleteCarIdRef.current = -1;
      return lastSortCarsRef.current;
    } else {
      console.log('new cars or new carsOrder, do the sort');
      lastSortCarsRef.current = orderCars(cars, carsOrder);
      return lastSortCarsRef.current;
    }
  }, [cars, carsOrder]);

  const optimizeDeleteCar = (carId: number) => {
    deleteCarIdRef.current = carId;
    deleteCar(carId);
  };

  return (
    <>
      <ToolHeader headerText="Car Tool" />
      <CarTable
        cars={sortedCars}
        editCarId={editCarId}
        carsOrder={carsOrder}
        onEditCar={editCar}
        onDeleteCar={optimizeDeleteCar}
        onSaveCar={saveCar}
        onCancelCar={cancelCar}
        onSortCars={sortCars}
      />
      <CarForm buttonText="Add Car" onSubmitCar={addCar} />
    </>
  );
}
