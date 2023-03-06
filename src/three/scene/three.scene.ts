import { inject, injectable } from 'inversify'
import { type ThreeSceneInterface } from './three.scene.interface'
import { TYPES } from '../../ioc/inversify.types'
import NpmThree from '../../ioc/npm/npm.three'
import { ThreeControlsInterface } from '../controls/three.controls.interface'
import type * as THREE from 'three'

@injectable()
export class ThreeScene implements ThreeSceneInterface {
  scene = new this.three.Scene()
  light = new this.three.HemisphereLight(0xeeeeff, 0x777788, 1)
  raycaster = new this.three.Raycaster(new this.three.Vector3(), new this.three.Vector3(0, -1, 0), 0, 10)
  constructor (
    @inject(TYPES.NPM.THREE) private readonly three: NpmThree,
    @inject(TYPES.THREE.CONTROLS) private readonly controls: ThreeControlsInterface
  ) {
  }

  async setup (): Promise<void> {
    this.scene.background = new this.three.Color(0xffffff)
    // this.scene.fog = new this.three.Fog(0xffffff, 0, 750)

    this.light.position.set(0.5, 1, 0.75)
  }

  async init (): Promise<void> {
    this.scene.add(this.light)
    this.scene.add(this.controls.controls.getObject())
    await this.room({
      width: 100,
      height: 40,
      depth: 100
    })
  }

  async room (config: {
    width: number
    height: number
    depth: number
  }): Promise<void> {
    // build room from floor and walls in 3d space
    const floor = await this.wall({
      width: config.width,
      height: config.depth
    })
    floor.position.y = 0
    floor.rotation.x = -Math.PI / 2

    const wallNorth = await this.wall({
      width: config.width,
      height: config.height
    })
    wallNorth.position.y = config.height / 2
    wallNorth.position.z = -config.depth / 2

    const wallSouth = await this.wall({
      width: config.width,
      height: config.height
    })
    wallSouth.position.y = config.height / 2
    wallSouth.position.z = config.depth / 2
    wallSouth.rotation.y = Math.PI

    const wallEast = await this.wall({
      width: config.depth,
      height: config.height
    })
    wallEast.position.y = config.height / 2
    wallEast.position.x = config.width / 2
    wallEast.rotation.y = Math.PI / 2

    const wallWest = await this.wall({
      width: config.depth,
      height: config.height
    })
    wallWest.position.y = config.height / 2
    wallWest.position.x = -config.width / 2
    wallWest.rotation.y = -Math.PI / 2

    const ceiling = await this.wall({
      width: config.width,
      height: config.depth
    })
    ceiling.position.y = config.height
    ceiling.rotation.x = Math.PI / 2

    this.scene.add(wallNorth)
    this.scene.add(wallSouth)
    this.scene.add(wallEast)
    this.scene.add(wallWest)
    this.scene.add(ceiling)
    this.scene.add(floor)
  }

  async wall (config: {
    width: number
    height: number
  }): Promise<THREE.Mesh> {
    // walls need to be from both sides to be visible
    const geometry = new this.three.PlaneGeometry(config.width, config.height)
    const material = new this.three.MeshPhongMaterial({
      color: 0x999999,
      side: this.three.DoubleSide
    })
    const mesh = new this.three.Mesh(geometry, material)
    return mesh
  }
}
