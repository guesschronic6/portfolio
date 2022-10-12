import * as THREE from "three";
import { size } from "../context";

function buildRenderer() {
  const canvas = document.querySelector("canvas.webgl");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  return renderer;
}
export { buildRenderer };
