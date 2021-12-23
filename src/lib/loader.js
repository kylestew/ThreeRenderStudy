import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

import modelUrl from "/assets/dragon.glb?url";
import textureUrl from "/assets/texture.jpg?url";
import hdrUrl from "/assets/empty_warehouse_01_2k.hdr?url";

function loadGeometry(callback) {
  new GLTFLoader().load(modelUrl, (gltf) => {
    const dragon = gltf.scene.children.find((mesh) => mesh.name === "Dragon");

    // Just copy the geometry from the loaded model
    const geometry = dragon.geometry.clone();

    // Adjust geometry to suit our scene
    geometry.rotateX(Math.PI / 2);
    geometry.translate(0, -4, 0);

    callback(geometry);

    // Discard the loaded model
    gltf.scene.children.forEach((child) => {
      child.geometry.dispose();
      child.material.dispose();
    });
  });
}

function loadTextures(callback) {
  const textureLoader = new THREE.TextureLoader();
  const bgTexture = textureLoader.load(textureUrl);

  callback({ bgTexture });
}

function loadEnvironmentMap(callback) {
  new RGBELoader().load(hdrUrl, (envMap) => {
    envMap.mapping = THREE.EquirectangularReflectionMapping;
    callback(envMap);
  });
}

export { loadGeometry, loadTextures, loadEnvironmentMap };
