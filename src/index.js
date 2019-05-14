import { mat4 } from "gl-matrix";
import * as THREE from "three";
import { initGraphics } from "./utils";
import { Bird } from "./objects";

var Colors = {
  red: 0xf25346,
  white: 0xd8d0d1,
  brown: 0x59332e,
  pink: 0xf5986e,
  brownDark: 0x23190f,
  blue: 0x68c3c0
};

function main() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const { renderer } = initGraphics();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // const mesh = new THREE.Object3D();

  var geomCockpit = new THREE.BoxGeometry(60, 50, 50, 1, 1, 1);
  var material = new THREE.MeshBasicMaterial({
    color: 0x00ff00
  });
  var cockpit = new THREE.Mesh(geomCockpit, material);
  // cockpit.scale.set(0.25, 0.25, 0.25);
  // cockpit.position.y = 100;
  scene.add(cockpit);

  // var geometry = new THREE.BoxGeometry(1, 1, 1);
  // var material = new THREE.MeshBasicMaterial({
  //   color: 0x00ff00
  // });
  // var cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);
  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}

main();
