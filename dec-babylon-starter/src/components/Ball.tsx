import React from 'react';
import { useBabylonScene } from 'react-babylonjs';
import { Vector3, Color3, Texture } from '@babylonjs/core';

export type BallProps = {
  id: string;
  x: number;
  z: number;
};

export function Ball({ id, x, z }: BallProps) {
  return (
    <sphere name={'ball-' + id} diameter={2} position={new Vector3(x, 0, z)}>
      <SphereMaterial />
    </sphere>
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
