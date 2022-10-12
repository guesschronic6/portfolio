import * as THREE from "three";
import { datGui } from "../../context";

function quaternionSample(scene, camera, floor) {
  const cone = new THREE.Mesh(
    new THREE.ConeGeometry(0.5, 3, 3),
    new THREE.MeshStandardMaterial({ color: "lightblue" })
  );
  cone.position.set(0, 2.5, 0);
  scene.add(cone);

  const folder = datGui.addFolder("quaternion");
  folder.add(cone.quaternion, "x").min(-1).max(1).step(0.01);
  folder.add(cone.quaternion, "y").min(-1).max(1).step(0.01);
  folder.add(cone.quaternion, "z").min(-1).max(1).step(0.01);
  folder.add(cone.quaternion, "w").min(-1).max(1).step(0.01);
}

export { quaternionSample };
