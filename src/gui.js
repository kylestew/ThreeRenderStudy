import { GUI } from "dat.gui";
import { loadHDR } from "./state";
import HDR_OPTIONS from "./lib/hdrs";

function createGUI(state, updatedFn) {
  const gui = new GUI();

  var materialFolder = gui.addFolder("Material");
  materialFolder.open();

  materialFolder.add(state, "metalness", 0, 1, 0.01).onChange(updatedFn);
  materialFolder.add(state, "roughness", 0, 1, 0.01).onChange(updatedFn);
  materialFolder.add(state, "transmission", 0, 1, 0.01).onChange(updatedFn);
  materialFolder.add(state, "ior", 1, 2.33, 0.01).onChange(updatedFn);

  // materialFolder
  //   .add(material, "reflectivity", 0, 1, 0.01)
  //   .onChange((val) => updateMaterial({ reflectivity: val }));

  // materialFolder
  //   .add(material, "thickness", 0, 5, 0.1)
  //   .onChange((val) => updateMaterial({ thickness: val }));

  // materialFolder
  //   .add(material, "envMapIntensity", 0, 3, 0.1)
  //   .onChange((val) => updateMaterial({ envMapIntensity: val }));

  // materialFolder
  //   .add(material, "clearcoat", 0, 1, 0.01)
  //   .onChange((val) => updateMaterial({ clearcoat: val }));

  // materialFolder
  //   .add(material, "clearcoatRoughness", 0, 1, 0.01)
  //   .onChange((val) => updateMaterial({ clearcoatRoughness: val }));

  // materialFolder
  //   .add(material, "normalScale", 0, 1, 0.01)
  //   .onChange((val) => updateMaterial({ normalScale: val }));

  // materialFolder
  //   .add(material, "clearcoatNormalScale", 0, 5, 0.01)
  //   .onChange((val) => updateMaterial({ clearcoatNormalScale: val }));

  // materialFolder
  //   .add(material, "normalRepeat", 1, 4, 1)
  //   .onChange((val) => updateMaterial({ normalRepeat: val }));

  // // var postProcFolder = gui.addFolder("Post Processing");
  // // postProcFolder.open();

  // // postProcFolder.add(state, "bloomThreshold", 0, 1, 0.01);
  // // .onChange((val) => updateParam({ bloomThreshold: val }));

  // // postProcFolder
  // //   .add(state, "bloomStrength", 0, 5, 0.01)
  // //   .onChange((val) => updateParam({ bloomStrength: val }));

  // // postProcFolder
  // //   .add(state, "bloomRadius", 0, 1, 0.01)
  // //   .onChange((val) => updateParam({ bloomRadius: val }));

  var sceneFolder = gui.addFolder("Scene");
  sceneFolder.open();

  sceneFolder
    .add(state, "hdrKey", HDR_OPTIONS.keys)
    .name("HDR")
    .onChange((val) => {
      loadHDR(val);
    });

  // .onChange((val) =>
  // app.dispatch({
  //   type: AppActions.SelectHDR,
  //   payload: val,
  // })
  // );

  // // sceneFolder
  // //   .add(state, "metalness", 0, 1, 0.01)
  // //   .onChange((val) => dispatchUpdate({ metalness: val }));

  // // sceneFolder
  // //   .add(state, "roughness", 0, 1, 0.01)
  // //   .onChange((val) => dispatchUpdate({ roughness: val }));
}

export default createGUI;
