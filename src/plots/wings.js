import { createPolygonArray } from '../utils';

const wings = createPolygonArray([
  { x: 0, y: -80, z: -320 },
  { x: 400, y: -80, z: -320 },
  { x: -80, y: 560, z: -800 },

  { x: 0, y: -80, z: 0 },
  { x: 400, y: -80, z: 0 },
  { x: -80, y: 560, z: 480 },
]);

export default wings;