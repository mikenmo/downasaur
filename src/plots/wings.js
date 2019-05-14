import { createPolygonArray } from '../utils';

const wings = function(wingsPos,translate,scale) {
  console.log(wingsPos)
  return(

    createPolygonArray([
      { x: 0+translate.x, y: -80+translate.y, z: -320+translate.z },
      { x: 400+translate.x, y: -80+translate.y, z: -320+translate.z },
      { x: -80+translate.x, y: (560-wingsPos)+translate.y, z: -800+translate.z },

      { x: 0+translate.x, y: -80+translate.y, z: 0+translate.z },
      { x: 400+translate.x, y: -80+translate.y, z: 0+translate.z },
      { x: -80+translate.x, y: (560-wingsPos)+translate.y, z: 480+translate.z },
    ]).map(x => x * scale)
  );
}

export default wings;