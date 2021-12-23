import { createStore } from "redux";
import { loadGeometry, loadTextures, loadEnvironmentMap } from "./lib/loader";

const initState = {};

const AppActions = {
  UpdateParam: "UpdateParam",
};

function appReducer(state = initState, action) {
  switch (action.type) {
    case AppActions.UpdateParam:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
}

function createApp() {
  let store = createStore(appReducer);

  loadGeometry((geometry) => {
    store.dispatch({
      type: AppActions.UpdateParam,
      payload: { geometry },
    });
  });

  loadTextures((textures) => {
    store.dispatch({
      type: AppActions.UpdateParam,
      payload: { textures },
    });
  });

  loadEnvironmentMap((envMap) => {
    store.dispatch({
      type: AppActions.UpdateParam,
      payload: { envMap },
    });
  });

  return store;
}

export { AppActions, createApp };
