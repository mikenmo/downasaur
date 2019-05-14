import { mat4 } from "gl-matrix";
import * as THREE from "three";
import { initGraphics } from "./utils";
import { Bird } from "./objects";
import OrbitControls from "three-orbitcontrols";

var Colors = {
  red: 0xf25346,
  white: 0xd8d0d1,
  brown: 0x59332e,
  pink: 0xf5986e,
  brownDark: 0x23190f,
  blue: 0x68c3c0
};

function main() {
  const { renderer } = initGraphics();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 20, 100);
  camera.position.z = 5;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // const mesh = new THREE.Object3D();

  var geomCockpit = new THREE.BoxGeometry(60, 50, 50, 1, 1, 1);
  var material = new THREE.MeshBasicMaterial({
    color: 0x00ff00
  });
  var cockpit = new THREE.Mesh(geomCockpit, material);
  // cockpit.scale.set(0.25, 0.25, 0.25);
  // cockpit.position.y = 100;
  scene.add(cockpit);
  
  let wingPos = 0;
  let wingIter = 15;

  
  // var geometry = new THREE.BoxGeometry(1, 1, 1);
  
  // var cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);
  camera.position.set(0,0,5);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();
  
  function animate() {
    while(scene.children.length > 0){ 
      scene.remove(scene.children[0]); 
    }
    let vertices = [
      //FRONT
      //head
      -0.3, 0.5, -0.1,  
      -0.9, 0.0, -0.1,  
      -0.4, 0.0, -0.1,  
      //neck
      -0.35, 0.25, -0.1,  
      -0.4, 0.0, -0.1,    
      -0.05, -0.1, 0.0,   
      0.1, -0.5, -0.1,     
      //body
      -0.05, -0.1, 0.0,  
      0.1, -0.5, -0.1,  
      0.9, -0.1, 0.0,  
      0.7, -0.5, -0.1,  
  
      //BACK
      //head
      -0.3, 0.5, -0.3,  
      -0.9, 0.0, -0.3,  
      -0.4, 0.0, -0.3,  
      //neck
      -0.35, 0.25, -0.3,  
      -0.4, 0.0, -0.3,  
      -0.05, -0.1, -0.4,  
      0.1, -0.5, -0.3,  
      //body
      -0.05, -0.1, -0.4,  
      0.1, -0.5, -0.3,  
      0.9, -0.1, -0.4,  
      0.7, -0.5, -0.3,  
  
      //wing
      0.0, -0.1, -0.4,  
      0.5, -0.1, -0.4,  
      -0.1, 0.7-(wingPos*0.01),-1.0-(wingPos*0.01),   
  
      //wing
      0.0, -0.1, 0.0,  
      0.5, -0.1, 0.0,  
      -0.1, 0.7-(wingPos*0.01),0.6+(wingPos*0.01),   
  
  
    ];
  
    let indices = [
      // indices of vertices forming triangles
        //front
        0,1,2,
        3,4,5,  4,5,6,
        7,8,9,  8,9,10,
        //back
        11,12,13,
        14,15,16,  15,16,17,
        18,19,20,  19,20,21,
        //sides reuse other points
        //head
        0,11,2,    11,2,12,
        1,12,2,    12,2,13,
        0,11,3,    11,3,14,
        //neck
        3,14,5,    14,5,16,
        4,15,6,    15,6,17,
        //body
        7,18,9,   18,9,20,
        8,19,10,  19,10,21,
        9,20,10,  20,10,21,
        //wings
        22,23,24,
        25,26,27
      ];
    var pteroGeometry = new THREE.Geometry();
    for(let i=0;i<vertices.length;i+=3){
      pteroGeometry.vertices.push(new THREE.Vector3(vertices[i],vertices[i+1],vertices[i+2]));
    }
    for(let i=0;i<indices.length;i+=3){
      pteroGeometry.faces.push( new THREE.Face3(indices[i],indices[i+1],indices[i+2]) );
    }
    material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      side: THREE.DoubleSide,
    });
    
    let ptero = new THREE.Mesh(pteroGeometry,material);
    scene.add(ptero);
    
    controls.update();
    renderer.clear();
    renderer.render(scene, camera);

    wingPos+=wingIter;
    if(wingPos<=0){
      wingIter=15;
    }else if(wingPos>=100){
      wingIter=-15;
    }

    requestAnimationFrame(animate);
  }
  animate();
}

main();
