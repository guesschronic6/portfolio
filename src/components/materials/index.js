import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

const concreteUrl = "/textures/concretes/lumpy-wet-concrete";
const textures = {
  concrete: {
    color: textureLoader.load(`${concreteUrl}/color.jpg`),
    ao: textureLoader.load(`${concreteUrl}/ao.jpg`),
    height: textureLoader.load(`${concreteUrl}/height.jpg`),
    metalness: textureLoader.load(`${concreteUrl}/metalness.jpg`),
    roughness: textureLoader.load(`${concreteUrl}/roughness.jpg`),
    normal: textureLoader.load(`${concreteUrl}/normal.png`),
  },
};

const materials = {
  concrete: new THREE.MeshStandardMaterial({
    aoMap: textures.concrete.ao,
    map: textures.concrete.color,
    normalMap: textures.concrete.normal,
    metalnessMap: textures.concrete.metalness,
    roughnessMap: textures.concrete.roughness,
  }),
};

export { textures, materials };
