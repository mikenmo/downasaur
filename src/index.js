import './stylesheets/index.css';

import getAttribPointers from './pointers';
import { mat4 } from 'gl-matrix';
import {
  initGraphics,
  createVectorArray,

  cvtColorObj,

  Color,
  SCALING,
} from './utils';

import { Cactus, Pterodactyl } from './objects';

const toRadians = theta => theta * Math.PI / 180;

function main() {
  const { gl, program } = initGraphics('main', { width: 600, height: 600 });
  const attribPointer = getAttribPointers(gl, program);

  gl.enable(gl.DEPTH_TEST);
  gl.enableVertexAttribArray(attribPointer.A_POSITION);
  gl.enableVertexAttribArray(attribPointer.A_UV_COORD);
  // gl.enableVertexAttribArray(attribPointer.A_NORMAL);

  let transformationMatrix = mat4.create();

  // Initialize transformation matrix
  gl.uniformMatrix4fv(attribPointer.U_MODEL_MATRIX, false, new Float32Array(transformationMatrix));

  /* Start program here */
  const uModel = mat4.create();
  const uNormal = mat4.create();

  mat4.invert(uNormal, uModel);
  mat4.transpose(uNormal, uNormal);

  const config = {
    model: { x: -40, y: -40, z: 0 },
    cam: { x: 0, y: 0, z: 0 },
    lap: { x: 0, y: 0, z: 0 },

    lightambient: { r: 76, g: 76, b: 76 },
    lightdiffuse: { r: 255, g: 255, b: 255 },
    lightspecular: { r: 255, g: 255, b: 255 },
    lightdirection: { x: -SCALING.x, y: SCALING.y * -2.5, z: SCALING.z * -5 },

    materialambient: { r: 0, g: 0, b: 0 },
    materialdiffuse: { r: 0, g: 0, b: 0 },
    materialspecular: { r: 255, g: 255, b: 255 },
    materialshininess: { v: 5 },

    flags: {
      ambient: true,
      diffuse: true,
      specular: true,
    },
    uNormal,
    isAnimating: false,
  };

  // Bind Listeners
  // const sliders = document.querySelectorAll('input[type=range]');
  // sliders.forEach(slider => {
  //   slider.addEventListener('input', e => {
  //     const [className, feature, label] = e.target.name.match(/(\w+)-(\w)/);
  //     const [units] = document.querySelectorAll(`.${className}`);
  //     config[feature][label] = +e.target.value;
  //     units.innerText = `${e.target.value}`;
  //     renderArt(gl, attribPointer, config);
  //   });
  // });

  // const animation = document.querySelector('input[type=checkbox]');
  // animation.addEventListener('change', e => {
  //   config.isAnimating = e.target.checked;
  // });

  // animate();
  renderArt(gl, attribPointer, config);
  
  // function animate() {
  //   renderArt(gl, attribPointer, config);

  //   const { x } = config.model;

  //   if (config.isAnimating) {
  //     const theta = (x + 1) % 360;
  //     config.model = { x: theta, y: theta, z: theta };
  //   }

  //   requestAnimFrame(animate);
  // }
}

function renderArt(gl, attribPointer, config) {
  // let vertices, colorSeq;
  let wingsPos = 0
  // Model to World
  const modelMatrix = mat4.create();
  mat4.rotateX(modelMatrix, modelMatrix, toRadians(config.model.x));
  mat4.rotateY(modelMatrix, modelMatrix, toRadians(config.model.y));
  mat4.rotateZ(modelMatrix, modelMatrix, toRadians(config.model.z));

  gl.uniformMatrix4fv(attribPointer.U_MODEL_MATRIX, false, new Float32Array(modelMatrix));

  const viewMatrix = mat4.create();
  const {
    cam,
    lap,

    lightambient,
    lightdiffuse,
    lightspecular,
    lightdirection,
    materialambient,
    materialdiffuse,
    materialspecular,
    materialshininess,

    flags,
    uNormal,
  } = config;

  mat4.lookAt(
    viewMatrix,
    createVectorArray({ x: cam.x, y: cam.y, z: cam.z }),
    createVectorArray({ x: lap.x, y: lap.y, z: lap.z }),
    [0, 1, 0, 0]
  );
  gl.uniformMatrix4fv(
    attribPointer.U_VIEW_MATRIX,
    false,
    new Float32Array(viewMatrix)
  );

  // Setup Lighting Parameters
  gl.uniformMatrix4fv(attribPointer.U_NORMAL_MATRIX, false, new Float32Array(uNormal));

  gl.uniform3fv(attribPointer.U_LIGHT_AMBIENT, cvtColorObj(lightambient));
  gl.uniform3fv(attribPointer.U_LIGHT_DIFFUSE, cvtColorObj(lightdiffuse));
  gl.uniform3fv(attribPointer.U_LIGHT_SPECULAR, cvtColorObj(lightspecular));
  gl.uniform3fv(attribPointer.U_LIGHT_DIRECTION, createVectorArray(lightdirection));

  gl.uniform3fv(attribPointer.U_MATERIAL_AMBIENT, cvtColorObj(materialambient));
  gl.uniform3fv(attribPointer.U_MATERIAL_DIFFUSE, cvtColorObj(materialdiffuse));
  gl.uniform3fv(attribPointer.U_MATERIAL_SPECULAR, cvtColorObj(materialspecular));
  gl.uniform1f(attribPointer.U_SHININESS, materialshininess.v);

  gl.clearColor(...Color.BLACK);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);  


  const cactus = new Cactus(gl, attribPointer);
  const ptero = new Pterodactyl(gl, attribPointer);

  cactus.render();
  ptero.render(wingsPos);
}

main();
