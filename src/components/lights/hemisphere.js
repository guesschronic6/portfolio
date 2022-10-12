import * as THREE from "three";
import { lightsDatGui } from "./index";

function hemisphere() {
  const hemisphereLight = new THREE.HemisphereLight("pink", "blue", 0.6);
  addDatGui(hemisphereLight);
  return hemisphereLight;
}

function addDatGui(light) {
  const folder = lightsDatGui.addFolder("hemisphere");
  folder.addColor(light, "color").name("sky");
  folder.addColor(light, "groundColor").name("ground");
  folder.add(light, "intensity").min(-1).max(1).step(0.1);
}

export { hemisphere };
