import { type ExtendedMesh, type ExtendedObject3D, type THREE } from 'enable3d'

export interface NpmEnable3d {
  THREE: typeof THREE
  ExtendedMesh: typeof ExtendedMesh
  ExtendedObject3D: typeof ExtendedObject3D
}
