import { loadGeometry, loadTextures, loadEnvironmentMap } from "./lib/loader";
import HDR_OPTIONS from "./lib/hdrs";

const state = {
  hdrKey: HDR_OPTIONS.keys[0],
  envMap: undefined,
  enableBackdrop: true,
  backdropTexture: undefined,
  animateCamera: false,
  rotateMesh: true,

  metalness: 0,
  roughness: 0.35,
  transmission: 1,
  ior: 1.6,
  reflectivity: 0.6,
  thickness: 4.0,
  envMapIntensity: 2.0,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
  normalScale: 0.5,
  clearcoatNormalScale: 0.3,
  normalRepeat: 3,

  bloomThreshold: 0.8,
  bloomStrength: 0.4,
  bloomRadius: 0.5,
};

function loadHDR(key) {
  let url = HDR_OPTIONS.urlForKey(key);
  loadEnvironmentMap(url, (hdr) => {
    state.envMap = hdr;
    state.updateFn();
  });
}

function createState(updateFn) {
  state.updateFn = updateFn;

  // delay loading of extra state so initial state can return
  setTimeout(() => {
    loadTextures((textures) => {
      Object.entries(textures).map((entry) => {
        state[entry[0]] = entry[1];
      });
      state.updateFn();
    });

    loadGeometry((geometry) => {
      state.geometry = geometry;
      state.updateFn();
    });

    loadHDR(state.hdrKey);
  }, 0);

  return state;
}

export { loadHDR };

export default createState;
