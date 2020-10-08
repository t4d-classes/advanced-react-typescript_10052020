import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, PointLight, MeshBuilder } from '@babylonjs/core';

export const createScene = (engine: Engine, canvas: HTMLCanvasElement) => {
  const scene = new Scene(engine);
  console.dir(scene);

  const camera = new ArcRotateCamera(
    'camera',
    Math.PI / 2,
    Math.PI / 2,
    2,
    new Vector3(0, 0, 5),
    scene,
  );

  camera.attachControl(canvas, true);

  new HemisphericLight('light1', new Vector3(1,1,0), scene);
  new PointLight('light2', new Vector3(0,1,-1), scene);

  MeshBuilder.CreateSphere('sphere', { diameter: 2 }, scene);

  return scene;

};
