import { inject, injectable } from 'inversify'
import { type ThreeControlsInterface } from './three.controls.interface'
import { TYPES } from '../../ioc/inversify.types'
import { ThreeCameraInterface } from '../camera/three.camera.interface'
import NpmThree from '../../ioc/npm/npm.three'
import { PointerLockControls } from './PointerLockControls.js'

@injectable()
export class ThreeControlsDesktop implements ThreeControlsInterface {
  constructor (
    @inject(TYPES.THREE.CAMERA) private readonly camera: ThreeCameraInterface,
    @inject(TYPES.NPM.THREE) private readonly three: NpmThree
  ) {
  }

  controls = new PointerLockControls(this.camera.camera, document.body)

  async setup (): Promise<void> {
    const blocker = document.getElementById('blocker')
    const instructions = document.getElementById('instructions')

    if ((blocker == null) || (instructions == null)) {
      throw new Error('blocker or instructions is undefined')
    }
    instructions.addEventListener('click', () => {
      this.controls.lock()
    })

    this.controls.addEventListener('lock', function () {
      instructions.style.display = 'none'
      blocker.style.display = 'none'
    })

    this.controls.addEventListener('unlock', function () {
      blocker.style.display = 'block'
      instructions.style.display = ''
    })
    const onKeyDown: (event: KeyboardEvent) => void = (event) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          this.moveForward = true
          break

        case 'ArrowLeft':
        case 'KeyA':
          this.moveLeft = true
          break

        case 'ArrowDown':
        case 'KeyS':
          this.moveBackward = true
          break

        case 'ArrowRight':
        case 'KeyD':
          this.moveRight = true
          break

        case 'Space':
          if (this.canJump) this.velocity.y = this.velocity.y + 200
          this.canJump = false
          break
      }
    }

    const onKeyUp: (event: KeyboardEvent) => void = (event) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          this.moveForward = false
          break

        case 'ArrowLeft':
        case 'KeyA':
          this.moveLeft = false
          break

        case 'ArrowDown':
        case 'KeyS':
          this.moveBackward = false
          break

        case 'ArrowRight':
        case 'KeyD':
          this.moveRight = false
          break
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)
  }

  moveForward = false
  moveBackward = false
  moveLeft = false
  moveRight = false
  canJump = false
  velocity = new this.three.Vector3()
  direction = new this.three.Vector3()
}
