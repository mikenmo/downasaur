import { mat4 } from "gl-matrix";
import * as THREE from "three";
import { initGraphics } from "./utils";
import { Bird } from "./objects";
import OrbitControls from "three-orbitcontrols";

var Colors = {
  red: 0xf25346,
  white: 0xd8d0d1,
  brown: 0x59332e,
  pink: 0xf5986e,
  brownDark: 0x23190f,
  blue: 0x68c3c0
};

function main() {
  const { renderer } = initGraphics();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 20, 100);
  camera.position.z = 5;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}

main();
