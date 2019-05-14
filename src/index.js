import { mat4 } from "gl-matrix";
import * as THREE from "three";

import { initGraphics, Colors } from "./utils";
import { Bird, Cactus, Pterodactyl } from "./objects";
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
  const ptero = new Pterodactyl();
  // cactus.render(scene);
  
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
  
  // var cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);
  camera.position.set(0,0,5);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();
  
  function animate() {
    while(scene.children.length > 0){ 
      scene.remove(scene.children[0]); 
    }
    // cactus.render(scene);
    ptero.render(scene);
    
    console.log(scene.children);
    controls.update();
    renderer.clear();
    renderer.render(scene, camera);
    
    

    requestAnimationFrame(animate);
  }
  animate();
}

renderHTML(main);
