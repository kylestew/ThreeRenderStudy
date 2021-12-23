import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import modelUrl from "/assets/dragon.glb?url";

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

export { loadGeometry };
