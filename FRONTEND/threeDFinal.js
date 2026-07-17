import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";
import {EffectComposer} from "https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/postprocessing/EffectComposer.js";
import {RenderPass} from "https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/postprocessing/RenderPass.js";
import {UnrealBloomPass} from "https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/postprocessing/UnrealBloomPass.js";
let canvas  =document.getElementById("bg")
let scene = new THREE.Scene() 
let camera= new THREE.PerspectiveCamera(45, innerWidth/innerHeight, 0.2,1000)
camera.position.z=10

const renderer= new THREE.WebGLRenderer({
    canvas: canvas, 
    alpha:true,
    antialias:true 
})
scene.fog = new THREE.FogExp2( 
    0x001010,
    0.035
);
renderer.setSize(innerWidth,innerHeight)
let particles=10000;
let geo = new THREE.BufferGeometry()
let positions=[]
for(let i= 0; i<particles; i++){ 
    positions.push(
        ( Math.random()-.5 )*50, 
        ( Math.random()-.5 )*50,
        ( Math.random()-.5 )*50
    );
}
geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3) );
let colors= new THREE.PointsMaterial({ 
    color:0xb2f7b2, 
    size:.05,
    transparent:true, 
    opacity:.8
})
const partics= new THREE.Points(
    geo,
    colors
)
scene.add(partics)



const donuts=[]
for(let i=0;i<15;i++){
    let geometry = new THREE.TorusGeometry(
        0.8,  //radius
        0.35, //body thicknesss
        32,
        64
    );
    const material = new THREE.MeshStandardMaterial({
        color: 0xb2f7b2,
        transparent: true,
        opacity: 0.6,
        roughness: 0.4,
        metalness: 0.2,
    });
    const donut=new THREE.Mesh(
        geometry,
        material
    )
    donut.userData.speed = {
        x: Math.random()*0.01,
        y: Math.random()*0.01,
        z: Math.random()*0.01
    };
    donut.position.set( 
        (Math.random()-0.5)*13,
        (Math.random()-0.5)*12, 
        (Math.random()-0.5)*12 
    );
    scene.add(donut); 
    donuts.push(donut); 
}
/**LIGHT */
scene.add(new THREE.AmbientLight(
    0xffffff,
    0.3 
))
let point= new THREE.PointLight( 
    0x38bdf8,
    3,
    50
)
point.position.set(
    3,
    4,
    5
)
scene.add(point)

let composer= new EffectComposer(renderer)
composer.addPass(new RenderPass(scene,camera))
composer.addPass(new UnrealBloomPass(
    new THREE.Vector2( 
        innerWidth,
        innerHeight
    ),
    .6,.4,.2
))
let mouseX =0
let mouseY = 0 

window.addEventListener("mousemove",(e)=>{ 
    mouseX =(e.clientX/innerWidth-.5) 
    mouseY=(e.clientY/innerHeight-.5);
})
function animate(){
    requestAnimationFrame(animate); 
    camera.position.x += (mouseX*2-camera.position.x)*.02 
    camera.position.y +=(-mouseY*2 -camera.position.y)* .02 
    partics.rotation.y += .0008; 
    for (let i =0 ;i < donuts.length;i++){
        let b = donuts[i];
        b.scale.setScalar(
            1 + Math.sin(Date.now()*0.003+i)*0.1 //AI
        )
        b.rotation.x += b.userData.speed.x
        b.rotation.y += b.userData.speed.y
        b.rotation.z += b.userData.speed.z
        b.position.y += 
            Math.sin(
                Date.now() * .001 + i
            ) * .0008; //AI
    }
    composer.render()
}
animate();

window.addEventListener("resize",()=>{
    camera.aspect=innerWidth/innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(
        innerWidth,
        innerHeight
    );
    composer.setSize(
        innerWidth,
        innerHeight
    );
});
