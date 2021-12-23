import { createStore } from "redux";

import { loadGeometry } from "./lib/loader";

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

  return store;
}

export { AppActions, createApp };
