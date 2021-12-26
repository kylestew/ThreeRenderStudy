import { GUI } from "dat.gui";
import { loadHDR } from "./state";
import HDR_OPTIONS from "./lib/hdrs";

function createGUI(state) {
  const gui = new GUI();
  const updateFn = state.updateFn;

  let sceneFolder = gui.addFolder("Scene");
  sceneFolder.open();

  // TODO: Model

  sceneFolder
    .add(state, "hdrKey", HDR_OPTIONS.keys)
    .name("HDR")
    .onChange((val) => {
      loadHDR(val);
    });

  sceneFolder.add(state, "enableBackdrop").name("Backdrop").onChange(updateFn);

  sceneFolder
    .add(state, "animateCamera")
    .name("Animate Camera")
    .onChange(updateFn);

  sceneFolder.add(state, "rotateMesh").name("Rotate Mesh").onChange(updateFn);

  let materialFolder = gui.addFolder("Material");
  // materialFolder.open();

  materialFolder.add(state, "metalness", 0, 1, 0.01).onChange(updateFn);
  materialFolder.add(state, "roughness", 0, 1, 0.01).onChange(updateFn);
  materialFolder.add(state, "transmission", 0, 1, 0.01).onChange(updateFn);
  materialFolder.add(state, "ior", 1, 2.33, 0.01).onChange(updateFn);
  materialFolder.add(state, "reflectivity", 0, 1, 0.01).onChange(updateFn);
  materialFolder.add(state, "thickness", 0, 5, 0.1).onChange(updateFn);
  materialFolder.add(state, "envMapIntensity", 0, 3, 0.1).onChange(updateFn);
  materialFolder.add(state, "clearcoat", 0, 1, 0.01).onChange(updateFn);
  materialFolder
    .add(state, "clearcoatRoughness", 0, 1, 0.01)
    .name("cc roughness")
    .onChange(updateFn);
  materialFolder.add(state, "normalScale", 0, 1, 0.01).onChange(updateFn);
  materialFolder
    .add(state, "clearcoatNormalScale", 0, 5, 0.01)
    .name("cc normal scale")
    .onChange(updateFn);
  materialFolder.add(state, "normalRepeat", 1, 4, 1).onChange(updateFn);

  let postProcFolder = gui.addFolder("Post Processing");
  // postProcFolder.open();

  postProcFolder.add(state, "bloomThreshold", 0, 1, 0.01).onChange(updateFn);
  postProcFolder.add(state, "bloomStrength", 0, 2, 0.01).onChange(updateFn);
  postProcFolder.add(state, "bloomRadius", 0, 0.4, 0.01).onChange(updateFn);
}

export default createGUI;
