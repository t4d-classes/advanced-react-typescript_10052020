import React, { Component } from 'react';

import { Colour, NewColour } from '../models/colour';

import { ToolHeader } from './ToolHeader';
import { ItemList } from './ItemList';
import { ColourForm } from './ColourForm';

export type ColourToolProps = {
  colours: Colour[];
};

export type ColourToolState = {
  colours: Colour[];
};

export class ColourTool extends Component<ColourToolProps, ColourToolState> {
  // initialize the state on the instance
  state = {
    colours: [...this.props.colours],
  };

  // class arrow function to preserve the binding of this
  // related to the idea of call-site this
  addColour = (newColour: NewColour) => {
    this.setState({
      colours: [
        ...this.state.colours,
        {
          ...newColour,
          id: Math.max(...this.state.colours.map((c) => c.id), 0) + 1,
        },
      ],
    });
  };

  render() {
    return (
      <>
        <ToolHeader headerText="Colour Tool" />
        <ItemList
          items={this.state.colours}
          keyFn={(item) => item.id}
          contentFn={(item) => item.name + ' ' + item.hexcode}
        />
        <ColourForm buttonText="Add Colour" onSubmitColour={this.addColour} />
      </>
    );
  }
}
