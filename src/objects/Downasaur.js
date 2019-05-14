import { Downasaur as Dino } from "../plots"

import { drawObject, createTexture } from '../utils';
import dinosarImage from '../textures/dinosaur.jpg';

class Downasaur {
  constructor(gl, attribPointer) {
    this.x = 0;
    this.y = 0;

    this.gl = gl;
    this.attribPointer = attribPointer;
  }

  static get coordinates() {
    return { x: this.x, y: this.y };
  }

  render() {
    const { gl, attribPointer } = this;

    const dinosaurtexture = createTexture(gl, attribPointer, dinosarImage);
    
    dinosaurtexture.addEventListener('load', function() {
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this);

      drawObject(gl, attribPointer, { vertices: Dino });
    });

  }
}

export default Downasaur;
