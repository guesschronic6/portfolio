import * as THREE from "three";
import { lightsDatGui } from "./";

function ambient() {
  const ambientLight = new THREE.AmbientLight("white", 0.2);
  addDatGui(ambientLight);
  return ambientLight;
}

/* 
        devonly
    */
function addDatGui(ambientLight) {
  const folder = lightsDatGui.addFolder("ambient");
  folder.addColor(ambientLight, "color");
  folder.add(ambientLight, "intensity").min(-1).max(1).step(0.1);
}

export { ambient };
