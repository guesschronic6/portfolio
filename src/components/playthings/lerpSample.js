import * as THREE from "three";
import { mouse } from "../../context";

function createBox(type = "object") {
  const materialParams =
    type == "object"
      ? {
          color: "blue",
        }
      : {
          color: "red",
          wireframe: true,
          transparent: true,
        };

  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshStandardMaterial(materialParams);
  const box = new THREE.Mesh(geometry, material);
  box.position.y = 2 / 2;
  return box;
}

function lerpSample(scene, camera, floor) {
  const objectBox = createBox("object");
  const refGuideBox = createBox("guide");
  const targetBox = createBox("guide");
  targetBox.material.wireframe = false;
  targetBox.material.opacity = 0.6;
  targetBox.geometry.scale(0.9, 0.9, 0.9);
  scene.add(objectBox, refGuideBox);

  const wall = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({ color: "white" })
  );
  wall.position.set(0, 5, -25);
  scene.add(wall);
  addControls(camera, [floor, wall], refGuideBox, objectBox, targetBox);
}

function addControls(camera, objects, refGuideBox, objectBox, targetBox) {
  const rayCaster = new THREE.Raycaster();
  let isMouseDown = false;

  document.addEventListener("mousedown", () => {
    isMouseDown = true;
  });

  const lerpVector = new THREE.Vector3(0, 0, 0);
  const clock = new THREE.Clock();
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    rayCaster.setFromCamera({ x: mouse.x, y: mouse.y }, camera);
    const intersectedObjects = rayCaster.intersectObjects(objects);
    if (intersectedObjects.length) {
      const point = intersectedObjects[0].point;
      refGuideBox.position.lerp(
        lerpVector.set(
          Math.floor((point.x + 1) / 2) * 2,
          Math.floor((point.y + 1) / 2) * 2 + 1,
          Math.floor((point.z + 1) / 2) * 2
        ),
        0.1
      );
    }
    if (isMouseDown) {
      isMouseDown = false;
      targetBox.position.copy(refGuideBox.position);
    }
    objectBox.position.lerp(targetBox.position, 0.1);
    window.requestAnimationFrame(tick);
  };
  tick();
}

export { lerpSample };
