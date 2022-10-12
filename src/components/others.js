import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { size } from "../context";

function addStats() {
  const stats = Stats();
  document.body.appendChild(stats.dom);

  const tick = () => {
    stats.update();
    window.requestAnimationFrame(tick);
  };
  tick();
}

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

export { buildRenderer, addStats };
