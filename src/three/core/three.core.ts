import { inject, injectable } from 'inversify'
import { type ThreeCoreInterface } from './three.core.interface'
import { TYPES } from '../../ioc/inversify.types'
import { ThreeSceneInterface } from '../scene/three.scene.interface'
import { ThreeCameraInterface } from '../camera/three.camera.interface'
import NpmThree from '../../ioc/npm/npm.three'
import { ThreeControlsInterface } from '../controls/three.controls.interface'

@injectable()
export class ThreeCore implements ThreeCoreInterface {
  renderer = new this.three.WebGLRenderer({ antialias: true })
  constructor (
    @inject(TYPES.NPM.THREE) private readonly three: NpmThree,
    @inject(TYPES.THREE.CAMERA) private readonly camera: ThreeCameraInterface,
    @inject(TYPES.THREE.SCENE) private readonly threeScene: ThreeSceneInterface,
    @inject(TYPES.THREE.CONTROLS) private readonly controls: ThreeControlsInterface
  ) {
  }

  async setup (): Promise<void> {
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)
    await this.controls.setup()
    await this.camera.setup()
    await this.threeScene.setup()
  }

  async start (): Promise<void> {
    await this.threeScene.init()
    await this.animate()
  }

  prevTime = performance.now()
  async animate (): Promise<void> {
    requestAnimationFrame(this.animate.bind(this))
    const time = performance.now()

    this.threeScene.raycaster.ray.origin.copy(this.controls.controls.getObject().position)
    this.threeScene.raycaster.ray.origin.y -= 10

    const delta = (time - this.prevTime) / 1000

    this.controls.velocity.x -= this.controls.velocity.x * 10.0 * delta
    this.controls.velocity.z -= this.controls.velocity.z * 10.0 * delta

    this.controls.velocity.y -= 9.8 * 100.0 * delta // 100.0 = mass

    this.controls.direction.z = Number(this.controls.moveForward) - Number(this.controls.moveBackward)
    this.controls.direction.x = Number(this.controls.moveRight) - Number(this.controls.moveLeft)
    this.controls.direction.normalize() // this ensures consistent movements in all directions

    if (this.controls.moveForward || this.controls.moveBackward) this.controls.velocity.z -= this.controls.direction.z * 400.0 * delta
    if (this.controls.moveLeft || this.controls.moveRight) this.controls.velocity.x -= this.controls.direction.x * 400.0 * delta

    this.controls.controls.moveForward(-this.controls.velocity.z * delta)
    this.controls.controls.moveRight(-this.controls.velocity.x * delta)

    this.controls.controls.getObject().position.y += (this.controls.velocity.y * delta) // new behavior

    if (this.controls.controls.getObject().position.y < 10) {
      this.controls.velocity.y = 0
      this.controls.controls.getObject().position.y = 10
      this.controls.canJump = true
    }

    this.prevTime = time
    this.renderer.render((this.threeScene.scene as any), this.camera.camera)
  }
}
