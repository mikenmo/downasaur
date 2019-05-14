import { mat4 } from "gl-matrix";
import * as THREE from "three";

import { initGraphics, Colors } from "./utils";
import { Bird, Cactus } from "./objects";
import OrbitControls from "three-orbitcontrols";

import renderHTML from './html';
import './stylesheets/fonts.css';
import './stylesheets/index.css';

function main(mount) {
  const { renderer } = initGraphics();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 100);
  camera.position.z = 15;
  renderer.setSize(window.innerWidth, window.innerHeight);
  mount.appendChild(renderer.domElement);

  const cactus = new Cactus();
  cactus.render(scene);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}

renderHTML(main);
