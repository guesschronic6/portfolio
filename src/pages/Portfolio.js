import * as THREE from "three";
import { Vector3 } from "three";
import * as components from "../components";
import * as cameras from "../components/cameras";
import * as heaven from "../components/heaven";
import * as lights from "../components/lights";
import { size } from "../context";
import * as controls from "../controls";

function Portfolio() {
  /* Initializations */

  const scene = new THREE.Scene();
  const camera = cameras.main();
  scene.add(camera);
  // controls.addOrbitControls(camera, canvas);

  const renderer = components.buildRenderer();
  controls.events.handleWindowResize(camera, renderer);

  /* 
  Lights
*/

  scene.add(lights.ambient());
  scene.add(lights.sun());
  scene.add(lights.hemisphere());

  /* 
  Obects
*/

  scene.add(heaven.Stars(700, 50));
  scene.add(heaven.Asteroids(35, 2.5, 0.5, 45));
  const asteroid = heaven.Asteroid({
    size: 7,
    detail: 6,
    position: [50, 0, 0],
  });
  scene.add(asteroid);

  let scrollY = 0;

  window.addEventListener("scroll", () => {
    scrollY = window.scrollY;
  });

  const centerVector = new Vector3(0, 0, 0);
  const animate = () => {
    const screenNumber = scrollY / size.height;
    const screenSection = Math.ceil(screenNumber);
    if (screenSection <= 1) {
      camera.position.x = screenNumber * 65;
      camera.position.z = -screenNumber * 25 + 12;
      camera.lookAt(centerVector);
    } else if (screenSection == 2) {
    }
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
  };
  animate();
}

export { Portfolio };
