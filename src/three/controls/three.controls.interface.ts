import { type PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import type * as THREE from 'three'

/**
 * player controls
 */
export interface ThreeControlsInterface {
  /** setup controls */
  setup: () => Promise<void>
  /** player controls */
  controls: PointerLockControls
  /** player velocity */
  velocity: THREE.Vector3
  /** player direction */
  direction: THREE.Vector3

  /** if player is moving forward */
  moveForward: boolean
  /** if player is moving backward */
  moveBackward: boolean
  /** if player is moving left */
  moveLeft: boolean
  /** if player is moving right */
  moveRight: boolean
  /** if player can jump */
  canJump: boolean
}
