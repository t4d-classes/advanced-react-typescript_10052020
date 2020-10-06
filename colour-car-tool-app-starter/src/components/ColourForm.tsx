import React from 'react';

import { NewColour } from '../models/colour';
import { useForm } from '../hooks/useForm';

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
  const [colourForm, change, resetColourForm] = useForm(emptyColorForm());

  const submitColour = () => {
    props.onSubmitColour({
      ...colourForm,
    });

    resetColourForm();
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
