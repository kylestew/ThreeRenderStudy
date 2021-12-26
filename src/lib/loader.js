import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

import modelUrl from "/assets/dragon.glb?url";
import backdropTextureUrl from "/assets/dan-cristian-padure-SMSLyc9FHl0-unsplash.jpg?url";
import normalMapUrl from "/assets/normal.jpg?url";

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

  const backdropTexture = textureLoader.load(backdropTextureUrl);

  const normalMapTexture = textureLoader.load(normalMapUrl);
  normalMapTexture.wrapS = THREE.RepeatWrapping;
  normalMapTexture.wrapT = THREE.RepeatWrapping;

  callback({ backdropTexture, normalMapTexture });
}

function loadEnvironmentMap(url, callback) {
  new RGBELoader().load(url, (envMap) => {
    envMap.mapping = THREE.EquirectangularReflectionMapping;
    callback(envMap);
  });
}

export { loadGeometry, loadTextures, loadEnvironmentMap };
