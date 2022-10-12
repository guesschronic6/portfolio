import * as dat from "lil-gui";
import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

const size = {
  width: window.innerHeight,
  height: window.innerHeight,
};

const mouse = {
  x: 0,
  y: 0,
};

const datGui = new dat.GUI();
datGui.close();
export { datGui, textureLoader, size, mouse };
