import React from 'react';
import ReactDOM from 'react-dom';
import { Engine } from 'react-babylonjs';

import { App } from './App';

ReactDOM.render(
  <Engine canvasId="renderCanvas" antialias>
    <App />
  </Engine>,
  document.querySelector('#root'),
);
