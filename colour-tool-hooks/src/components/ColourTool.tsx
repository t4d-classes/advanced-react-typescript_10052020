import React, { useState, useCallback, useLayoutEffect } from 'react';

import { Colour, NewColour } from '../models/colour';

import { ToolHeader } from './ToolHeader';
import { ItemList } from './ItemList';
import { ColourFormMemo as ColourForm } from './ColourForm';

export type ColourToolProps = {
  colours: Colour[];
};

export function ColourTool(props: ColourToolProps) {
  const [colours, setColours] = useState([...props.colours]);
  const [someInput, setSomeInput] = useState('');

  const addColour = useCallback(
    (newColour: NewColour) => {
      setColours([
        ...colours,
        {
          ...newColour,
          id: Math.max(...colours.map((c) => c.id), 0) + 1,
        },
      ]);
    },
    [colours],
  );

  useLayoutEffect(function colourToolEffect() {

    // setup
    console.log('component mounted');

    setSomeInput('test');

    return () => {
      // teardown

    };
  }, [colours]);

  return (
    <>
      <input
        type="text"
        value={someInput}
        onChange={(e) => setSomeInput(e.target.value)}
      />
      <ToolHeader headerText="Color Tool" />
      <ItemList
        items={colours}
        keyFn={useCallback((c: Colour) => c.id, [])}
        contentFn={useCallback((c: Colour) => c.name + ' ' + c.hexcode, [])}
      />
      <ColourForm buttonText="Add Colour" onSubmitColour={addColour} />
    </>
  );
}
