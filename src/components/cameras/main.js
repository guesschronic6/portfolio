import * as THREE from "three";
import { size } from "../../context";
import { camerasDatGui } from "./index";

function main() {
  const camera = new THREE.PerspectiveCamera(
    55,
    size.width / size.height,
    0.001,
    200
  );
  camera.position.set(0, 2, 14);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  addDatGui(camera);
  return camera;
}

function addDatGui(camera) {
  const folder = camerasDatGui.addFolder("main");
  folder
    .add(camera, "fov")
    .min(0)
    .max(95)
    .onChange(() => camera.updateProjectionMatrix());
  folder
    .add(camera, "near")
    .min(0)
    .max(2)
    .step(0.001)
    .onChange(() => camera.updateProjectionMatrix());
  folder
    .add(camera, "far")
    .min(0)
    .max(300)
    .step(0.01)
    .onChange(() => camera.updateProjectionMatrix());
}

export { main };
