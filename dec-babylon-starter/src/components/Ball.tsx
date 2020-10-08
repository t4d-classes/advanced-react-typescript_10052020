import React, { useEffect, useRef } from 'react';
import { useBabylonScene, CreatedInstance } from 'react-babylonjs';
import {
  ActionManager,
  Vector3,
  ExecuteCodeAction,
  Color3,
  Texture,
  AbstractMesh,
} from '@babylonjs/core';

export type BallProps = {
  id: string;
  x: number;
  z: number;
};

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

export function Ball({ id, x, z }: BallProps) {
  const scene = useBabylonScene();
  const sphereRef = useRef<CreatedInstance<AbstractMesh> | null>(null);

  useEffect(() => {
    if (!scene || !sphereRef.current || !sphereRef.current.hostInstance) {
      return;
    }

    const sphere = sphereRef.current.hostInstance;

    if (!scene.actionManager) {
      scene.actionManager = new ActionManager(scene);
    }

    scene.actionManager.registerAction(
      new ExecuteCodeAction(
        {
          trigger: ActionManager.OnKeyUpTrigger,
          parameter: String.fromCharCode(KEY_LEFT_ARROW),
        },
        () => (sphere.position.x -= 0.5),
      ),
    );
  }, [scene]);

  return (
    <sphere
      ref={sphereRef}
      name={'ball-' + id}
      diameter={2}
      position={new Vector3(x, 0, z)}>
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
