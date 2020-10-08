import React from 'react';
import { Vector3, Color3 } from '@babylonjs/core/Maths/math';

import { PoleSphere } from './PoleSphere';

export type PoleProps = {
  id: string;
  x: number;
  z: number;
};

export function Pole({ id, x, z }: PoleProps) {
  return (
    <>
      <box
        name={'box_sphere-box_material-' + id}
        height={1}
        width={2}
        depth={2}
        position={new Vector3(x, 0.5, z)}
        rotation={new Vector3(Math.PI / 2, 0, 0)}
        checkCollisions>
        <standardMaterial
          name={'box_sphere-box_material-' + id}
          emissiveColor={new Color3(1, 0.7, 0.2)}>
          <texture assignTo="emissiveTexture" url="/images/bricks.webp" />
        </standardMaterial>
      </box>
      <PoleSphere id={'_top-' + id} x={x} y={2} z={z} />
      <PoleSphere id={'_bottom-' + id} x={x} y={-1} z={z} />
    </>
  );
}
