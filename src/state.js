import { loadGeometry, loadTextures, loadEnvironmentMap } from "./lib/loader";
import HDR_OPTIONS from "./lib/hdrs";

const state = {
  hdrKey: HDR_OPTIONS.keys[0],
  envMap: undefined,
  enableBackdrop: true,
  backdropTexture: undefined,

  metalness: 0,
  roughness: 0.2,
  transmission: 1,
  ior: 1.5,
  reflectivity: 0.5,
  thickness: 3.0,
  envMapIntensity: 1.8,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
  normalScale: 0.3,
  clearcoatNormalScale: 0.2,
  normalRepeat: 3,

  animateCamera: false,
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
