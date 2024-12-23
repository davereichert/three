


// Set up the scene, camera, and renderer
const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new Three.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

// Set the renderer size and camera position
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Add a directional light
const directionalLight = new Three.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 0, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Example: add a soft ambient light
const ambientLight = new Three.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);



// Clock to track elapsed time (for the pulsation)
const clock = new Three.Clock();

// Global reference to the heart object
let heartObj;

// Load the heart object
const objLoader = new OBJLoader();
objLoader.load('./heart.obj', (obj) => {
  // Traverse all children of the loaded OBJ
  obj.traverse((child) => {
    if (child.isMesh) {
      // Assign a red MeshStandardMaterial
      child.material = new Three.MeshStandardMaterial({ color: 0xff0000 });
    }
  });

  // Optionally rotate and position the OBJ so it faces the camera as desired
  obj.rotation.x = -Math.PI / 2; // Rotate 90 degrees around X
  // obj.rotation.y = Math.PI / 2; 
  // obj.rotation.z = 0;
  obj.position.set(0, 0, -10);
  // Add the object to the scene
  scene.add(obj);
  heartObj = obj;
  // Start the animation loop
  animate();
});

function animate() {
  requestAnimationFrame(animate);

  // Rotate the heart object
  const elapsedTime = clock.getElapsedTime();

  if (heartObj) {
    // Example: continuously rotate around Z
    heartObj.rotation.z += 0.003;

    // Pulsation effect using a sinusoidal scale
    // Adjust amplitude (0.1) and frequency (2) to taste
    const scaleFactor = 1 + 0.1 * Math.sin(elapsedTime * 5);
    heartObj.scale.set(scaleFactor, scaleFactor, scaleFactor);
  }


  renderer.render(scene, camera);
}

const bg = new Three.TextureLoader().load('./bg.jpg');
scene.background = bg;

