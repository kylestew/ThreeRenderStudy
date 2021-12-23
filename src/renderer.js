import * as THREE from "three";

class Renderer {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
    });
    this.renderer.setClearColor(0x1f1e1c, 1);
    document.body.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);
    this.camera.position.set(0, 0, 5);
  }

  resize({ width, height, dpr }) {
    console.log(width, height, dpr);
    this.renderer.setPixelRatio = dpr;
    this.renderer.setSize(width, height);
    // this.composer.setSize(width, height);
    this.camera.aspect = width / innerHeight;
    this.camera.updateProjectionMatrix();
  }

  updateState({ geometry }) {
    let scene = new THREE.Scene();
    this.scene = scene;

    if (geometry) {
      let material = new THREE.MeshBasicMaterial();
      let mesh = new THREE.Mesh(geometry, material);
      mesh.scale.set(0.25, 0.25, 0.25);
      scene.add(mesh);
    }
  }

  update(time, deltaTime) {}

  render(time) {
    // console.log("render", time);
    this.renderer.render(this.scene, this.camera);
  }
}

export default Renderer;
