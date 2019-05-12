import './stylesheets/index.css';

import getAttribPointers from './pointers';
import { mat4 } from 'gl-matrix';
import {
  initGraphics,
  createVectorArray,
  createTexture,

  cvtColorObj,

  Color,
  SCALING,
} from './utils';

import { Cactus, Pot, Soil } from './plots';
import { Ptero, Wings } from './ptero';

import brickImage from './textures/brick.png';
import grassImage from './textures/grass.png';
import soilImage from './textures/soil.png';
import wingsImage from './textures/wings.png';

const toRadians = theta => theta * Math.PI / 180;

const drawObject = (gl, attribPointer, config, primitiveType) => {
  primitiveType = primitiveType || gl.TRIANGLES;

  const { projection, vertices } = config;

  const vbuffer = gl.createBuffer(); 
  gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  const nbuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, nbuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  gl.vertexAttribPointer(attribPointer.A_POSITION, 3, gl.FLOAT, false, 5*4, 0);
  gl.vertexAttribPointer(attribPointer.A_UV_COORD, 2, gl.FLOAT, false, 5*4, 3*4);
  // gl.vertexAttribPointer(attribPointer.A_NORMAL, 4, gl.FLOAT, false, 7*4, 3*4);

  const ibuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(Array.from({ length: vertices.length / 5 }).map((_, i) => i)), gl.STATIC_DRAW)

  gl.drawElements(primitiveType, vertices.length / 5, gl.UNSIGNED_BYTE, 0)
}

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

  // Grass Texture
  const grassTexture = createTexture(gl, attribPointer, grassImage);
  const brickTexture = createTexture(gl, attribPointer, brickImage);
  const soilTexture = createTexture(gl, attribPointer, soilImage);

  grassTexture.addEventListener('load', function() {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this);

    drawObject(gl, attribPointer, { vertices: Cactus });
  });

  brickTexture.addEventListener('load', function() {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this);

    drawObject(gl, attribPointer, { vertices: Pot });
  });

  soilTexture.addEventListener('load', function() {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this);

    drawObject(gl, attribPointer, { vertices: Soil });
  });

  grassTexture.addEventListener('load', function() {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this);

    drawObject(gl, attribPointer, { vertices: Cactus });
  });


  // Ptero Texture
  const pteroTexture = createTexture(gl, attribPointer, wingsImage);
  const wingsTexture = createTexture(gl, attribPointer, wingsImage);
  wingsTexture.addEventListener('load', function() {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this);

    drawObject(gl, attribPointer, { vertices: Wings });
  });
  pteroTexture.addEventListener('load', function() {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this);

    drawObject(gl, attribPointer, { vertices: Ptero });
  });
}

main();
