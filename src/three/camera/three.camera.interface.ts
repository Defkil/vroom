import type * as THREE from 'three'

/**
 * Player camera
 */
export interface ThreeCameraInterface {
  /** Setup camera */
  setup: () => Promise<void>
  /** Camera element */
  camera: THREE.Camera
}
