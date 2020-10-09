import React, {
  useEffect,
  cloneElement,
  forwardRef,
  useState,
  RefObject,
  useDebugValue,
} from 'react';
import { Scene, useBabylonScene, SceneEventArgs } from 'react-babylonjs';
import {
  Vector3,
  Color3,
  AbstractMesh,
  ActionManager,
  ExecuteCodeAction,
  SetValueAction,
  PhysicsImpostor,
  FollowCamera,
} from '@babylonjs/core';
import { curry } from 'lodash';
import { CannonJSPlugin } from '@babylonjs/core/Physics/Plugins';
import * as CANNON from 'cannon';
window.CANNON = CANNON;

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const shiftMesh = curry(
  (axis: 'x' | 'y' | 'z', value: number, position: Vector3) => {
    const newPosition = position.clone();
    newPosition[axis] = newPosition[axis] + value;
    return newPosition;
  },
);

const shiftMeshLeft = shiftMesh('x', 0.5);
const shiftMeshRight = shiftMesh('x', -0.5);
const shiftMeshTop = shiftMesh('z', +0.5);
const shiftMeshBottom = shiftMesh('z', -0.5);

const gravityVector = new Vector3(0, -9.81, 0);

function App() {
  const [spherePosition, setSpherePosition] = useState(new Vector3(0, 1, 0));

  useDebugValue('hi!');

  const sceneMount = (sceneEvt: SceneEventArgs) => {
    sceneEvt.scene.onPointerDown = () => {
      console.log('clicked');
      const sphere = sceneEvt.scene.getMeshByName('sphere');
      if (sphere !== null) {
        sphere.physicsImpostor!.applyImpulse(
          Vector3.Left().scale(1),
          sphere.getAbsolutePosition(),
        );
      }
    };
  };

  return (
    <Scene enablePhysics={[gravityVector, new CannonJSPlugin()]}>
      <followCamera name="camera" position={new Vector3(0, 5, 0)} />
      <hemisphericLight name="light1" direction={new Vector3(1, 1, 0)} />
      {/* <pointLight name="light2" position={new Vector3(0, 1, -1)} /> */}
      <AddExecuteCodeKeyAction
        keyCode={KEY_UP_ARROW}
        fn={(sphere) =>
          sphere.physicsImpostor!.applyImpulse(
            Vector3.Forward().scale(5),
            sphere.getAbsolutePosition(),
          )
        }>
        <AddExecuteCodeKeyAction
          keyCode={KEY_DOWN_ARROW}
          fn={(sphere) =>
            sphere.physicsImpostor!.applyImpulse(
              Vector3.Backward().scale(5),
              sphere.getAbsolutePosition(),
            )
          }>
          <AddExecuteCodeKeyAction
            keyCode={KEY_RIGHT_ARROW}
            fn={(sphere) =>
              sphere.physicsImpostor!.applyImpulse(
                Vector3.Left().scale(5),
                sphere.getAbsolutePosition(),
              )
            }>
            <AddExecuteCodeKeyAction
              keyCode={KEY_LEFT_ARROW}
              fn={(sphere) =>
                sphere.physicsImpostor!.applyImpulse(
                  Vector3.Right().scale(5),
                  sphere.getAbsolutePosition(),
                )
              }>
              <Sphere position={spherePosition} />
            </AddExecuteCodeKeyAction>
          </AddExecuteCodeKeyAction>
        </AddExecuteCodeKeyAction>
      </AddExecuteCodeKeyAction>

      <ground name="ground1" width={100} height={100}>
        <physicsImpostor
          type={PhysicsImpostor.BoxImpostor}
          _options={{ mass: 0, restitution: 0.9 }}
        />
      </ground>
    </Scene>
  );
}

export type AddExecuteCodeKeyActionProps = {
  children: JSX.Element;
  keyCode: number;
  fn: (mesh: AbstractMesh) => void;
};

const AddExecuteCodeKeyAction = forwardRef(function AddExecuteCodeKeyAction(
  { children, keyCode, fn }: AddExecuteCodeKeyActionProps,
  ref: any,
) {
  const scene = useBabylonScene();

  let meshRef: RefObject<{ hostInstance: AbstractMesh } | null>;

  if (ref == null) {
    meshRef = React.createRef();
  } else {
    meshRef = ref;
  }

  useEffect(() => {
    if (scene == null || meshRef.current == null) {
      return;
    }

    const mesh = meshRef.current.hostInstance as AbstractMesh;

    if (scene.actionManager == null) {
      scene.actionManager = new ActionManager(scene);
    }

    const action = scene.actionManager.registerAction(
      new ExecuteCodeAction(
        {
          trigger: ActionManager.OnKeyUpTrigger,
          parameter: String.fromCharCode(keyCode),
        },
        () => fn(mesh),
      ),
    );

    return () => {
      if (action != null) {
        scene.actionManager.unregisterAction(action);
      }
    };
  });

  return cloneElement(children, { ref: meshRef });
});

AddExecuteCodeKeyAction.displayName = 'AddExecuteCodeKeyAction';

export type AddSetValuePickActionProps = {
  children: JSX.Element;
  propName: string;
  value: any;
};

const AddSetValuePickAction = forwardRef(function AddSetValuePickAction(
  { children, propName, value }: AddSetValuePickActionProps,
  ref: any,
) {
  const scene = useBabylonScene();

  let meshRef: RefObject<{ hostInstance: AbstractMesh } | null>;

  if (ref == null) {
    meshRef = React.createRef();
  } else {
    meshRef = ref;
  }

  useEffect(() => {
    if (scene == null || meshRef.current == null) {
      return;
    }

    const mesh = meshRef.current.hostInstance as AbstractMesh;

    if (mesh.actionManager == null) {
      mesh.actionManager = new ActionManager(scene);
    }

    const action = mesh.actionManager.registerAction(
      new SetValueAction(
        {
          trigger: ActionManager.OnPickTrigger,
          parameter: mesh,
        },
        mesh,
        propName,
        value,
      ),
    );

    console.log(action);

    return () => {
      if (action != null) {
        mesh.actionManager!.unregisterAction(action);
      }
    };
  });

  return cloneElement(children, { ref: meshRef });
});

AddSetValuePickAction.displayName = 'AddSetValuePickAction';

export type SphereProps = {
  position: Vector3;
};

const Sphere = forwardRef((props: SphereProps, sphereRef: any) => {
  console.log('sphere update:', props.position);

  const scene = useBabylonScene();

  useEffect(() => {
    if (!scene || !sphereRef.current) {
      return;
    }

    console.log('set locked target');

    const camera = scene?.getCameraByName('camera') as FollowCamera;
    camera.lockedTarget = sphereRef.current.hostInstance;
  }, [scene, sphereRef]);

  return (
    <sphere
      name="sphere"
      diameter={2}
      ref={sphereRef}
      position={props.position}>
      <physicsImpostor
        type={PhysicsImpostor.SphereImpostor}
        _options={{ mass: 1, restitution: 0.9 }}
      />
      <standardMaterial
        name="sphere-material"
        wireframe={false}
        diffuseColor={new Color3(0.0, 0.3, 0.0)}>
        <texture assignTo="emissiveTexture" url={'/images/rope.jpg'}></texture>
      </standardMaterial>
    </sphere>
  );
});

export default App;

// emissiveColor={new Color3(0.0, 0.3, 0.0)}
