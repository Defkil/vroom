import { inject, injectable } from 'inversify'
import { type ThreeCameraInterface } from './three.camera.interface'
import { TYPES } from '../../ioc/inversify.types'
import NpmThree from '../../ioc/npm/npm.three'

@injectable()
export class ThreeCamera implements ThreeCameraInterface {
  camera = new this.three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  constructor (
    @inject(TYPES.NPM.THREE) private readonly three: NpmThree
  ) {}

  async setup (): Promise<void> {
    this.camera.position.y = 10
  }
}
