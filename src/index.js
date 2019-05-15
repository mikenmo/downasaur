import { mat4 } from "gl-matrix";
import * as THREE from "three";

import { initGraphics, Colors } from "./utils";
import { Pterodactyl, Cactus, Downasaur } from "./objects";
import OrbitControls from "three-orbitcontrols";

import renderHTML, { renderScore, gameOverScreen } from "./html";
import "./stylesheets/fonts.css";
import "./stylesheets/index.css";

import floorTexture from "./textures/floor.jpg";

const CONSTANTS = {
  PLANE_WIDTH: 50,
  PLANE_LENGTH: 1000,
  PADDING: 20,

  MIN_INTERVAL: 3,
  MAX_INTERVAL: 6,

  JUMP_TRAJECTION: 20,
  JUMP_DURATION: 400,
  JUMP_REFRESH: 10
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
  },
  isPlaying: true
};

function createPlayer() {
  const player = new Downasaur();
  player.render(GAME.scene, 0.785, 5, CONSTANTS.PLANE_LENGTH / 2);

  window.addEventListener("keydown", function(event) {
    if (
      event.keyCode === 37 &&
      player.object.position.x !==
        -(CONSTANTS.PLANE_WIDTH - CONSTANTS.PADDING) / 2 &&
      player.object.position.y <= 5
    ) {
      player.object.position.x -=
        (CONSTANTS.PLANE_WIDTH - CONSTANTS.PADDING) / 2;
    } else if (
      event.keyCode === 39 &&
      player.object.position.x !==
        (CONSTANTS.PLANE_WIDTH - CONSTANTS.PADDING) / 2 &&
      player.object.position.y <= 5
    ) {
      player.object.position.x +=
        (CONSTANTS.PLANE_WIDTH - CONSTANTS.PADDING) / 2;
    } else if (event.keyCode === 38 && player.object.position.y === 5) {
      let elapsed = 0;
      const jump = setInterval(function() {
        const delta =
          (CONSTANTS.JUMP_TRAJECTION /
            (CONSTANTS.JUMP_DURATION / CONSTANTS.JUMP_REFRESH)) *
          2;

        if (elapsed < CONSTANTS.JUMP_DURATION / 2) {
          player.object.position.y += delta;
        } else {
          player.object.position.y -= delta;

          if (elapsed >= CONSTANTS.JUMP_DURATION) {
            clearInterval(jump);
            player.object.position.y = 5;
            elapsed = 0;
          }
        }

        elapsed += CONSTANTS.JUMP_REFRESH;
        GAME.player.boundingBox = new THREE.Box3().setFromObject(player.object);
      }, CONSTANTS.JUMP_REFRESH);
    }

    GAME.player.boundingBox = new THREE.Box3().setFromObject(player.object);
  });
  return player;
}

function main(mount) {
  const container = document.getElementById("root");
  GAME.containerWidth = window.innerWidth;
  GAME.containerHeight = window.innerHeight;
  GAME.renderer = initGraphics().renderer;
  GAME.renderer.setSize(GAME.containerWidth, GAME.containerHeight);
  GAME.renderer.setClearColor(0x000000, 1);
  GAME.renderer.shadowMap.enabled = true;
  mount.appendChild(GAME.renderer.domElement);

  GAME.scene = new THREE.Scene();
  GAME.clock = new THREE.Clock();
  GAME.score = 0;

  GAME.axesHelper = new THREE.AxesHelper(CONSTANTS.PLANE_LENGTH / 2);
  // CAMERA
  GAME.camera = new THREE.PerspectiveCamera(
    45,
    GAME.containerWidth / GAME.containerHeight,
    1,
    3000
  );
  GAME.camera.rotation.x = (-15 * Math.PI) / 180;
  GAME.camera.position.set(
    0,
    CONSTANTS.PLANE_LENGTH / 125 + 10,
    CONSTANTS.PLANE_LENGTH / 2 + CONSTANTS.PLANE_LENGTH / 25 - 15
  );

  // GAME.controls = new OrbitControls(GAME.camera, GAME.renderer.domElement);
  // GAME.controls.enableKeys = false;
  // GAME.controls.enablePan = false;
  // GAME.controls.enableZoom = false;
  // GAME.controls.minPolarAngle = 1.55;
  // GAME.controls.maxPolarAngle = 1.55;
  // GAME.controls.minAzimuthAngle = 0;
  // GAME.controls.maxAzimuthAngle = 0;

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
  createPtero();
  GAME.player = createPlayer();
  GAME.scene.add(GAME.camera, GAME.light.directional, GAME.light.hemisphere);

  function animate() {
    if (GAME.isPlaying) {
      requestAnimationFrame(animate);
      for (let i = GAME.obstacles.length - 1; i >= 0; i--) {
        const obstacle = GAME.obstacles[i];
        obstacle.render(GAME.scene);
        if (
          obstacle.z <
          CONSTANTS.PLANE_LENGTH / 2 + CONSTANTS.PLANE_LENGTH / 10
        ) {
          obstacle.z += 10;
          GAME.score = Math.floor(GAME.clock.getElapsedTime() * 15);
          renderScore(GAME.score);

          const bounds = new THREE.Box3().setFromObject(obstacle.object);

          if (bounds.intersectsBox(GAME.player.boundingBox)) {
            GAME.isPlaying = false;
            gameOverScreen(GAME.score);
          }
        } else {
          GAME.scene.remove(obstacle.object);
          GAME.obstacles.splice(i, 1);
        }
      }
      // GAME.controls.update();
      GAME.renderer.render(GAME.scene, GAME.camera);
    }
  }
  animate();
}

function createCactus() {
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
  const cactus = new Cactus(xPosition, yPosition, zPosition);

  GAME.obstacles.push(cactus);

  const { MAX_INTERVAL, MIN_INTERVAL } = CONSTANTS;
  const nextSpawn = Math.floor(
    Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1) + MIN_INTERVAL
  );
  setTimeout(createCactus, nextSpawn * 500);
}

function createPtero() {
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

  const ptero = new Pterodactyl(xPosition, yPosition, zPosition);
  GAME.obstacles.push(ptero);

  const { MAX_INTERVAL, MIN_INTERVAL } = CONSTANTS;
  const nextSpawn = Math.floor(
    Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1) + MIN_INTERVAL
  );
  setTimeout(createPtero, nextSpawn * 1000);
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
renderHTML(main);
