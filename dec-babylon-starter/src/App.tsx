import React from 'react';
import { Scene } from 'react-babylonjs';
import { Vector3 } from '@babylonjs/core';

export function App() {
  return (
    <Scene>
      <arcRotateCamera
        name="camera"
        alpha={Math.PI / 2}
        beta={Math.PI / 2}
        radius={2}
        target={new Vector3(0, 0, 5)}
      />
      <hemisphericLight name="light1" direction={new Vector3(1, 1, 0)} />
      <pointLight name="light2" position={new Vector3(0, 1, -1)} />
      <sphere name="sphere" diameter={2} />
    </Scene>
  );
}
