import { Ptero, Wings } from '../plots';
import { drawObject, createTexture } from '../utils';

import wingsImage from '../textures/wings.png';

class Pterodactyl {
  constructor(gl, attribPointer) {
    this.x = 0;
    this.y = 0;

    this.gl = gl;
    this.attribPointer = attribPointer;
  }

  static get coordinates() {
    return { x: this.x, y: this.y };
  }

  render(wingsPos) {
    const { gl, attribPointer } = this;

    const pteroTexture = createTexture(gl, attribPointer, wingsImage);
    const wingsTexture = createTexture(gl, attribPointer, wingsImage);
    
    wingsTexture.addEventListener('load', function() {
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this);
      drawObject(gl, attribPointer, { vertices: Wings(wingsPos) });
    });

    pteroTexture.addEventListener('load', function() {
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this);

      drawObject(gl, attribPointer, { vertices: Ptero });
    });
  }
}

export default Pterodactyl;
