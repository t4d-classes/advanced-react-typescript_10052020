import React, { useRef, useEffect } from 'react';
import { Scene, useBabylonScene } from 'react-babylonjs';
import {
  Vector3,
  Color3,
  Texture,
  AbstractMesh,
  ActionManager,
  ExecuteCodeAction,
} from '@babylonjs/core';

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

function App() {
  return (
    <Scene>
      <arcRotateCamera
        name="camera"
        alpha={-Math.PI / 2}
        beta={0}
        radius={10}
        target={Vector3.Zero()}
        keysLeft={[]}
        keysDown={[]}
        keysRight={[]}
        keysUp={[]}
      />
      {/* <hemisphericLight name="light1" direction={new Vector3(1, 1, 0)} />
      <pointLight name="light2" position={new Vector3(0, 1, -1)} /> */}
      <Sphere />
    </Scene>
  );
}

function Sphere() {
  const scene = useBabylonScene();
  const sphereRef = useRef<{ hostInstance: AbstractMesh } | null>(null);

  useEffect(() => {
    if (scene == null || sphereRef.current == null) {
      return;
    }

    const sphere = sphereRef.current.hostInstance;

    console.log(sphere);

    if (scene.actionManager == null) {
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

    scene.actionManager.registerAction(
      new ExecuteCodeAction(
        {
          trigger: ActionManager.OnKeyUpTrigger,
          parameter: String.fromCharCode(KEY_RIGHT_ARROW),
        },
        () => (sphere.position.x += 0.5),
      ),
    );

    scene.actionManager.registerAction(
      new ExecuteCodeAction(
        {
          trigger: ActionManager.OnKeyUpTrigger,
          parameter: String.fromCharCode(KEY_UP_ARROW),
        },
        () => (sphere.position.z += 0.5),
      ),
    );

    scene.actionManager.registerAction(
      new ExecuteCodeAction(
        {
          trigger: ActionManager.OnKeyUpTrigger,
          parameter: String.fromCharCode(KEY_DOWN_ARROW),
        },
        () => (sphere.position.z -= 0.5),
      ),
    );
  }, [scene]);

  return (
    <sphere name="sphere" diameter={2} ref={sphereRef}>
      <standardMaterial
        name="sphere-material"
        wireframe={true}
        emissiveColor={new Color3(0.0, 0.3, 0.0)}
        emissiveTexture={new Texture('/images/rope.jpg', scene)}>
        {/* <texture assignTo="emissiveTexture" url={'/images/rope.jpg'}></texture> */}
      </standardMaterial>
    </sphere>
  );
}

export default App;
