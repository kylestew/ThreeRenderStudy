import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  metalness: 0,
  roughness: 0.2,
  transmission: 1,
  ior: 1.5,
  reflectivity: 0.5,
  thickness: 2.5,
  envMapIntensity: 1.5,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
  normalScale: 0.3,
  clearcoatNormalScale: 0.2,
  normalRepeat: 3,
};

export const slice = createSlice({
  name: "material",
  initialState,
  reducers: {
    updateMaterialParam: (state, action) => {
      // apply value updates
      Object.entries(action.payload).map((entry) => {
        state[entry[0]] = entry[1];
      });
    },
  },
});

export const { updateMaterialParam } = slice.actions;

export default slice.reducer;
