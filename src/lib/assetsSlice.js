import { createSlice } from "@reduxjs/toolkit";
// import { loadGeometry, loadTextures, loadEnvironmentMap } from "./lib/loader";

// import hdr01 from "../assets/hdrs/empty_warehouse_01_2k.hdr?url";
// import hdr02 from "../assets/hdrs/Alexs_Apt_2k.hdr?url";

// const HDR_OPTIONS = {
//   names: ["empty warehouse", "apartment"],
//   urls: [hdr01, hdr02],
//   urlForName(name) {
//     return this.urls[this.names.indexOf(name)];
//   },
// };

//   switch (action.type) {
//     case AppActions.UpdateParam:
//       return Object.assign({}, state, action.payload);

//     case AppActions.SelectHDR:
//       let url = HDR_OPTIONS.urlForName(action.payload);
//       loadEnvironmentMap(url, (envMap) => {
//         console.log("store", store);
//         // store.dispatch({
//         //   type: AppActions.UpdateParam,
//         //   payload: { envMap },
//         // });
//       });

//     default:
//       return state;
//   }
// }

const initialState = {
  // hdr: HDR_OPTIONS.names[0],
  // envMap: undefined,
};

export const slice = createSlice({
  name: "assets",
  initialState,
  // reducers: {
  // },
});

// export const { updateMaterialParam } = slice.actions;

export default slice.reducer;

/*
function createApp() {
  // loadGeometry((geometry) => {
  //   store.dispatch({
  //     type: AppActions.UpdateParam,
  //     payload: { geometry },
  //   });
  // });

  // loadTextures((textures) => {
  //   store.dispatch({
  //     type: AppActions.UpdateParam,
  //     payload: { textures },
  //   });
  // });

  // store.dispatch({
  //   type: AppActions.SelectHDR,
  //   payload: HDR_OPTIONS.names[0],
  // });

  return store;
}
*/
