// add styles
import './style.css';
// three.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// create the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement)
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.SphereGeometry(3,32,32);

// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, } );
const material = new THREE.MeshStandardMaterial( { color: '#fff',
  // wireframe:true,

  fog:true,
  // reflectivity:0.2,
  wireframeLinewidth:100,
  


} );
let sun=new THREE.Mesh(new THREE.SphereGeometry(6,64,64),new THREE.MeshStandardMaterial({color:'yellow',map:new THREE.TextureLoader().load('./src/sun.png')}));
let shineSun=new THREE.SpotLight('#ffffe5',0.5);
let shineSunInside=new THREE.HemisphereLight('#ffffe5',2);


var lightHelper = new THREE.SpotLightHelper(shineSun);
sun.position.set(50,0,0);
sun.add(shineSunInside)
shineSun.position.set(50,0,0);
shineSun.position.x=50
shineSun.castShadow=true;
shineSunInside.castShadow=true;
shineSun.rotation.z=180
shineSun.rotation.x=-180
// shineSun.shadow.camera.rotation.y=1800
// shineSun.castShadow=true;

// sun.add(shineSun)

scene.add(sun,shineSun)
// material.reflectivity = THREE.SmoothShading
const earth = new THREE.Mesh( geometry, material );
earth.position.set(0,0,0)
// let geometry1 = new THREE.Geometry()
// geometry1.vertices.push(new THREE.Vector3(-5, 0, 0))
// geometry1.vertices.push(new THREE.Vector3(5, 0, 0))
// let line = new THREE.Line(geometry1, new THREE.LineBasicMaterial({ color: 0x888888 }));
// scene.add(line)

// var light = new THREE.PointLight('#fff');

// let gridHelper=new THREE.GridHelper(200,50)
// light.position.set(32,32,32)
scene.add( earth );
// scene.add( gridHelper );
// scene.add( light );
scene.background=new THREE.TextureLoader().load("./src/space.jpg")
const texture = new THREE.TextureLoader().load("./src/image.jpg")
material.map=texture

// scene.background=new THREE.Color(0x2d3860);

camera.position.z = 25;
let lightValue=32;
let backLight=false;
let MAX_RANGE=90;
function addStar(){
  let star=new THREE.Mesh(new THREE.SphereGeometry(0.25,24,24),new THREE.MeshStandardMaterial({color:'#fff'}));
  let lightaMI=new THREE.AmbientLight('#fff',0.4);

  let [x,y,z]=new Array(3).fill(1).map((v)=>v=THREE.MathUtils.randFloatSpread(60));
  star.position.set(x,y,z);
  lightaMI.position.set(x,y,z);
  scene.add(star)
}
let backShin=false
new Array(20).fill(1).forEach(addStar)
function animate() {
  requestAnimationFrame( animate );
// sun.rotation.y+=0.01
console.log("before :",shineSun.intensity);
// if(backShin)
// {shineSun.intensity+=0.01
// if(shineSun.intensity>=1)
// backShin=false;}
// else {
// shineSun.intensity-=0.01
// if(shineSun.intensity<=0.5)
// backShin=true;
// }
console.log("after ",shineSun.intensity);
// shineSun.rotation.y+=0.01


  // if(backLight){

  //   lightValue+=1;
  //   if(lightValue>MAX_RANGE){
  //     backLight=false;
  //   }
  // }else {
  //     console.log("is front");
  //     lightValue-=1;
  //     if(lightValue<-MAX_RANGE){
  //       backLight=true;
  //     }
    
  //   }
  //   light.position.x=lightValue
  // earth.rotation.x+=0.01
  earth.rotation.y+=0.01
  // earth.scale.x+=0.01


  controls.update()
	renderer.render( scene, camera );
}
animate();