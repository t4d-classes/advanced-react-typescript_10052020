import React from 'react';
import { Vector3, Color3 } from '@babylonjs/core/Maths/math';

export type PoleSphereProps = {
  id: string;
  x: number;
  y: number;
  z: number;
};

export function PoleSphere({ id, x, y, z }: PoleSphereProps) {
  return (
    <sphere
      name={'box_sphere-sphere' + id}
      diameter={2}
      position={new Vector3(x, y, z)}>
      <standardMaterial
        name={'box_sphere-sphere_material' + id}
        emissiveColor={new Color3(0, 0.2, 0.6)}>
        <texture assignTo="emissiveTexture" url={'/images/blue-tile.png'} />
      </standardMaterial>
    </sphere>
  );
}
