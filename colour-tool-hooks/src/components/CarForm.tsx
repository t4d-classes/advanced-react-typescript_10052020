import React, { useState, ChangeEvent } from 'react';

import { NewCar } from '../models/car';
import { strToNaN, nanToStr } from '../utils';

type HTMLFormControls =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

export type CarFormProps = {
  buttonText?: string;
  onSubmitCar: (car: NewCar) => void;
};

const emptyCarForm = () => ({
  make: '',
  model: '',
  year: NaN,
  colour: '',
  price: NaN,
});

export function CarForm({ buttonText, onSubmitCar }: CarFormProps) {
  const [carForm, setCarForm] = useState(emptyCarForm());

  const change = ({
    target: { name, type, value },
  }: ChangeEvent<HTMLFormControls>) => {
    setCarForm({
      ...carForm,
      [name]: type === 'number' ? strToNaN(value) : value,
    });
  };

  const submitCar = () => {
    onSubmitCar({ ...carForm });

    setCarForm(emptyCarForm());
  };

  return (
    <form>
      <div>
        <label htmlFor="make-input">Make:</label>
        <input
          type="text"
          id="make-input"
          name="make"
          value={carForm.make}
          onChange={change}
        />
      </div>
      <div>
        <label htmlFor="model-input">Model:</label>
        <input
          type="text"
          id="model-input"
          name="model"
          value={carForm.model}
          onChange={change}
        />
      </div>
      <div>
        <label htmlFor="year-input">Year:</label>
        <input
          type="number"
          id="year-input"
          name="year"
          value={nanToStr(carForm.year)}
          onChange={change}
        />
      </div>
      <div>
        <label htmlFor="colour-input">Colour:</label>
        <input
          type="text"
          id="colour-input"
          name="colour"
          value={carForm.colour}
          onChange={change}
        />
      </div>
      <div>
        <label htmlFor="price-input">Price:</label>
        <input
          type="number"
          id="price-input"
          name="price"
          value={nanToStr(carForm.price)}
          onChange={change}
        />
      </div>
      <button type="button" onClick={submitCar}>
        {buttonText}
      </button>
    </form>
  );
}

CarForm.defaultProps = {
  buttonText: 'Submit Colour',
};
