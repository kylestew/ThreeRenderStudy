import { configureStore } from "@reduxjs/toolkit";
import assetsReducer from "./lib/assetsSlice";
import materialReducer from "./lib/materialSlice";

export default configureStore({
  reducer: {
    assets: assetsReducer,
    material: materialReducer,
  },
});
