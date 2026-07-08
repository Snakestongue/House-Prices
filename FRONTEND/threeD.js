import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";
import {EffectComposer} from "https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/postprocessing/EffectComposer.js";
import {RenderPass} from "https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/postprocessing/RenderPass.js";
import {UnrealBloomPass} from "https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/postprocessing/UnrealBloomPass.js";
let canvas  =document.getElementById("bg")
let scene = new THREE.Scene() //THREE.Scene is in Three.js
/**Scene: Background
 * Camera: Like the POV
 * Lights: Lights (wow)
 * Objects: Cubes, particles, etc
 * Render: Final 
 */

let camera= new THREE.PerspectiveCamera(45, innerWidth/innerHeight, 0.2,1000)
//Creates a camera based off like what you can see (the user not me)
//Argument 1: Field of View (small = zoomed, large = wide (60 is normal, 120 is very wide))
//Argument 2: Aspect: width/height does browser window shape to prevent disortion
//Arg 3: anything closer then .1 dissapears 
//Arg 4: anything farther then 1000 dissapears

camera.position.z=10
//moves camera back z units so no object is blocking your view
//You can also like see more the bigger it is

const renderer= new THREE.WebGLRenderer({//uses YOUR computer's hardware 
    canvas: canvas, //variableon linne 5
    alpha:true,//makes canvas transperant (like body bavkground can showw now)
    antialias:true //makes edges of objects like cubes smooth
})
renderer.setSize(innerWidth,innerHeight) //makes the final image browser width/heigth

/**PARTICLES */
let particles=6000;
let geo = new THREE.BufferGeometry()
//Particles need 4 things: position (xyz), color, size and speed (optional)
//Store this in buffer, built in library

let positions=[]
for(let i= 0; i<particles; i++){ //6000(above)
    positions.push(
        //(-20 -20) random value 3 times for x, y, z position til 6000 times occured
        ( Math.random()-.5 )*40, 
        ( Math.random()-.5 )*40,
        ( Math.random()-.5 )*40
    );
}
geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3) );
//settAttribute sets data
// Position is built in to say i'm giving you the positions for particles un x, y, z format
//the float32buffer thingy converts a JS array into a usable format for GPU
// 3 at the end states ever 3 number is 1 particles

let colors= new THREE.PointsMaterial({ //speicfic library to design my particles
    color:0x38bdf8, //color
    size:.05, //.01 is small, .05 is mid and .2 is large
    transparent:true, //used for opacxity
    opacity:.8//partially see through
})
//all this self-explanatory
const partics= new THREE.Points(
    geo,//location
    colors//style
) //actually makes the particles
scene.add(partics)//adds them to the scene

/**RECTANGLES */
const buildings=[]
for(let i=0;i<15;i++){
    let geometry= new THREE.BoxGeometry( //just a building (a rect prism)
        Math.random()+.3, //width
        Math.random()*2+1,//height
        Math.random()+.3//length/depth
    ) //similarly like particles but this is the width --> height --> length
    const material= new THREE.MeshStandardMaterial({ //how building looks, built in library
        color:0x2563eb,
        wireframe:true, //only edges are drawn
        transparent:true, //same thing as before
        opacity:.4
    })
    const building=new THREE.Mesh(
        geometry,
        material
    )//actually making the building
    building.position.set( //moves into random places
        (Math.random()-0.5)*13, //random x
        (Math.random()-0.5)*12, //random y
        (Math.random()-0.5)*12 //random z
    );
    scene.add(building); //add to scene
    buildings.push(building); //save it
}
/**LIGHT */
scene.add(new THREE.AmbientLight( //general light, no direction
    0xffffff, //light color (white)
    2 //brightness(.5=dim, 1=normal, 2 is bright)
))
let point= new THREE.PointLight( //light bulb light (from source, closer = brighter)
    0x38bdf8,//color
    10,//brightness
    50//max distance
)
point.position.set(
    3,//x
    4,//y
    5//z
)
scene.add(point) //add it

//Bloom like shadow
let composer= new EffectComposer(renderer)
composer.addPass(new RenderPass(scene,camera))
composer.addPass(new UnrealBloomPass(//adds the bloom
    new THREE.Vector2( //tells bloom size of screen
        innerWidth,
        innerHeight
    ),
    1.2, //bloom strenth
    0.5, //how far (radius)
    0.01//what can glow
))

/** MOUSE*/
let mouseX =0 //mouse x
let mouseY = 0 //mouse y

window.addEventListener("mousemove",(e)=>{ //e has mouse position and is the current event onkect
    mouseX =(e.clientX/innerWidth-.5) //makes a range 0-1 and subtracts .5 so -.5---.5
    mouseY=(e.clientY/innerHeight-.5);
})//easier to control for 3d movement
function animate(){
    requestAnimationFrame(animate); // keeps running animate every frame (60 per sec usually)
    camera.position.x += (mouseX*2-camera.position.x)*.02 //moves camera with mouse
    camera.position.y +=(-mouseY*2 -camera.position.y)* .02 //Y is reversed
    partics.rotation.y += .0008; //create a spinning particle cloud
    for (let i =0 ;i < buildings.length;i++){
        let b = buildings[i];
        b.rotation.x += .002 + i * .00005; //rotates slightly and each one different since using i
        b.rotation.y += .008; //y rotate
        b.position.y += 
            Math.sin(
                Date.now() * .001 + i
            ) * .0008; //AI for floating
    }
    composer.render()
}
animate();

//when brower size changes
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
