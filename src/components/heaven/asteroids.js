import * as THREE from "three";
import { textureLoader } from "../../context";
import { heavensDatGui } from "./index";

const gradientTexture = textureLoader.load("/textures/gradients/3.jpg");
const material = new THREE.MeshToonMaterial({
  color: "#a9b6fe",
  gradientMap: gradientTexture,
});
material.gradientMap.magFilter = THREE.NearestFilter;
material.gradientMap.minFilter = THREE.NearestFilter;
material.gradientMap.generateMipmaps = false;

function Asteroids(count, maxSize, minSize, space) {
  const asteroids = new THREE.Group();
  generateAsteroids(count, maxSize, minSize, space).forEach((asteroid) =>
    asteroids.add(asteroid)
  );
  addDatGui();
  moveAsteroids(asteroids);

  return asteroids;
}

function generateAsteroids(count, maxSize = 2.5, minSize = 1, space = 20) {
  const asteroidArr = [];
  for (let i = 0; i < count; i++) {
    const asteroidMesh = Asteroid({
      size: Math.max(minSize, Math.random() * maxSize),
      detail: Math.floor(Math.random() * 3 + 1),
      position: [
        (Math.random() - 0.5) * space,
        (Math.random() - 0.5) * 10 - 5,
        (Math.random() - 0.5) * space,
      ],
    });

    asteroidArr[i] = asteroidMesh;
  }
  return asteroidArr;
}

function Asteroid({ size, detail, position }) {
  const geometry = new THREE.OctahedronGeometry(size, detail);
  const asteroidMesh = new THREE.Mesh(geometry, material);
  asteroidMesh.position.set(position[0], position[1], position[2]);
  return asteroidMesh;
}
const clock = new THREE.Clock();
function moveAsteroids(asteroid) {
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    asteroid.rotation.y = elapsedTime / 50;
    window.requestAnimationFrame(tick);
  };
  tick();
}

function addDatGui(asteroid) {
  const folder = heavensDatGui.addFolder("asteroids");
  folder.addColor(material, "color");
}

export { Asteroids, moveAsteroids, Asteroid };
