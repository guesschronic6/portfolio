import * as THREE from "three";
import { datGui } from "../../context";

const centerVector3 = new THREE.Vector3(0, 0, 0);

function create(scene, camera, origin, target = centerVector3) {
  if (camera) {
    origin = camera.position;
  }

  const flashlight = new THREE.SpotLight("#ff9705", 0.2);
  flashlight.angle = Math.PI * 0.1;
  flashlight.penumbra = 0.18;
  flashlight.position.copy(origin);
  flashlight.distance = 25;
  flashlight.target.position.copy(target);
  scene.add(flashlight);
  scene.add(flashlight.target);

  addDatGui(flashlight);

  const tick = () => {
    flashlight.position.copy(camera.position);
    window.requestAnimationFrame(tick);
  };

  tick();

  return flashlight;
}

const flaslightTargetVector = new THREE.Vector3(0, 0, 0);

function addMouseControls(flashlight, scene, camera, objects = []) {
  const tick = () => {
    camera.getWorldDirection(flaslightTargetVector);
    flaslightTargetVector.multiplyScalar(50);
    flashlight.target.position.copy(flaslightTargetVector);
    window.requestAnimationFrame(tick);
  };
  tick();
}

function addDatGui(flashlight) {
  const folder = datGui.addFolder("flashlight");
  folder.addColor(flashlight, "color");
  folder.add(flashlight, "intensity").min(-1).max(2).step(0.01);
  folder.add(flashlight, "penumbra").min(-1).max(2).step(0.01);
  folder.add(flashlight, "angle").min(-1).max(2).step(0.01);
}

export { create, addMouseControls };
