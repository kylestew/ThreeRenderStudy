import { GUI } from "dat.gui";
import { AppActions } from "./state";

function createGUI(app) {
  const state = app.getState();
  const gui = new GUI();

  let dispatchUpdate = (payload) => {
    app.dispatch({
      type: AppActions.UpdateParam,
      payload: payload,
    });
  };

  var materialFolder = gui.addFolder("Material");
  materialFolder.open();

  materialFolder
    .add(state, "metalness", 0, 1, 0.01)
    .onChange((val) => dispatchUpdate({ metalness: val }));

  materialFolder
    .add(state, "roughness", 0, 1, 0.01)
    .onChange((val) => dispatchUpdate({ roughness: val }));
}

export { createGUI };
