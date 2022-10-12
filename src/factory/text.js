import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

const fontLoader = new FontLoader();

/* 
    Generates 3D text
*/
function generate3DText(text, geometryProps, material, callback) {
  fontLoader.load("/fonts/helvetiker_bold.typeface.json", (font) => {
    const geometry = new TextGeometry(text, {
      font,
      ...geometryProps,
    });
    geometry.center();
    const textMesh = new THREE.Mesh(geometry, material);
    callback(textMesh);
  });
}
export { generate3DText };
