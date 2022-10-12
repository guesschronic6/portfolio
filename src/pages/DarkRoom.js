import * as THREE from "three";
import * as components from "../components";
import { materials } from "../components";
import { size } from "../context";
import * as controls from "../controls";

function DarkRoom() {
  components.addStats();
  document.querySelector(".primary-background").remove();
  document.querySelector(".content-container").remove();
  const canvas = document.querySelector("canvas.webgl");
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#a3d1ff");
  const camera = new THREE.PerspectiveCamera(
    55,
    size.width / size.height,
    0.001,
    2000
  );
  camera.position.set(0, 15, 15);
  scene.add(camera);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  controls.events.handleWindowResize(camera, renderer);
  controls.addOrbitControls(camera, canvas);
  controls.events.handleMouseEvents();

  /* 
    Lights
  */
  const sun = new THREE.DirectionalLight("white", 0.8);
  sun.position.set(100, 100, 100);
  scene.add(sun);

  scene.add(new THREE.AmbientLight("white", 0.7));

  /* Objects */

  const floor = components.objects.floor.create(50, 50, materials.concrete);
  components.util.addUV2(floor);
  components.repeatMaterial(floor.material, 10);

  scene.add(floor);

  /* 
    Interactive

  */
  // const flashlight = components.controls.flashlight.create(scene, camera);
  // components.controls.flashlight.addMouseControls(flashlight, scene, camera, [
  //   floor,
  // ]);

  /* 
  
    Testings
  */
  // components.playthings.lerpSample(scene, camera, floor);
  components.playthings.quaternionSample(scene, camera, floor);
  scene.add(new THREE.AxesHelper(10));

  const animate = () => {
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
  };
  animate();
}

export { DarkRoom };
