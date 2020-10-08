import React from 'react';
import { Scene, useBabylonScene } from 'react-babylonjs';
import { Vector3, Color3, Texture } from '@babylonjs/core';

export function TheScene() {
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
      <Sphere />

      <box
        name="box"
        height={4}
        width={6}
        depth={3}
        position={new Vector3(-4, 6, 2)}
        rotation={new Vector3(Math.PI / 4, Math.PI / 6, 0)}></box>

      <ground name="ground" width={20} height={20} />
    </Scene>
  );
}

function Sphere() {
  return (
    <sphere name="sphere" diameter={2} position={new Vector3(0, 1, 0)}>
      <SphereMaterial />
    </sphere>
  );
}

function SphereMaterial() {
  const scene = useBabylonScene();

  return (
    <standardMaterial
      name="sphere-material"
      diffuseColor={new Color3(0.5, 0.5, 0)}
      diffuseTexture={new Texture('/images/rope.jpg', scene)}>
      {/* <texture assignTo="emissiveTexture" url={'/images/rope.jpg'} /> */}
    </standardMaterial>
  );
}
