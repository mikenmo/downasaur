import * as THREE from "three";

export const SCALING = { x: 800, y: 800, z: 800 };

export const createVectorArray = points => {
  const { x = 0, y = 0, z = 0 } = points;

  return [x / SCALING.x, y / SCALING.y, z / SCALING.z];
};

export const createPolygonArray = points => {
  return points.reduce((polygon, point, i) => {
    polygon.push(...createVectorArray(point));

    // UV Coordinates
    switch (i % 6) {
      case 0:
        polygon.push(1, 1);
        break;
      case 1:
        polygon.push(0, 1);
        break;
      case 2:
        polygon.push(0, 0);
        break;
      case 3:
        polygon.push(1, 1);
        break;
      case 4:
        polygon.push(0, 0);
        break;
      case 5:
        polygon.push(1, 0);
        break;
    }
    return polygon;
  }, []);
}

export const createTexture = (gl, attribPointer, filename) => {
  const image = new Image();
  image.src = filename;

  const texture = gl.createTexture();

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.uniform1i(attribPointer.U_SAMPLE, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);

  return image;
}

export const drawObject = (gl, attribPointer, config, primitiveType) => {
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

export const createBoxMesh = points => {
  return points.map(({ geometry, material, transform }) => {
    const object = new THREE.BoxGeometry(...geometry);
    const meshmaterial = new THREE.MeshBasicMaterial(material);
    const mesh = new THREE.Mesh(object, meshmaterial);

    if (transform) Object.assign(mesh.position, transform);

    return mesh;
  });
}
