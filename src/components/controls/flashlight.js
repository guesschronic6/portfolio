import * as THREE from "three";
import { datGui, mouse } from "../../context";

const centerVector3 = new THREE.Vector3(0, 0, 0);

function create(scene, camera, origin, target = centerVector3) {
  if (camera) {
    origin = camera.position;
  }

  const flashlight = new THREE.SpotLight("#ff9705", 1.76);
  flashlight.angle = Math.PI * 0.1;
  flashlight.penumbra = 0.18;
  flashlight.position.copy(origin);
  flashlight.target.position.copy(target);
  scene.add(flashlight);
  scene.add(flashlight.target);

  addDatGui(flashlight);
  return flashlight;
}

function addMouseControls(flashlight, scene, camera) {
  const targetPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(25, 25),
    new THREE.MeshBasicMaterial({ color: "white" })
  );
  targetPlane.position.z = 0;
  targetPlane.visible = false;
  scene.add(targetPlane);

  const rayCaster = new THREE.Raycaster();

  const tick = () => {
    console.log(camera.getWorldDirection());
    rayCaster.setFromCamera({ x: mouse.x, y: mouse.y }, camera);
    const intersectObject = rayCaster.intersectObject(targetPlane);
    if (intersectObject.length) {
      const point = intersectObject[0].point;
      flashlight.target.position.copy(point);
    }
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
