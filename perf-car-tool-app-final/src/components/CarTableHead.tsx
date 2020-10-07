import React, { memo } from 'react';
import { TableHead, TableRow, TableCell } from '@material-ui/core';

import { CarKeys } from '../models/Car';
import { CarsSort } from '../models/CarsSort';
import { CarTableColHeaders } from '../models/CarTableColHeaders';
import { ColHeader } from './ColHeader';

const colHeaders: CarTableColHeaders = [
  { id: 1, col: 'id', caption: 'Id' },
  { id: 2, col: 'make', caption: 'Make' },
  { id: 3, col: 'model', caption: 'Model' },
  { id: 4, col: 'year', caption: 'Year' },
  { id: 5, col: 'color', caption: 'Color' },
  { id: 6, col: 'price', caption: 'Price' },
];

export type CarTableHeadProps = {
  carsSort: CarsSort;
  onSortCars: (col: CarKeys) => void;
};

export function CarTableHead({
  carsSort,
  onSortCars: sortCars,
}: CarTableHeadProps) {
  return (
    <TableHead>
      <TableRow>
        {colHeaders.map((colHeader) => (
          <ColHeader
            key={colHeader.id}
            carsSort={carsSort}
            col={colHeader.col}
            caption={colHeader.caption}
            onClick={sortCars}
          />
        ))}
        <TableCell style={{ width: '16%' }}>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

export const CarTableHeadMemo = memo(CarTableHead);
