import React, { useRef, useEffect } from 'react';
import { Scene, CreatedInstance } from 'react-babylonjs';
import {
  Vector3,
  ArcRotateCamera,
  UniversalCamera,
  Color3,
  SpotLight,
} from '@babylonjs/core';

export type TheSceneProps = {
  activeCamera?: string;
  arcRotateRadius?: number;
  enableLights: boolean[];
  lightIntensity: number[];
};

// const cameraAdded = (...params: any[]) => {
//   console.log('camera added', params);
// };
// const cameraRemoved = (...params: any[]) =>
//   console.log('camera removed', params);

// onNewCameraAddedObservable = { cameraAdded };
// onCameraRemovedObservable = { cameraRemoved };

export function TheScene(props: TheSceneProps) {
  const spotlightRef = useRef<CreatedInstance<SpotLight> | null>(null);

  useEffect(() => {
    if (spotlightRef.current && spotlightRef.current.hostInstance) {
      console.dir(spotlightRef);

      const spotlight = spotlightRef.current.hostInstance;

      spotlight.setEnabled(props.enableLights[0]);
      spotlight.intensity = props.lightIntensity[0] / 10;
    }
  }, [props.enableLights, props.lightIntensity]);

  // const cameraRef = useRef({} as any);

  // useEffect(() => {
  //   if (cameraRef.current) {
  //     console.log(cameraRef.current.hostInstance);

  //     console.log(cameraRef.current.hostInstance.radius);
  //     // very bad to do, the value assigned must come from some kind of state
  //     cameraRef.current.hostInstance.radius = 20;
  //   }
  // }, []);

  return (
    <Scene>
      {props.activeCamera === 'arcrotate' && (
        <arcRotateCamera
          name="camera"
          alpha={Math.PI / 2}
          beta={0}
          radius={props.arcRotateRadius!}
          target={new Vector3(0, 0, 0)}
        />
      )}
      {props.activeCamera === 'universal' && (
        <universalCamera name="camera" position={new Vector3(0, 0, -10)} />
      )}
      {/* <hemisphericLight name="light1" direction={new Vector3(0, 1, 0)} /> */}
      {/* <pointLight name="light2" position={new Vector3(0, 1, 3)} /> */}
      <spotLight
        ref={spotlightRef}
        name="light1"
        position={new Vector3(0, 5, 5)}
        direction={new Vector3(0, -5, -10)}
        angle={Math.PI}
        exponent={20}
        diffuse={new Color3(1, 0, 0)}
        intensity={1}
      />
      <spotLight
        name="light2"
        position={new Vector3(0, 5, -5)}
        direction={new Vector3(0, -5, 10)}
        angle={Math.PI}
        exponent={20}
        diffuse={new Color3(0, 1, 0)}
        setEnabled={props.enableLights[1]}
        intensity={props.lightIntensity[1] / 10}
      />
      {props.enableLights[2] && (
        <spotLight
          name="light3"
          position={new Vector3(-5, 5, 0)}
          direction={new Vector3(10, -5, 0)}
          angle={Math.PI}
          exponent={20}
          diffuse={new Color3(0, 0, 1)}
          intensity={props.lightIntensity[2] / 10}
        />
      )}
      {props.enableLights[3] && (
        <spotLight
          name="light4"
          position={new Vector3(5, 5, 0)}
          direction={new Vector3(-10, -5, 0)}
          angle={Math.PI}
          exponent={20}
          diffuse={new Color3(1, 0, 1)}
          intensity={props.lightIntensity[3] / 10}
        />
      )}
      <sphere name="sphere" diameter={2} position={new Vector3(4, 1, 4)} />
      <sphere name="sphere" diameter={2} position={new Vector3(4, 1, -4)} />
      <sphere name="sphere" diameter={2} position={new Vector3(-4, 1, -4)} />
      <sphere name="sphere" diameter={2} position={new Vector3(-4, 1, 4)} />
      <ground name="ground" width={20} height={20} />
    </Scene>
  );
}

TheScene.defaultProps = {
  activeCamera: 'arcrotate',
  arcRotateRadius: 2,
};
