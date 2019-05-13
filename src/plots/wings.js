import { createPolygonArray } from '../utils';

const wings = function(wingsPos) {
  console.log(wingsPos)
  return(

    createPolygonArray([
      { x: 0, y: -80, z: -320 },
      { x: 400, y: -80, z: -320 },
      { x: -80, y: (560-wingsPos), z: -800 },

      { x: 0, y: -80, z: 0 },
      { x: 400, y: -80, z: 0 },
      { x: -80, y: (560-wingsPos), z: 480 },
    ])
  );
}

export default wings;