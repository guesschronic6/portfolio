import * as THREE from "three";

function addUV2(object) {
  object.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(object.geometry.attributes.uv.array, 2)
  );
}

export { addUV2 };
