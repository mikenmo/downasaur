import * as THREE from "three";
import { createBoxMesh, Colors } from "../utils";

import grass from "../textures/grass.png";
import brick from "../textures/brick.png";
import soil from "../textures/soil.png";

class Cactus {
  constructor() {
    this.x = 0;
    this.y = 0;

    this.object = new THREE.Object3D();
  }

  _createPlant(texture) {
    const material = { map: texture };

    const mesh = createBoxMesh([
      { geometry: [3.5, 13, 3.5], material, transform: { y: -1.5 } },

      { geometry: [4, 1.75, 2], material, transform: { x: 3.5, y: 0.5 } },
      { geometry: [2, 4, 2], material, transform: { x: 4.5, y: 3.4 } },

      { geometry: [4, 1.75, 2], material, transform: { x: -3.5, y: -1.5 } },
      { geometry: [2, 4, 2], material, transform: { x: -4.5, y: 1.4 } }
    ]);

    this.object.add(...mesh);
  }

  _createPot(texture) {
    const material = { map: texture };

    const mesh = createBoxMesh([
      { geometry: [12, 5, 2], material, transform: { y: -7.5, z: 6 } },
      { geometry: [12, 5, 2], material, transform: { y: -7.5, z: -6 } },
      { geometry: [2, 5, 13.75], material, transform: { y: -7.5, x: 5 } },
      { geometry: [2, 5, 13.75], material, transform: { y: -7.5, x: -5 } }
    ]);

    this.object.add(...mesh);
  }

  _createSoil(texture) {
    const geometry = new THREE.PlaneGeometry(10, 10);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.rotation.x = Math.PI * 0.5;
    mesh.position.y = -7.5;

    this.object.add(mesh);
  }

  render(scene, x, y, z) {
    const loader = new THREE.TextureLoader();
    loader.load(grass, this._createPlant.bind(this));
    loader.load(brick, this._createPot.bind(this));
    loader.load(soil, this._createSoil.bind(this));
    this.object.castShadow = true;
    this.object.receiveShadow = true;
    this.object.position.x = x;
    this.object.position.y = y + 5;
    this.object.position.z = z;
    scene.add(this.object);
  }
}

export default Cactus;
