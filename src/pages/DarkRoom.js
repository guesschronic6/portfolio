import * as THREE from "three";
import * as components from "../components";
import { materials } from "../components";
import { size } from "../context";
import * as controls from "../controls";

function DarkRoom() {
  document.querySelector(".primary-background").remove();
  document.querySelector(".content-container").remove();
  const canvas = document.querySelector("canvas.webgl");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    55,
    size.width / size.height,
    0.001,
    50
  );
  camera.position.set(0, 17, 17.5);
  camera.lookAt(new THREE.Vector3(0, 15, 0));
  scene.add(camera);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  controls.events.handleWindowResize(camera, renderer);
  controls.addOrbitControls(camera, canvas);
  controls.events.handleMouseEvents();

  /* 
    Lights
  */
  scene.add(new THREE.DirectionalLight("white", 0.1));
  scene.add(new THREE.AmbientLight("white", 0.1));
  const flashlight = components.controls.flashlight.create(scene, camera);
  components.controls.flashlight.addMouseControls(flashlight, scene, camera);

  /* Objects */

  const floor = components.objects.floor.create(35, 35, materials.concrete);
  scene.add(floor);
  const mousePos = {
    x: 0,
    y: 0,
  };

  const animate = () => {
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
  };
  animate();
}

export { DarkRoom };
