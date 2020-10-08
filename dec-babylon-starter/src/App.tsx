import React, { useState } from 'react';

import { Engine } from 'react-babylonjs';

import { TheScene } from './components/TheScene';

const toggleLight = (lights: boolean[], index: number) => {
  const newLights = [...lights];
  newLights[index] = !newLights[index];
  return newLights;
};

const updateLightIntensity = (
  lightIntensity: number[],
  index: number,
  value: number,
) => {
  const newLightIntensity = [...lightIntensity];
  newLightIntensity[index] = value;
  return newLightIntensity;
};

export function App() {
  const [activeCamera, setActiveCamera] = useState('arcrotate');
  const [arcRotateRadius, setArcRotateRadius] = useState(10);

  const [enableLights, setEnableLights] = useState([true, true, true, true]);
  const [lightIntensity, setLightIntensity] = useState([10, 10, 10, 10]);

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
        <fieldset>
          <button
            type="button"
            onClick={() => setEnableLights(toggleLight(enableLights, 0))}>
            Spotlight 0
          </button>
          <button
            type="button"
            onClick={() => setEnableLights(toggleLight(enableLights, 1))}>
            Spotlight 1
          </button>
          <button
            type="button"
            onClick={() => setEnableLights(toggleLight(enableLights, 2))}>
            Spotlight 2
          </button>
          <button
            type="button"
            onClick={() => setEnableLights(toggleLight(enableLights, 3))}>
            Spotlight 3
          </button>
        </fieldset>
        <fieldset>
          <input
            type="range"
            value={lightIntensity[0]}
            onChange={(e) =>
              setLightIntensity(
                updateLightIntensity(lightIntensity, 0, Number(e.target.value)),
              )
            }
            min={0}
            max={30}
          />
          <input
            type="range"
            value={lightIntensity[1]}
            onChange={(e) =>
              setLightIntensity(
                updateLightIntensity(lightIntensity, 1, Number(e.target.value)),
              )
            }
            min={0}
            max={30}
          />
          <input
            type="range"
            value={lightIntensity[2]}
            onChange={(e) =>
              setLightIntensity(
                updateLightIntensity(lightIntensity, 2, Number(e.target.value)),
              )
            }
            min={0}
            max={30}
          />
          <input
            type="range"
            value={lightIntensity[3]}
            onChange={(e) =>
              setLightIntensity(
                updateLightIntensity(lightIntensity, 3, Number(e.target.value)),
              )
            }
            min={0}
            max={30}
          />
        </fieldset>
      </form>
      <Engine canvasId="renderCanvas" antialias>
        <TheScene
          activeCamera={activeCamera}
          arcRotateRadius={arcRotateRadius}
          enableLights={enableLights}
          lightIntensity={lightIntensity}
        />
      </Engine>
    </>
  );
}
