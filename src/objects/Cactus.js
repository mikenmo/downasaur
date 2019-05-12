import { Cactus as Plant, Pot, Soil } from '../plots';

import { drawObject, createTexture } from '../utils';

import brickImage from '../textures/brick.png';
import grassImage from '../textures/grass.png';
import soilImage from '../textures/soil.png';

class Cactus {
  constructor(gl, attribPointer) {
    this.x = 0;
    this.y = 0;

    this.gl = gl;
    this.attribPointer = attribPointer;
  }

  get coordinates() {
    return { x: this.x, y: this.y };
  }

  render() {
    const { gl, attribPointer } = this;

    const grassTexture = createTexture(gl, attribPointer, grassImage);
    const brickTexture = createTexture(gl, attribPointer, brickImage);
    const soilTexture = createTexture(gl, attribPointer, soilImage);

    grassTexture.addEventListener('load', function() {
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this);

      drawObject(gl, attribPointer, { vertices: Plant });
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
  }
}

export default Cactus;
