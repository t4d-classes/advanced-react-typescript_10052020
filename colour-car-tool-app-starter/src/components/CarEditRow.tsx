import React, { useState, ChangeEvent } from 'react';

import { Car } from '../models/car';
import { strToNaN, nanToStr } from '../utils';

type HTMLFormControls =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

export type CarEditRowProps = {
  car: Car;
  onSaveCar: (car: Car) => void;
  onCancelCar: () => void;
};

export function CarEditRow({ car, onSaveCar, onCancelCar }: CarEditRowProps) {
  const [carForm, setCarForm] = useState({
    make: car.make,
    model: car.model,
    year: car.year,
    colour: car.colour,
    price: car.price,
  });

  const change = ({
    target: { name, type, value },
  }: ChangeEvent<HTMLFormControls>) => {
    setCarForm({
      ...carForm,
      [name]: type === 'number' ? strToNaN(value) : value,
    });
  };

  const saveCar = () => {
    onSaveCar({
      ...carForm,
      id: car.id,
    });
  };

  return (
    <tr>
      <td>{car.id}</td>
      <td>
        <input type="text" name="make" value={carForm.make} onChange={change} />
      </td>
      <td>
        <input
          type="text"
          name="model"
          value={carForm.model}
          onChange={change}
        />
      </td>
      <td>
        <input
          type="number"
          name="year"
          value={nanToStr(carForm.year)}
          onChange={change}
        />
      </td>
      <td>
        <input
          type="text"
          name="colour"
          value={carForm.colour}
          onChange={change}
        />
      </td>
      <td>
        <input
          type="number"
          name="price"
          value={nanToStr(carForm.price)}
          onChange={change}
        />
      </td>
      <td>
        <button type="button" onClick={saveCar}>
          Save
        </button>
        <button type="button" onClick={onCancelCar}>
          Cancel
        </button>
      </td>
    </tr>
  );
}
