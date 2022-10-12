/* 
    handles window resize
*/

import { mouse, size } from "../context";

function handleWindowResize(camera, renderer) {
  updateCanvas(camera, renderer);
  window.addEventListener("resize", (event) => {
    updateCanvas(camera, renderer);
  });
}

function updateCanvas(camera, renderer) {
  const { width, height } = getCanvasSize();
  size.width = width;
  size.height = height;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function handleMouseEvents() {
  window.addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / size.width) * 2 - 1;
    mouse.y = Math.abs(event.clientY / size.height - 1) * 2 - 1;
  });
}

function getCanvasSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export { handleWindowResize, updateCanvas, handleMouseEvents };
