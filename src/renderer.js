import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class Renderer {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
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

  updateState({
    envMap,
    enableBackdrop,
    backdropTexture,

    geometry,
    metalness,
    roughness,
    transmission,
    ior,
    reflectivity,
    thickness,
    envMapIntensity,
    clearcoat,
    clearcoatRoughness,
    normalScale,
    normalMapTexture,
    clearcoatNormalScale,
    normalRepeat,
  }) {
    let scene = new THREE.Scene();
    this.scene = scene;

    scene.background = envMap;

    // backdrop image plane
    if (enableBackdrop == true && backdropTexture) {
      const bgGeometry = new THREE.PlaneGeometry(6.6666, 5);
      const bgMaterial = new THREE.MeshBasicMaterial({
        map: backdropTexture,
      });
      const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
      bgMesh.position.set(0, 0, -1);
      scene.add(bgMesh);
    }

    // hero mesh
    if (geometry) {
      console.log(normalMapTexture);
      normalMapTexture.repeat.set(normalRepeat, normalRepeat);

      let material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness,
        roughness,
        transmission,
        ior,
        reflectivity,
        thickness,
        envMap: envMap,
        envMapIntensity,
        clearcoat,
        clearcoatRoughness,
        normalScale: new THREE.Vector2(normalScale),
        normalMap: normalMapTexture,
        clearcoatNormalMap: normalMapTexture,
        clearcoatNormalScale: new THREE.Vector2(clearcoatNormalScale),
      });

      let mesh = new THREE.Mesh(geometry, material);
      mesh.scale.set(0.25, 0.25, 0.25);
      scene.add(mesh);
    }
  }

  update(time, { animateCamera }) {
    if (animateCamera) {
      this.camera.position.x = 1.8 * Math.sin((time / 9) * Math.PI * 2);
      this.camera.position.y = 1.8 * Math.cos((time / 9) * Math.PI * 2);
      this.camera.position.z = 4;
      this.camera.lookAt(this.scene.position);
    }
  }

  render(time, state) {
    this.update(time, state);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

export default Renderer;
