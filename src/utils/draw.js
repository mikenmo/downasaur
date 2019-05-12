export const SCALING = { x: 300, y: 300, z: 300 };

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
