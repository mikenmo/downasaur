import { mat4 } from "gl-matrix";
import * as THREE from "three";

import { initGraphics, Colors } from "./utils";
import { Bird, Cactus, Pterodactyl } from "./objects";
import OrbitControls from "three-orbitcontrols";

import renderHTML from "./html";
import "./stylesheets/fonts.css";
import "./stylesheets/index.css";

import floorTexture from "./textures/floor.jpg";

const CONSTANTS = {
  PLANE_WIDTH: 50,
  PLANE_LENGTH: 1000,
  PADDING: 20,

  MIN_INTERVAL: 3,
  MAX_INTERVAL: 10
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

  // LIGHTING
  GAME.light.directional = new THREE.DirectionalLight(0xffffff, 1);
  GAME.light.directional.position.set(0, 1, 0);
  GAME.light.hemisphere = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
  GAME.light.hemisphere.position.y = 500;

  // FLOOR
  const loader = new THREE.TextureLoader();
  loader.load(floorTexture, texture => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 70);

    const floorGeometry = new THREE.BoxGeometry(
      CONSTANTS.PLANE_WIDTH,
      CONSTANTS.PLANE_LENGTH + CONSTANTS.PLANE_LENGTH / 10,
      1
    );
    const floorMaterial = new THREE.MeshPhongMaterial({
      // color: 0x7b1113
      map: texture
    });
    GAME.floor = new THREE.Mesh(floorGeometry, floorMaterial);
    GAME.floor.rotation.x = 1.57;
    GAME.floor.receiveShadow = true;

    GAME.scene.add(GAME.floor);
  });

  createCactus();

  GAME.player = new Hero();
  GAME.scene.add(
    GAME.camera,
    GAME.light.directional,
    GAME.light.hemisphere,
    GAME.player
  );
  function animate() {
    while (scene.children.length > 0) {
      scene.remove(scene.children[0]);
    }
    // cactus.render(scene);
    ptero.render(scene);

    console.log(scene.children);
    controls.update();
    renderer.clear();
    renderer.render(scene, camera);

    requestAnimationFrame(animate);
    GAME.obstacles.forEach(obstacle => {
      if (
        obstacle.object.position.z <
        CONSTANTS.PLANE_LENGTH / 2 + CONSTANTS.PLANE_LENGTH / 10
      ) {
        obstacle.object.position.z += 20;
      }
    });
    GAME.controls.update();
    GAME.renderer.render(GAME.scene, GAME.camera);
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
  const xPosition =
    xPositionValues[getRandomInteger(0, xPositionValues.length - 1)];
  const yPosition = 3;
  const zPosition =
    zPositionValues[getRandomInteger(0, zPositionValues.length - 1)];
  cactus.render(GAME.scene, xPosition, yPosition, zPosition);
  GAME.obstacles.push(cactus);

  const { MAX_INTERVAL, MIN_INTERVAL } = CONSTANTS;
  const nextSpawn = Math.floor(
    Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1) + MIN_INTERVAL
  );
  setTimeout(createCactus, nextSpawn * 700);
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
renderHTML(main);
