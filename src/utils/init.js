import * as THREE from "three";

const initGraphics = () => {
  const canvas = document.createElement( 'canvas' );
  
  if (!canvas) {
    throw Error('Canvas element is null');
  }

  const context = canvas.getContext( 'webgl2' );
  const renderer = new THREE.WebGLRenderer( { canvas: canvas, context: context } );
  
  return { renderer };
}

export default initGraphics;
