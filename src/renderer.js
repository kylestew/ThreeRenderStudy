import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class Renderer {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
    });
    this.renderer.setClearColor(0x1f1e1c, 1);
    document.body.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(52, 1, 0.01, 100);
    this.camera.position.set(0, 0, 5);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minDistance = 0.5;
    this.controls.maxDistance = 20;
    this.controls.enabled = true;
  }

  resize({ width, height, dpr }) {
    this.renderer.setPixelRatio = dpr;
    this.renderer.setSize(width, height);
    // this.composer.setSize(width, height);
    this.camera.aspect = width / innerHeight;
    this.camera.updateProjectionMatrix();
  }

  updateState({ geometry, metalness, roughness, envMap, textures }) {
    let scene = new THREE.Scene();
    this.scene = scene;

    scene.background = envMap;

    // backdrop image plane
    // if (textures.bgTexture) {
    //   const bgGeometry = new THREE.PlaneGeometry(8, 8);
    //   const bgMaterial = new THREE.MeshBasicMaterial({
    //     map: textures.bgTexture,
    //   });
    //   const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
    //   bgMesh.position.set(0, 0, -1);
    //   scene.add(bgMesh);
    // }

    // hero mesh
    if (geometry) {
      let material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: metalness,
        roughness: roughness,

        envMap: envMap,
      });

      let mesh = new THREE.Mesh(geometry, material);
      mesh.scale.set(0.25, 0.25, 0.25);
      scene.add(mesh);
    }
  }

  update(time, deltaTime) {
    // this.camera.position.x = Math.sin((time / 10) * Math.PI * 2) * 2;
    // this.camera.position.y = Math.cos((time / 10) * Math.PI * 2) * 2;
    // this.camera.position.z = 4;
    // this.camera.lookAt(this.scene.position);
  }

  render(time) {
    time /= 1000.0;
    this.update(time);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

export default Renderer;
