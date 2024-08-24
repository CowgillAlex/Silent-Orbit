import * as THREE from '../Three/Three.js'; // Adjust path as necessary
import { generateGridArray, renderGrid } from './grid.js';
import { handleKeyPress, handleKeyDown, handleKeyUp } from './input.js';
import * as stats from '../scripts/stats.js'
import * as GUI from './ui.js';
import { Sky} from '../jsm/objects/Sky.js'
import { Player } from './player.js';
// Initialize Three.js components
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myCanvas') });
renderer.toneMapping = THREE.ACESFilmicToneMapping;
				renderer.toneMappingExposure = 0.5;
const parallaxSpeed = 0.005; // Speed of parallax effect
var stat = new stats.Stats()
let sky, sun;
function initSky() {

    // Add Sky
    sky = new Sky();
    sky.scale.setScalar( 450000 );
    scene.add( sky );

    sun = new THREE.Vector3();

    /// GUI

    const effectController = {
        turbidity: 0,
        rayleigh: 1.618,
        mieCoefficient: 0.005,
        mieDirectionalG: 0.7,
        elevation: 0,
        azimuth: 0,
        exposure: 0.5
    };
    const uniforms = sky.material.uniforms;
					uniforms[ 'turbidity' ].value = effectController.turbidity;
					uniforms[ 'rayleigh' ].value = effectController.rayleigh;
					uniforms[ 'mieCoefficient' ].value = effectController.mieCoefficient;
					uniforms[ 'mieDirectionalG' ].value = effectController.mieDirectionalG;

					const phi = THREE.MathUtils.degToRad( 90 - effectController.elevation );
					const theta = THREE.MathUtils.degToRad( effectController.azimuth );

					sun.setFromSphericalCoords( 1, phi, theta );

					uniforms[ 'sunPosition' ].value.copy( sun );

					renderer.toneMappingExposure = effectController.exposure;
					


    

    
}

stat.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stat.dom);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x576584); // Set background color to light blue
initSky()
// Set texture filtering to NearestFilter for pixelated look
const textureLoader = new THREE.TextureLoader();
//textureLoader.magFilter = THREE.NearestFilter;
//textureLoader.minFilter = THREE.NearestFilter;
const skypic = textureLoader.load("STAR.png")
skypic.minFilter = THREE.NearestFilter
skypic.magFilter = THREE.NearestFilter
skypic.wrapS = THREE.RepeatWrapping;
skypic.wrapT = THREE.RepeatWrapping;
skypic.repeat.set(8, 8); // Adjust the repeat to cover the screen
const skymat = new THREE.MeshBasicMaterial(
    {
        map: skypic,
        transparent: true,
        opacity: 1.0
    }
);
const skygeometry = new THREE.PlaneGeometry(window.innerHeight, window.innerHeight);
const backgroundMesh = new THREE.Mesh(skygeometry, skymat);


backgroundMesh.position.z = -100; // Adjust based on your scene's depth
scene.add(backgroundMesh)

const moon = textureLoader.load("moon.png")
moon.minFilter = THREE.NearestFilter
moon.magFilter = THREE.NearestFilter
const moonMaterial = new THREE.MeshBasicMaterial(
    {
        map: moon,
        
        transparent: true,
        opacity: 1.0
    }
);
const moonGeometry = new THREE.PlaneGeometry(32, 32)

const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial )
moonMesh.position.set(0, 0, -100)
scene.add(moonMesh)



//City Background
const cityBackground = textureLoader.load("City Background.png")
cityBackground.minFilter = THREE.NearestFilter
cityBackground.magFilter = THREE.NearestFilter
cityBackground.wrapS = THREE.RepeatWrapping;
cityBackground.repeat.set(3, 1)

const cityBackgroundMaterial = new THREE.MeshBasicMaterial(
    {
        map: cityBackground,
        transparent: true,
        opacity: 1.0
    }
)
const cityBackgroundGeometry = new THREE.PlaneGeometry(
    1200, 240
)
const cityBackgroundMesh = new THREE.Mesh(cityBackgroundGeometry, cityBackgroundMaterial)

scene.add(cityBackgroundMesh)
cityBackgroundMesh.position.set(0, 10, -16)

//City Foreground
const cityForeground = textureLoader.load("City Foreground.png")
cityForeground.minFilter = THREE.NearestFilter
cityForeground.magFilter = THREE.NearestFilter
cityForeground.wrapS = THREE.RepeatWrapping
cityForeground.repeat.set(3,1)
const cityForegroundMaterial = new THREE.MeshBasicMaterial({
    map: cityForeground,
    transparent: true,
    opacity: 1.0

})
const cityForegroundGeometry = new THREE.PlaneGeometry(600,120)
const cityForegroundMesh = new THREE.Mesh(cityForegroundGeometry, cityForegroundMaterial)
scene.add(cityForegroundMesh)
cityForegroundMesh.position.set(0,10,-16)
// Grid dimensions and spacing
const gridSize = 80; // Number of squares per row and column
const squareSize = 1.5; // Size of each square (plane)
//const squareSize = 0.4
// Create grid using function from grid.js
const gridArray = generateGridArray(gridSize)
renderGrid(scene, gridArray, squareSize, textureLoader);

// Position the camera to view the grid
camera.position.set(0, 0, 10); // Move the camera back along the z-axis to view the grid

// Add ambient light to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 1.75); // Soft white light
scene.add(ambientLight);

// Event listener for keyboard input
document.addEventListener('keydown', (event) => handleKeyDown(camera, event), false);
document.addEventListener('keyup', (event) => handleKeyUp(camera, event), false);

// Function to handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);
function moveCamera() {
    camera.position.x = GUI.gui.children[0].object.cameraX
    camera.position.y = GUI.gui.children[1].object.cameraY
    camera.position.z = GUI.gui.children[2].object.cameraZ

}
function animate() {
    requestAnimationFrame(animate);
    stat.begin()
    // Call your handleKeyPress function to handle movement
    handleKeyPress(camera);
    const offsetX = camera.position.x * parallaxSpeed;
    const offsetY = camera.position.y * parallaxSpeed;
     // Update texture offset for parallax effect
     skypic.offset.x = offsetX;
     skypic.offset.y = offsetY;
    //console.log(camera.position)
    // Ensure texture wraps seamlessly
    if (skypic.offset.x > 1) skypic.offset.x -= 1;
    if (skypic.offset.y > 1) skypic.offset.y -= 1;


    // Render your scene
    //camera.position.set(GUI.gui.children[0].object.cameraX,GUI.gui.children[0].object.cameraY, -10 )
    moveCamera()
    moonMesh.position.set((camera.position.x*parallaxSpeed - 69), camera.position.y*parallaxSpeed + 200, -400)
    cityForegroundMesh.position.set(camera.position.x*parallaxSpeed,camera.position.y*parallaxSpeed-24,-50)
    cityBackgroundMesh.position.set(camera.position.x*parallaxSpeed, camera.position.y*parallaxSpeed, -100)

    renderer.render(scene, camera);
    stat.end()
}
animate();
