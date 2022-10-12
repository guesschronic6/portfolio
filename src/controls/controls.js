import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function addOrbitControls(camera, canvas) {
  const orbitControls = new OrbitControls(camera, canvas);
  orbitControls.enableDamping = true;
  const tick = () => {
    orbitControls.update();
    window.requestAnimationFrame(tick);
  };
  tick();
}

export { addOrbitControls };
