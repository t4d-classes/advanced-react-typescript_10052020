import React, { useState } from 'react';

import { Engine } from 'react-babylonjs';

import { TheScene } from './components/TheScene';

export function App() {
  const [activeCamera, setActiveCamera] = useState('arcrotate');
  const [arcRotateRadius, setArcRotateRadius] = useState(10);

  return (
    <>
      <form>
        <fieldset>
          <button type="button" onClick={() => setActiveCamera('arcrotate')}>
            Arc Rotate Camera
          </button>
          <button type="button" onClick={() => setActiveCamera('universal')}>
            Universal Camera
          </button>
          <span>Active Camera: {activeCamera}</span>
          {activeCamera === 'arcrotate' && (
            <>
              <input
                type="range"
                value={arcRotateRadius}
                onChange={(e) => setArcRotateRadius(Number(e.target.value))}
                min={1}
                max={100}
              />
              <span>Arc Rotate Radius: {arcRotateRadius}</span>
            </>
          )}
        </fieldset>
      </form>
      <Engine canvasId="renderCanvas" antialias>
        <TheScene
          activeCamera={activeCamera}
          arcRotateRadius={arcRotateRadius}
        />
      </Engine>
    </>
  );
}
