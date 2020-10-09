import {
  useEffect,
  RefObject,
  createRef,
  forwardRef,
  cloneElement,
} from 'react';

import { useBabylonScene, CreatedInstance } from 'react-babylonjs';
import {
  AbstractMesh,
  ActionManager,
  ExecuteCodeAction,
} from '@babylonjs/core';

export type AddExecuteCodeKeyActionProps = {
  children: JSX.Element;
  keyCode: number;
  onTrigger: (mesh: AbstractMesh) => void;
};

export const AddExecuteCodeKeyAction = forwardRef(
  function AddExecuteCodeKeyAction(
    { children, keyCode, onTrigger: trigger }: AddExecuteCodeKeyActionProps,
    ref: any,
  ) {
    const scene = useBabylonScene();

    let meshRef: RefObject<CreatedInstance<AbstractMesh> | null>;

    if (ref == null) {
      meshRef = createRef();
    } else {
      meshRef = ref;
    }

    useEffect(() => {
      if (!scene || meshRef.current == null) {
        return;
      }

      const mesh = meshRef.current.hostInstance;

      if (!scene.actionManager) {
        scene.actionManager = new ActionManager(scene);
      }

      const keyUpAction = scene.actionManager.registerAction(
        new ExecuteCodeAction(
          {
            trigger: ActionManager.OnKeyUpTrigger,
            parameter: String.fromCharCode(keyCode),
          },
          () => trigger(mesh!),
        ),
      );

      return () => {
        scene.actionManager.unregisterAction(keyUpAction!);
      };
    }, [scene, trigger, keyCode, meshRef]);

    return cloneElement(children, { ref: meshRef });
  },
);
