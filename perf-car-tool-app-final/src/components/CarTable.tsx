import React, { memo } from 'react';
import {
  TableContainer,
  Table,
  TableBody,
  Typography,
} from '@material-ui/core';

import { Car } from '../models/Car';
import { CarsSort } from '../models/CarsSort';

import { CarEditRow } from './CarEditRow';
import { CarViewRowMemo as CarViewRow } from './CarViewRow';
import { CarTableHeadMemo as CarTableHead } from './CarTableHead';

export type CarTableProps = {
  cars: Car[];
  editCarId: number;
  carsSort: CarsSort;
  onEditCar: (carId: number) => void;
  onDeleteCar: (carId: number) => void;
  onSaveCar: (car: Car) => void;
  onCancelCar: () => void;
  onSortCars: (col: keyof Car) => void;
};

export function CarTable({
  cars,
  editCarId,
  carsSort,
  onEditCar: editCar,
  onDeleteCar: deleteCar,
  onSaveCar: saveCar,
  onCancelCar: cancelCar,
  onSortCars: sortCars,
}: CarTableProps) {
  return (
    <TableContainer>
      <header>
        <Typography variant="h2">Car Table</Typography>
      </header>
      <Table>
        <CarTableHead carsSort={carsSort} onSortCars={sortCars} />
        <TableBody>
          {cars.map((car) =>
            car.id === editCarId ? (
              <CarEditRow
                key={car.id}
                car={car}
                onSaveCar={saveCar}
                onCancelCar={cancelCar}
              />
            ) : (
              <CarViewRow
                key={car.id}
                car={car}
                onEditCar={editCar}
                onDeleteCar={deleteCar}
              />
            ),
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export const CarTableMemo = memo(CarTable);
