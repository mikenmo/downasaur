import * as THREE from "three";

import pteroTexture from "../textures/ptero.png";
import { Ptero } from "../plots";
class Pterodactyl {
  constructor() {
    this.x = 0;
    this.y = 0;

    this.wingPos = 0;
    this.wingIter = 15;
    this.object = new THREE.Object3D();
  }

  _createPtero(texture) {
    while (this.object.children.length > 0) {
      this.object.remove(this.object.children[0]);
    }
    this.object = new THREE.Object3D();
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide
    });
    let { vertices, indices } = Ptero(this.wingPos);

    var pteroGeometry = new THREE.Geometry();
    for (let i = 0; i < vertices.length; i += 3) {
      pteroGeometry.vertices.push(
        new THREE.Vector3(vertices[i], vertices[i + 1], vertices[i + 2])
      );
    }
    for (let i = 0; i < indices.length; i += 3) {
      pteroGeometry.faces.push(
        new THREE.Face3(indices[i], indices[i + 1], indices[i + 2])
      );
    }
    let mesh = new THREE.Mesh(pteroGeometry, material)
    mesh.geometry.scale(5, 5, 5);
    mesh.rotation.y = Math.PI*0.5;
    mesh.position.x = mesh.position.x + 1.5;
    mesh.position.y = mesh.position.y + 10;
    // scene.add(ptero);
    // console.log(mesh);
    this.object.add(mesh);
  }

  render(scene) {
    const loader = new THREE.TextureLoader();

    loader.load(pteroTexture, this._createPtero.bind(this));

    scene.add(this.object);
    
    this.wingPos += this.wingIter;
    if (this.wingPos <= 0) {
      this.wingIter = 15;
    } else if (this.wingPos >= 100) {
      this.wingIter = -15;
    }
  }
}

export default Pterodactyl;
