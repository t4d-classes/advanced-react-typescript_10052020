import React from 'react';

import { Engine } from 'react-babylonjs';

import { TheScene } from './components/TheScene';

export function App() {
  return (
    <Engine canvasId="renderCanvas" antialias>
      <TheScene />
    </Engine>
  );
}
