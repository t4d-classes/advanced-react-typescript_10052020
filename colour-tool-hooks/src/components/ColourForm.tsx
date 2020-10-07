import React, { useState, ChangeEvent, memo } from 'react';

import { NewColour } from '../models/colour';
import { strToNaN } from '../utils';

type HTMLFormControls =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

export type ColourFormProps = {
  buttonText: string;
  onSubmitColour: (colour: NewColour) => void;
};

const emptyColorForm = () => ({
  name: '',
  hexcode: '',
});

export function ColourForm(props: ColourFormProps) {
  performance.mark('colour form rendering');

  const [colourForm, setColourForm] = useState(emptyColorForm());

  const change = ({
    target: { name, type, value },
  }: ChangeEvent<HTMLFormControls>) => {
    setColourForm({
      ...colourForm,
      [name]: type === 'number' ? strToNaN(value) : value,
    });
  };

  const submitColour = () => {
    props.onSubmitColour({
      ...colourForm,
    });

    setColourForm(emptyColorForm());
  };

  return (
    <form>
      <div>
        <label htmlFor="colour-name-input">Colour Name:</label>
        <input
          type="text"
          id="colour-name-input"
          name="name"
          value={colourForm.name}
          onChange={change}
        />
      </div>
      <div>
        <label htmlFor="colour-hexcode-input">Colour Hexcode:</label>
        <input
          type="text"
          id="colour-hexcode-input"
          name="hexcode"
          value={colourForm.hexcode}
          onChange={change}
        />
      </div>
      <button type="button" onClick={submitColour}>
        {props.buttonText}
      </button>
    </form>
  );
}

export const ColourFormMemo = memo(ColourForm);
