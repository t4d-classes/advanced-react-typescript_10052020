import React from 'react';
import ReactDOM from 'react-dom';

import { Colour } from './models/colour';
import { Car } from './models/car';
import { ColourTool } from './components/ColourTool';
import { CarTool } from './components/CarTool';
import { withListManager } from './components/ListManagerHOC';

const colourList: Colour[] = [
  { id: 1, name: 'pink', hexcode: 'ffc0cb' },
  { id: 2, name: 'blue', hexcode: '0000ff' },
  { id: 3, name: 'purple', hexcode: '800080' },
  { id: 4, name: 'cyan', hexcode: '00ffff' },
];

const carList: Car[] = [
  {
    id: 1,
    make: 'Ford',
    model: 'Fusion Hybrid',
    year: 2020,
    colour: 'blue',
    price: 45000,
  },
  {
    id: 2,
    make: 'Tesla',
    model: 'S',
    year: 2019,
    colour: 'red',
    price: 120000,
  },
];

const ColourToolLM = withListManager(ColourTool);

ReactDOM.render(
  <>
    {/*<ColourTool colours={colourList} />*/}
    <ColourToolLM items={colourList} />
    <CarTool cars={carList} />
  </>,
  document.querySelector('#root'),
);
