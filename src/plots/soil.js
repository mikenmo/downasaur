import { createPolygonArray } from '../utils';

const soil = createPolygonArray([
  { x: -130, y: -150, z: -130 },
  { x: 130, y: -150, z: -130 },
  { x: 130, y: -150, z: 130 },

  { x: -130, y: -150, z: -130 },
  { x: -130, y: -150, z: 130 },
  { x: 130, y: -150, z: 130 },
]);

export default soil;

