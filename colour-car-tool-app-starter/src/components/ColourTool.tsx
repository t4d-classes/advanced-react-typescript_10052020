import React from 'react';

import { Colour, NewColour } from '../models/colour';

import { ToolHeader } from './ToolHeader';
import { ItemList } from './ItemList';
import { ColourForm } from './ColourForm';

export type ColourToolProps = {
  items: Colour[];
  onAppendItem: (newColour: NewColour) => void;
};

export function ColourTool(props: ColourToolProps) {
  return (
    <>
      <ToolHeader headerText="Colour Tool" />
      <ItemList
        items={props.items}
        keyFn={(item) => item.id}
        contentFn={(item) => item.name + ' ' + item.hexcode}
      />
      <ColourForm buttonText="Add Colour" onSubmitColour={props.onAppendItem} />
    </>
  );
}
