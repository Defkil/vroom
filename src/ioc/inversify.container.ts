import * as Enable3D from 'enable3d'
import * as THREE from 'three'
import { Container, ContainerModule } from 'inversify'
import { type ThreeCameraInterface } from '../three/camera/three.camera.interface'
import { ThreeCamera } from '../three/camera/three.camera'
import { ThreeCore } from '../three/core/three.core'
import { ThreeControlsDesktop } from '../three/controls/three.controls.desktop'
import { type ThreeSceneInterface } from '../three/scene/three.scene.interface'
import { type ThreeCoreInterface } from '../three/core/three.core.interface'
import { type ThreeControlsInterface } from '../three/controls/three.controls.interface'
import { ThreeScene } from '../three/scene/three.scene'
import { App } from '../App'
import { TYPES } from './inversify.types'
import type NpmThree from './npm/npm.three'
import { type NpmEnable3d } from './npm/npm.enable3d'
import { type AppInterface } from '../App.interface'

const thirdPartyDependencies = new ContainerModule((bind) => {
  bind<NpmThree>(TYPES.NPM.THREE).toConstantValue(THREE)
  bind<NpmEnable3d>(TYPES.NPM.ENABLE3D).toConstantValue(Enable3D)
})

const container = new Container()

container.load(thirdPartyDependencies)

container.bind<AppInterface>(TYPES.APP).to(App).inSingletonScope()

container.bind<ThreeCameraInterface>(TYPES.THREE.CAMERA).to(ThreeCamera).inSingletonScope()
container.bind<ThreeControlsInterface>(TYPES.THREE.CONTROLS).to(ThreeControlsDesktop).inSingletonScope()
container.bind<ThreeCoreInterface>(TYPES.THREE.CORE).to(ThreeCore).inSingletonScope()
container.bind<ThreeSceneInterface>(TYPES.THREE.SCENE).to(ThreeScene).inSingletonScope()

export default container
