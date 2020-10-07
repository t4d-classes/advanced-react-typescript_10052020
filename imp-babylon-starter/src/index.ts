import { Engine } from '@babylonjs/core';

import { createScene } from './app';

const canvas = document.querySelector('#renderCanvas') as HTMLCanvasElement;

const engine = new Engine(canvas, true);

const scene = createScene(engine, canvas);

engine.runRenderLoop(function renderLoop() {
  scene.render();
});

window.addEventListener('resize', function browserResize() {
  engine.resize();
});
