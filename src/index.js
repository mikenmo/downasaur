import { mat4 } from "gl-matrix";
import * as THREE from "three";

import { initGraphics, Colors } from "./utils";
import { Bird, Cactus, Pterodactyl } from "./objects";
import OrbitControls from "three-orbitcontrols";

import renderHTML from "./html";
import "./stylesheets/fonts.css";
import "./stylesheets/index.css";

const CONSTANTS = {
  PLANE_WIDTH: 50,
  PLANE_LENGTH: 1000,
  PADDING: 20
};

const GAME = {
  renderer: null,
  scene: null,
  axesHelper: null,
  camera: null,
  player: null,
  controls: null,
  floor: null,
  containerWidth: 0,
  containerHeight: 0,
  obstacles: [],
  light: {
    directional: null,
    hemishphere: null
  }
};

function Hero() {
  var hero = {},
    heroGeometry = {},
    heroMaterial = {};

  heroGeometry = new THREE.CylinderGeometry(0, 2, 5, 10);
  heroMaterial = new THREE.MeshLambertMaterial({
    color: 0xe91e63,
    shading: THREE.FlatShading
  });
  hero = new THREE.Mesh(heroGeometry, heroMaterial);
  hero.castShadow = true;
  hero.position.set(0, 5, CONSTANTS.PLANE_LENGTH / 2);
  hero.rotation.x = 0.785;

  window.addEventListener("keydown", function() {
    if (
      event.keyCode === 37 &&
      hero.position.x !== -(CONSTANTS.PLANE_WIDTH - CONSTANTS.PADDING) / 2
    ) {
      hero.position.x -= (CONSTANTS.PLANE_WIDTH - CONSTANTS.PADDING) / 2;
    } else if (
      event.keyCode === 39 &&
      hero.position.x !== (CONSTANTS.PLANE_WIDTH - CONSTANTS.PADDING) / 2
    ) {
      hero.position.x += (CONSTANTS.PLANE_WIDTH - CONSTANTS.PADDING) / 2;
    }
  });

  return hero;
}

function main(mount) {
  const container = document.getElementById("root");
  GAME.containerWidth = window.innerWidth;
  GAME.containerHeight = window.innerHeight;
  GAME.renderer = initGraphics().renderer;
  GAME.renderer.setSize(GAME.containerWidth, GAME.containerHeight);
  GAME.renderer.setClearColor(0xfffafa, 1);
  GAME.renderer.shadowMap.enabled = true;
  mount.appendChild(GAME.renderer.domElement);

  GAME.scene = new THREE.Scene();

  GAME.axesHelper = new THREE.AxesHelper(CONSTANTS.PLANE_LENGTH / 2);
  // CAMERA
  GAME.camera = new THREE.PerspectiveCamera(
    45,
    GAME.containerWidth / GAME.containerHeight,
    1,
    3000
  );
  GAME.camera.position.set(
    0,
    CONSTANTS.PLANE_LENGTH / 125,
    CONSTANTS.PLANE_LENGTH / 2 + CONSTANTS.PLANE_LENGTH / 25
  );

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

function createCactus() {
  const cactus = new Cactus();

  const xPositionValues = [
    -(CONSTANTS.PLANE_WIDTH - CONSTANTS.PADDING) / 2,
    0,
    (CONSTANTS.PLANE_WIDTH - CONSTANTS.PADDING) / 2
  ];
  const zPositionValues = [-(CONSTANTS.PLANE_LENGTH - CONSTANTS.PADDING) / 2];
  console.log(xPositionValues);
  const xPosition =
    xPositionValues[getRandomInteger(0, xPositionValues.length - 1)];
  const yPosition = 3;
  const zPosition =
    zPositionValues[getRandomInteger(0, zPositionValues.length - 1)];
  cactus.render(GAME.scene, xPosition, yPosition, zPosition);
  GAME.obstacles.push(cactus);
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
renderHTML(main);
