import React from 'react';
import ReactDOM from 'react-dom';
import { Engine } from 'react-babylonjs';

import App from './App';

ReactDOM.render(
  <Engine antialias canvasId="renderCanvas">
    <App />
  </Engine>,
  document.getElementById('root'),
);
