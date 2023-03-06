import { inject, injectable } from 'inversify'
import { TYPES } from './ioc/inversify.types'
import { ThreeCoreInterface } from './three/core/three.core.interface'
import { type AppInterface } from './App.interface'

@injectable()
export class App implements AppInterface {
  constructor (
    @inject(TYPES.THREE.CORE) private readonly threeCore: ThreeCoreInterface
  ) {
  }

  async setup (): Promise<void> {
    await this.threeCore.setup()
  }

  async start (): Promise<void> {
    await this.threeCore.start()
  }
}
