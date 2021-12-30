import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";
import { LUTPass } from "three/examples/jsm/postprocessing/LUTPass.js";

class Renderer {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
    });
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.renderer.domElement.id = "render-canvas";
    document.body.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(52, 1, 0.01, 100);
    this.camera.position.set(0, 0, 5);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minDistance = 0.5;
    this.controls.maxDistance = 20;
    this.controls.enabled = true;
  }

  resize({ width, height, dpr }) {
    this.size = [width, height];
    this.renderer.setPixelRatio = dpr;
    this.renderer.setSize(width, height);
    if (this.composer) this.composer.setSize(width, height);
    this.camera.aspect = width / innerHeight;
    this.camera.updateProjectionMatrix();
  }

  _createBackdropMesh({ backdropTexture }) {
    if (backdropTexture) {
      const bgGeometry = new THREE.PlaneGeometry(8, 6);
      const bgMaterial = new THREE.MeshBasicMaterial({
        map: backdropTexture,
      });
      const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
      bgMesh.position.set(0, 0, -2);
      return bgMesh;
    }
  }

  _createHeroMesh({
    geometry,

    envMap,

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
    if (!geometry) return;

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

    return mesh;
  }

  _createPostProcessing({
    enableFXAA,
    enableBloom,
    bloomStrength,
    bloomRadius,
    bloomThreshold,
    lut,
  }) {
    const renderPass = new RenderPass(this.scene, this.camera);
    const composer = new EffectComposer(this.renderer);
    composer.addPass(renderPass);

    if (this.size) {
      const [width, height] = this.size;

      if (enableFXAA) {
        let fxaaPass = new ShaderPass(FXAAShader);
        const pixelRatio = this.renderer.getPixelRatio();
        fxaaPass.material.uniforms["resolution"].value.x =
          1 / (width * pixelRatio);
        fxaaPass.material.uniforms["resolution"].value.y =
          1 / (height * pixelRatio);
        composer.addPass(fxaaPass);
      }

      if (enableBloom) {
        const bloomPass = new UnrealBloomPass(
          new THREE.Vector2(width, height),
          bloomStrength,
          bloomRadius,
          bloomThreshold
        );
        composer.addPass(bloomPass);
      }
    }

    composer.addPass(new ShaderPass(GammaCorrectionShader));

    if (lut) {
      let lutPass = new LUTPass();
      lutPass.lut = lut.texture3D;
      lutPass.intensity = 1.2;
      lutPass.enabled = true;
      composer.addPass(lutPass);
    }

    return composer;
  }

  updateState(state) {
    let { envMap, enableBackdrop } = state;

    let scene = new THREE.Scene();
    scene.background = envMap;
    this.scene = scene;

    // backdrop image plane
    if (enableBackdrop) {
      let backdropMesh = this._createBackdropMesh(state);
      if (backdropMesh) scene.add(backdropMesh);
    }

    // hero mesh
    this.mesh = this._createHeroMesh(state);
    if (this.mesh) {
      scene.add(this.mesh);
    }

    // post processing
    this.composer = this._createPostProcessing(state);
  }

  update(time, deltaTime, { animateCamera, rotateMesh }) {
    if (!this.mesh) return;

    if (rotateMesh) {
      const ROTATE_TIME = 18; // Time in seconds for a full rotation
      const rotate = (deltaTime / ROTATE_TIME) * Math.PI * 2;
      const axis = new THREE.Vector3(
        0.2 * Math.sin(time),
        1.0,
        0.2 * Math.cos(time)
      );
      this.mesh.rotateOnWorldAxis(axis, rotate);
    }

    if (animateCamera) {
      this.camera.position.x = 1.2 * Math.sin((time / 9) * Math.PI * 2);
      this.camera.position.y = 1.2 * Math.cos((time / 9) * Math.PI * 2);
      this.camera.position.z = 4;
      this.camera.lookAt(this.mesh.position);
    }
  }

  render(time, deltaTime, state) {
    this.update(time, deltaTime, state);
    this.controls.update();
    if (this.composer) {
      this.composer.render(this.scene, this.camera);
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }
}

export default Renderer;
