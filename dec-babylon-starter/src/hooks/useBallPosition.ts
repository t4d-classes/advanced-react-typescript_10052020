import { useReducer, useMemo } from 'react';
import { Vector3 } from '@babylonjs/core';

const MOVE_LEFT_ACTION = 'MOVE_LEFT';
const MOVE_RIGHT_ACTION = 'MOVE_RIGHT';
const MOVE_UP_ACTION = 'MOVE_UP';
const MOVE_DOWN_ACTION = 'MOVE_DOWN';

type MoveAction = { type: string };

const moveBall = (axis: 'x' | 'z', value: number, currentPosition: Vector3) => {
  const newPosition = currentPosition.clone();
  newPosition[axis] = newPosition[axis] + value;
  return newPosition;
};

function ballPositionReducer(state: Vector3, action: MoveAction) {
  switch (action.type) {
    case MOVE_LEFT_ACTION:
      return moveBall('x', -0.5, state);
    case MOVE_RIGHT_ACTION:
      return moveBall('x', 0.5, state);
    case MOVE_UP_ACTION:
      return moveBall('z', 0.5, state);
    case MOVE_DOWN_ACTION:
      return moveBall('z', -0.5, state);
    default:
      return state;
  }
}

export type UseBallPosition = (
  initialPosition: Vector3,
) => [Vector3, () => void, () => void, () => void, () => void];

export const useBallPosition: UseBallPosition = (initialPosition: Vector3) => {
  const [ballPosition, dispatch] = useReducer(
    ballPositionReducer,
    initialPosition,
  );

  return useMemo(
    () => [
      ballPosition,
      () => dispatch({ type: MOVE_LEFT_ACTION }),
      () => dispatch({ type: MOVE_RIGHT_ACTION }),
      () => dispatch({ type: MOVE_UP_ACTION }),
      () => dispatch({ type: MOVE_DOWN_ACTION }),
    ],
    [ballPosition],
  );
};
