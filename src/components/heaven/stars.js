import * as THREE from "three";
import { heavensDatGui } from "./index";

const material = new THREE.PointsMaterial({
  color: "white",
  transparent: false,
  opacity: 1,
  size: 0.05,
  sizeAttenuation: true,
});

function Stars(count, size) {
  //generate random points
  const points = generateRandomStarCoordinates(count, size);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(points, 3));
  const starParticles = new THREE.Points(geometry, material);
  animateStars(starParticles);
  addDatGui();
  return starParticles;
}

function generateRandomStarCoordinates(count, size) {
  const points = new Float32Array(count * 3);
  //generate random points
  new Array(count).fill(0).forEach((_, index) => {
    points[index] = (Math.random() - 0.5) * size;
    points[index + 1] = (Math.random() - 0.5) * size;
    points[index + 2] = ((Math.random() - 0.5) * size) / 2;
  });
  return points;
}

function addDatGui() {
  const folder = heavensDatGui.addFolder("stars");
  folder.addColor(material, "color");
  folder.add(material, "size").min(0).max(1).step(0.01);
  folder.add(material, "opacity").min(0).max(1).step(0.01);
}

const clock = new THREE.Clock();
function animateStars(stars) {
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    stars.rotation.set(elapsedTime / 50, elapsedTime / 65, 0);

    window.requestAnimationFrame(tick);
  };
  tick();
}

export { Stars };
