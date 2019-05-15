import * as THREE from "three";
import { createBoxMesh } from "../utils";

import downasaurTexture from "../textures/downasaur.jpg";

class Downasaur {
  constructor() {
    this.x = 0;
    this.y = 0;

    this.object = new THREE.Object3D();
    this.boundingBox = new THREE.Box3().setFromObject(this.object);
  }

  _createDino(texture) {
    const material = { map: texture };
    const tempMesh = createBoxMesh([
      { geometry: [1, 3, 1], material, transform: { y: 1 } },
      { geometry: [1, 3, 1], material, transform: { y: 0, z: -1 } },
      { geometry: [2, 3, 1], material, transform: { y: -1, z: -2 } },
      { geometry: [3.25, 3, 1], material, transform: { y: -2, z: -3 } },
      { geometry: [3.3, 5, 1], material, transform: { y: -1.5, z: -4 } },
      { geometry: [3.35, 7, 1], material, transform: { y: -2, z: -5 } },
      {
        geometry: [2, 9, 1],
        material,
        transform: { x: 2.5, y: -5, z: -6 }
      },
      {
        geometry: [2, 9, 1],
        material,
        transform: { x: -2.5, y: -5, z: -6 }
      },
      { geometry: [3.4, 8, 1], material, transform: { y: -1.5, z: -6 } },
      { geometry: [3.45, 9, 1], material, transform: { y: -1, z: -7 } },
      { geometry: [3.5, 10, 1], material, transform: { y: -0.5, z: -8 } },
      { geometry: [3.55, 11, 1], material, transform: { y: 0, z: -9 } },
      { geometry: [3.55, 19, 1], material, transform: { y: 4, z: -10 } },
      { geometry: [5, 9, 5], material, transform: { y: 9, z: -13 } },
      {
        geometry: [2, 2, 5],
        material,
        transform: { x: -2, y: 3, z: -10 }
      },
      {
        geometry: [2, 2, 5],
        material,
        transform: { x: 2, y: 3, z: -10 }
      }
    ]);
    this.object.add(...tempMesh);
    this.object.scale.set(0.5, 0.5, 0.5);
    this.boundingBox = new THREE.Box3().setFromObject(this.object);
  }

  render(scene, x, y, z) {
    const loader = new THREE.TextureLoader();
    loader.load(downasaurTexture, this._createDino.bind(this));
    this.object.castShadow = true;
    this.object.receiveShadow = true;
    this.object.position.x = x;
    this.object.position.y = y;
    this.object.position.z = z;
    scene.add(this.object);
  }
}

export default Downasaur;
