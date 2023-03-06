import type * as THREE from 'three'

export default interface NpmThree {
  Camera: typeof THREE.Camera
  PerspectiveCamera: typeof THREE.PerspectiveCamera
  Scene: typeof THREE.Scene
  Color: typeof THREE.Color
  Fog: typeof THREE.Fog
  HemisphereLight: typeof THREE.HemisphereLight
  Vector3: typeof THREE.Vector3
  Raycaster: typeof THREE.Raycaster
  PlaneGeometry: typeof THREE.PlaneGeometry
  MeshPhongMaterial: typeof THREE.MeshPhongMaterial
  Mesh: typeof THREE.Mesh
  WebGLRenderer: typeof THREE.WebGLRenderer
  Float32BufferAttribute: typeof THREE.Float32BufferAttribute
  BoxGeometry: typeof THREE.BoxGeometry
  MeshBasicMaterial: typeof THREE.MeshBasicMaterial
  DoubleSide: typeof THREE.DoubleSide
}
