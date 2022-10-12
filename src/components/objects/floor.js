import * as THREE from "three";

function create(height, width, material, heightSegments, widthSegments) {
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(height, width, heightSegments, widthSegments),
    material
  );
  floor.rotation.x = -Math.PI * 0.5;
  return floor;
}

export { create };
