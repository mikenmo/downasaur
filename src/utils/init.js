import { initWebGL, initShader, initProgram } from './webgl-init';

import fragment from '../shaders/fragment.glsl';
import vertex from '../shaders/vertex.glsl';

const shader = { fragment, vertex };

const initGraphics = (canvasId, canvasOptions = {}) => {
  const canvas = document.getElementById(canvasId);

  if (!canvas) {
    throw Error('Canvas element is null');
  }

  Object.assign(canvas, canvasOptions);

  const gl = initWebGL(canvas, true);
  const vertexShader = initShader(gl, gl.VERTEX_SHADER, shader.vertex);
  const fragmentShader = initShader(gl, gl.FRAGMENT_SHADER, shader.fragment);
  const program = initProgram(gl, vertexShader, fragmentShader);

  // Init Canvas
  gl.useProgram(program);

  return { gl, vertexShader, fragmentShader, program };
}

export default initGraphics;
