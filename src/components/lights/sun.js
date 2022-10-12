import * as THREE from "three";
import { lightsDatGui } from "./";

function sun() {
  const sun = new THREE.DirectionalLight("white", 0.3);
  sun.position.set(7, 20, 0);

  animateSun(sun);
  addDatGui(sun);

  return sun;
}

function addDatGui(sun) {
  const folder = lightsDatGui.addFolder("sun");
  folder.addColor(sun, "color");
  folder.add(sun, "intensity").min(-1).max(1).step(0.1);
}

const clock = new THREE.Clock();
function animateSun(sun) {
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    sun.position.set(
      Math.cos(elapsedTime / 15) * 15,
      25,
      Math.sin(elapsedTime / 25) * 15
    );

    window.requestAnimationFrame(tick);
  };
  tick();
}

export { sun };
