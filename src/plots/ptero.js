import { createPolygonArray } from '../utils';

const body = function(translate,scale) {
    return(
        createPolygonArray([
            //head
            { x: translate.x-240, y: translate.y+400, z: translate.z-80 }, //0
            { x: translate.x-720, y: translate.y+0, z: translate.z-80 }, //1
            { x: translate.x-320, y: translate.y+0, z: translate.z-80 }, //2
            //neck
            { x: translate.x-280, y: translate.y+200, z: translate.z-80 }, //3
            { x: translate.x-320, y: translate.y+0, z: translate.z-80 }, //4
            { x: translate.x-40, y: translate.y-80, z: translate.z-0 }, //5
            
            

            { x: translate.x-320, y: translate.y+0, z: translate.z-80 }, 
            { x: translate.x-40, y: translate.y-80, z: translate.z-0 }, 
            { x: translate.x+80, y: translate.y-400, z: translate.z-80 }, //6
            //body
            { x: translate.x-40, y: translate.y-80, z: translate.z-0 }, //7
            { x: translate.x+80, y: translate.y-400, z: translate.z-80 },//8
            { x: translate.x+720, y: translate.y-80, z: translate.z-0 }, //9
            
            
        
            { x: translate.x+80, y: translate.y-400, z: translate.z-80 },
            { x: translate.x+720, y: translate.y-80, z: translate.z-0 },
            { x: translate.x+560, y: translate.y-400, z: translate.z-80 },//10

            //BACK
            //head
            { x: translate.x-240, y: translate.y+400, z: translate.z-240 },//11
            { x: translate.x-720, y: translate.y-0, z: translate.z-240 },//12
            { x: translate.x-320, y: translate.y-0, z: translate.z-240 },//13
            //neck
            { x: translate.x-280, y: translate.y+200, z: translate.z-240 },//14
            { x: translate.x-320, y: translate.y-0, z: translate.z-240 },//15
            { x: translate.x-40, y: translate.y-80, z: translate.z-320 },//16
            
            

            { x: translate.x-320, y: translate.y-0, z: translate.z-240 },
            { x: translate.x-40, y: translate.y-80, z: translate.z-320 },
            { x: translate.x+80, y: translate.y-400, z: translate.z-240 },//17
            //body
            { x: translate.x-40, y: translate.y-80, z: translate.z-320 },//18
            { x: translate.x+80, y: translate.y-400, z: translate.z-240 },//19
            { x: translate.x+720, y: translate.y-80, z: translate.z-320 },//20
            
            

            { x: translate.x+80, y: translate.y-400, z: translate.z-240 },
            { x: translate.x+720, y: translate.y-80, z: translate.z-320 },
            { x: translate.x+560, y: translate.y-400, z: translate.z-240 },//21

            // CENTER
            // head
            
            { x: translate.x-240, y: translate.y+400, z: translate.z-240 },//11
            { x: translate.x-240, y: translate.y+400, z: translate.z-80 }, //0
            { x: translate.x-720, y: translate.y+0, z: translate.z-240 }, //2
            

            { x: translate.x-720, y: translate.y+0, z: translate.z-240 }, //2
            { x: translate.x-240, y: translate.y+400, z: translate.z-80 },//11
            { x: translate.x-720, y: translate.y+0, z: translate.z-80 },//12

            { x: translate.x-720, y: translate.y+0, z: translate.z-80 }, //1
            { x: translate.x-720, y: translate.y-0, z: translate.z-240 },//12
            { x: translate.x-320, y: translate.y+0, z: translate.z-80 }, //2

            { x: translate.x-720, y: translate.y-0, z: translate.z-240 },//12
            { x: translate.x-320, y: translate.y+0, z: translate.z-80 }, //2
            { x: translate.x-320, y: translate.y-0, z: translate.z-240 },//13

            { x: translate.x-240, y: translate.y+400, z: translate.z-80 }, //0
            { x: translate.x-240, y: translate.y+400, z: translate.z-240 },//11
            { x: translate.x-280, y: translate.y+200, z: translate.z-80 }, //3

            { x: translate.x-240, y: translate.y+400, z: translate.z-240 },//11
            { x: translate.x-280, y: translate.y+200, z: translate.z-80 }, //3
            { x: translate.x-280, y: translate.y+200, z: translate.z-240 },//14

            { x: translate.x-280, y: translate.y+200, z: translate.z-80 }, //3
            { x: translate.x-280, y: translate.y+200, z: translate.z-240 },//14
            { x: translate.x-40, y: translate.y-80, z: translate.z-0 }, //5

            { x: translate.x-280, y: translate.y+200, z: translate.z-240 },//14
            { x: translate.x-40, y: translate.y-80, z: translate.z-0 }, //5
            { x: translate.x-40, y: translate.y-80, z: translate.z-320 },//16

            { x: translate.x-320, y: translate.y+0, z: translate.z-80 }, //4
            { x: translate.x-320, y: translate.y-0, z: translate.z-240 },//15
            { x: translate.x+80, y: translate.y-400, z: translate.z-80 }, //6

            { x: translate.x-320, y: translate.y-0, z: translate.z-240 },//15
            { x: translate.x+80, y: translate.y-400, z: translate.z-80 }, //6
            { x: translate.x+80, y: translate.y-400, z: translate.z-240 },//17

            { x: translate.x-40, y: translate.y-80, z: translate.z-0 }, //7
            { x: translate.x-40, y: translate.y-80, z: translate.z-320 },//18
            { x: translate.x+720, y: translate.y-80, z: translate.z-0 }, //9

            { x: translate.x-40, y: translate.y-80, z: translate.z-320 },//18
            { x: translate.x+720, y: translate.y-80, z: translate.z-0 }, //9
            { x: translate.x+720, y: translate.y-80, z: translate.z-320 },//20

            { x: translate.x-40, y: translate.y-80, z: translate.z-0 }, // 8
            { x: translate.x+80, y: translate.y-400, z: translate.z-240 },//19
            { x: translate.x+560, y: translate.y-400, z: translate.z-80 },//10

            { x: translate.x+80, y: translate.y-400, z: translate.z-240 },//19
            { x: translate.x+560, y: translate.y-400, z: translate.z-80 },//10
            { x: translate.x+560, y: translate.y-400, z: translate.z-240 },//21

            { x: translate.x+720, y: translate.y-80, z: translate.z-0 }, //9
            { x: translate.x+720, y: translate.y-80, z: translate.z-320 },//20
            { x: translate.x+560, y: translate.y-400, z: translate.z-80 },//10

            { x: translate.x+720, y: translate.y-80, z: translate.z-320 },//20
            { x: translate.x+560, y: translate.y-400, z: translate.z-80 },//10
            { x: translate.x+560, y: translate.y-400, z: translate.z-240 },//21
        
        ]).map(x => x * scale)
    );
}

export default body;