import './stylesheets/index.css';

import { mat4 } from 'gl-matrix';
import { initGraphics, Color } from './utils';

const toRadians = theta => theta * Math.PI / 180;

/* Coordinate utilities */
const SCALING = { x: 300, y: 300, z: 100 };

const createVectorArray = points => {
  const { x = 0, y = 0, z = 0, w = 1 } = points;

  return [x / SCALING.x, y / SCALING.y, z / SCALING.z, w];
};

const createPolygonArray = points => {
  return points.reduce((polygon, point) => {
    polygon.push(...createVectorArray(point));
    return polygon;
  }, []);
}

const bufferData = (gl, attribPointer, data) => {
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(attribPointer.A_POSITION);
  gl.vertexAttribPointer(attribPointer.A_POSITION, 4, gl.FLOAT, false, 0, 0);
}

const renderAll = (gl, form, iterations, step = 1, skip = 0) => {
  for (let i = 0; i < iterations; i++) {
    gl.drawArrays(form, i * step + skip, step);
  }
}

function main() {
  const { gl, program } = initGraphics('main', { width: 600, height: 600 });

  // Get Shader Pointers
  const attribPointer = {
    U_COLOR: gl.getUniformLocation(program, 'u_color'),
    U_MODEL_MATRIX: gl.getUniformLocation(program, 'u_model_matrix'),
    U_VIEW_MATRIX: gl.getUniformLocation(program, 'u_view_matrix'),

    A_POSITION: gl.getAttribLocation(program, 'a_position'),
  };

  let transformationMatrix = mat4.create();

  // Initialize transformation matrix
  gl.uniformMatrix4fv(
    attribPointer.U_MODEL_MATRIX,
    false,
    new Float32Array(transformationMatrix)
  );

  /* Start program here */
  const config = {
    model: { x: 0, y: 0, z: 0 },
    cam: { x: 0, y: 0, z: 0 },
    lap: { x: 0, y: 0, z: 0 },
  };
  renderArt(gl, attribPointer, config);

  // Bind Listeners
  const sliders = document.querySelectorAll('input[type=range]');
  sliders.forEach(slider => {
    slider.addEventListener('input', e => {
      const [className, feature, label] = e.target.name.match(/(\w+)-(\w)/);
      const [units] = document.querySelectorAll(`.${className}`);

      config[feature][label] = +e.target.value;
      units.innerText = `${e.target.value}`;
      renderArt(gl, attribPointer, config);
    });
  })
}

function renderArt(gl, attribPointer, config) {
  let vertices;

  // Model to World
  const modelMatrix = mat4.create();
  mat4.rotateX(modelMatrix, modelMatrix, toRadians(config.model.x));
  mat4.rotateY(modelMatrix, modelMatrix, toRadians(config.model.y));
  mat4.rotateZ(modelMatrix, modelMatrix, toRadians(config.model.z));
  gl.uniformMatrix4fv(
    attribPointer.U_MODEL_MATRIX,
    false,
    new Float32Array(modelMatrix)
  );

  const viewMatrix = mat4.create();
  const { cam, lap } = config;

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

  // Pentagon Dimensions
  const dimensions = {
    base: Array.from({ length: 6 }).map((_, i, a) => {
      const angle = 2 * Math.PI / a.length;

      return {
        x: 150 * Math.sin(i * angle),
        y: 150 * Math.cos(i * angle),
        z: 20
      }
    }),
    tip: -20,
    square: 150,
  }

  gl.clearColor(...Color.BLACK);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  vertices = [
    ...createPolygonArray([
      dimensions.base[0],
      { z: dimensions.tip },
      dimensions.base[1],

      dimensions.base[1],
      { z: dimensions.tip },
      dimensions.base[2],

      dimensions.base[2],
      { z: dimensions.tip },
      dimensions.base[3],

      dimensions.base[3],
      { z: dimensions.tip },
      dimensions.base[4],

      dimensions.base[4],
      { z: dimensions.tip },
      dimensions.base[5],

      dimensions.base[5],
      { z: dimensions.tip },
      dimensions.base[0],
    ]),
    ...createPolygonArray(dimensions.base),
    ...createPolygonArray([
      { x: -dimensions.square, y: -dimensions.square, z: 75 },
      { x: -dimensions.square, y: dimensions.square, z: 75 },
      { x: dimensions.square, y: dimensions.square, z: 75 },
      { x: -dimensions.square, y: -dimensions.square, z: 75 },
      { x: dimensions.square, y: -dimensions.square, z: 75 },
      { x: dimensions.square, y: dimensions.square, z: 75 },
    ])
  ]
  bufferData(gl, attribPointer, vertices);

  const seq = [Color.BLUE, Color.VIOLET, Color.GRAY, Color.YELLOW, Color.ORANGE, Color.RED];

  seq.forEach((color, i) => {
    gl.uniform4f(attribPointer.U_COLOR, ...color);
    gl.drawArrays(gl.TRIANGLES, i * 3, 3);
  });

  gl.uniform4f(attribPointer.U_COLOR, ...Color.GREEN);
  gl.drawArrays(gl.TRIANGLE_FAN, 18, 6);

  gl.uniform4f(attribPointer.U_COLOR, ...Color.WHITE);
  renderAll(gl, gl.TRIANGLES, 2, 3, 24);

  bufferData(gl, attribPointer, null);
}

main();

