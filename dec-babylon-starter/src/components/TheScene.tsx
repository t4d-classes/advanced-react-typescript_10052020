import React from 'react';
import { Scene } from 'react-babylonjs';
import { Vector3 } from '@babylonjs/core';

import { useBallPosition } from '../hooks/useBallPosition';
import { Ball } from './Ball';
import { Pole } from './Pole';

export function TheScene() {
  const [
    ballPosition,
    onMoveLeft,
    onMoveRight,
    onMoveUp,
    onMoveDown,
  ] = useBallPosition(new Vector3(0, 0, 20));

  return (
    <Scene>
      <arcRotateCamera
        name="camera"
        alpha={Math.PI}
        beta={0}
        radius={50}
        target={new Vector3(0, 0, 8)}
        keysUp={[]}
        keysDown={[]}
        keysLeft={[]}
        keysRight={[]}
      />
      {/* <hemisphericLight name="light1" direction={new Vector3(1, 1, 0)} /> */}
      {/* <pointLight name="light2" position={new Vector3(0, 1, -1)} /> */}

      <Pole id="1" x={-8} z={0} />
      <Pole id="2" x={8} z={0} />
      <Pole id="3" x={0} z={-8} />
      <Pole id="4" x={0} z={8} />

      <Ball
        id="1"
        x={ballPosition.x}
        z={ballPosition.z}
        onMoveLeft={onMoveLeft}
        onMoveRight={onMoveRight}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
      />
    </Scene>
  );
}
