import * as THREE from "three";
import { datGui } from "../../context";
import * as factory from "../../factory";

function Name(name, scene) {
  const nameFolder = datGui.addFolder("name");
  const textMaterial = new THREE.MeshStandardMaterial();
  let textMesh = null;
  factory.text.generate3DText(
    name,
    {
      size: 2,
      height: 1,
      curveSegments: 16,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.1,
      bevelOffset: 0.02,
      bevelSegments: 12,
    },
    textMaterial,
    (text) => {
      textMesh = text;
      scene.add(text);

      nameFolder.add(textMesh.material, "wireframe");
      nameFolder.addColor(textMesh.material, "color");
    }
  );
}

export { Name };
