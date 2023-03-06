import type * as THREE from 'three'

/**
 * Active scene
 */
export interface ThreeSceneInterface {
  /** Setup scene */
  setup: () => Promise<void>
  /** init scene elements */
  init: () => Promise<void>
  /** scene element */
  scene: THREE.Scene
  /** raycaster element */
  raycaster: THREE.Raycaster
}
