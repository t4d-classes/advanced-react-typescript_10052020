import React from 'react';
import { useBabylonScene } from 'react-babylonjs';
import { Vector3, Color3, Texture } from '@babylonjs/core';

import { AddExecuteCodeKeyAction } from './AddExecuteCodeKeyAction';

export type BallProps = {
  id: string;
  x: number;
  z: number;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
};

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

export function Ball({
  id,
  x,
  z,
  onMoveLeft: moveLeft,
  onMoveRight: moveRight,
  onMoveUp: moveUp,
  onMoveDown: moveDown,
}: BallProps) {
  return (
    <AddExecuteCodeKeyAction keyCode={KEY_UP_ARROW} onTrigger={moveUp}>
      <AddExecuteCodeKeyAction keyCode={KEY_DOWN_ARROW} onTrigger={moveDown}>
        <AddExecuteCodeKeyAction
          keyCode={KEY_RIGHT_ARROW}
          onTrigger={moveRight}>
          <AddExecuteCodeKeyAction
            keyCode={KEY_LEFT_ARROW}
            onTrigger={moveLeft}>
            <sphere
              name={'ball-' + id}
              diameter={2}
              position={new Vector3(x, 0, z)}>
              <SphereMaterial />
            </sphere>
          </AddExecuteCodeKeyAction>
        </AddExecuteCodeKeyAction>
      </AddExecuteCodeKeyAction>
    </AddExecuteCodeKeyAction>
  );
}

export function SphereMaterial() {
  const scene = useBabylonScene();

  return (
    <standardMaterial
      name="sphere-material"
      emissiveColor={new Color3(0, 0.3, 0)}
      emissiveTexture={new Texture('/images/rope.jpg', scene)}>
      {/* <texture assignTo="emissiveTexture" url={'/images/rope.jpg'} /> */}
    </standardMaterial>
  );
}
