import * as THREE from 'three';
import { OrbitControls } from "jsm/controls/OrbitControls.js"

// ------------- Set Up The Renderer -------------
// Get the current width and height of the browser window
const window_width = window.innerWidth;
const window_height = window.innerHeight;

// Create a WebGL renderer with antialiasing enabled to smooth out edges
const renderer = new THREE.WebGLRenderer({ antialias: true });

// Set the size of the renderer to match the width and height of the browser window
renderer.setSize(window_width, window_height);

// Append the renderer's canvas element to the HTML document body so it displays on the page
document.body.appendChild(renderer.domElement);

// -------------- Set Up The Camera --------------
// Set the field of view (FOV) of the camera to 75 degrees
const fov = 75;

// Calculate the aspect ratio based on the window dimensions (width divided by height)
const aspect = window_width / window_height;

// Set the near clipping plane, which is the minimum distance from the camera at which objects are visible (0.1 units away)
const near = 0.1;

// Set the far clipping plane, which is the maximum distance from the camera at which objects are visible (10 units away)
const far = 10;

// Create a perspective camera with the specified field of view, aspect ratio, near, and far clipping planes
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

// Set the camera's position along the z-axis to 2 units away from the origin
camera.position.z = 2;

// -------------- Set Up The Scene ---------------
// Create a new empty scene where 3D objects will be placed
const scene = new THREE.Scene();


// --------------- Animate & Test ----------------
// Create orbit controls to allow the camera to rotate around the scene
// It lets the user click and drag to move the camera view
const controls = new OrbitControls(camera, renderer.domElement);

// Enable damping (smooth dragging) in the controls, so motion continues after the user stops dragging
controls.enableDamping = true;

// Set how much damping will slow the motion (the "smoothness" of the controls)
controls.dampingFactor = 0.03;

// Create an icosahedron geometry (a 3D shape with 20 faces) with radius 1.0 and 2 levels of detail
const geo = new THREE.IcosahedronGeometry(1.0, 2);

// Create a standard material with white color and flat shading to give a stylized look (no gradients)
const nat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true
});

// Create a mesh from the geometry and material, combining the shape with its appearance
const mesh = new THREE.Mesh(geo, nat);

// Add the mesh (icosahedron) to the scene so it can be rendered
scene.add(mesh);

// Create a hemisphere light that shines from the top (sky) with one color and the bottom (ground) with another color
const hemiLight = new THREE.HemisphereLight(0x009ff, 0xaa5500);

// Add the hemisphere light to the scene to illuminate objects
scene.add(hemiLight);

// Create a basic material for a wireframe version of the mesh (edges only), with white color
const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
});

// Create a wireframe mesh from the same geometry as the solid icosahedron
const wireMesh = new THREE.Mesh(geo, wireMat);

// Slightly scale up the wireframe to avoid overlapping with the solid mesh (so it's more visible)
wireMesh.scale.setScalar(1.001);

// Add the wireframe as a child of the solid mesh so they move together
mesh.add(wireMesh);

// Define the animation function, which will be called every frame
function animate(t = 0) {
    // (Optional: Uncomment to log the time in milliseconds)
    // console.log(t);

    // Request the next frame of animation, so this function runs continuously
    requestAnimationFrame(animate);

    // (Optional: Uncomment to make the mesh expand and contract by scaling)
    // mesh.scale.setScalar(Math.cos(t * 0.001) + 1.0);

    // Rotate the mesh slowly around the Y-axis (vertical axis) based on time
    mesh.rotation.y = t * 0.0001;

    // Render the current state of the scene using the camera
    renderer.render(scene, camera);

    // Update the orbit controls to apply the damping and any user interactions
    controls.update();
}

// Start the animation loop
animate();
