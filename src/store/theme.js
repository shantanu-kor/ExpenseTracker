import { createSlice } from "@reduxjs/toolkit";

const light = {
  backgroundColor: "white",
  color: "black",
};

const dark = {
  backgroundColor: "black",
  color: "white",
};

const themeSlice = createSlice({
  name: "theme",
  initialState: light,
  reducers: {
    setDark(state) {
        state.backgroundColor = dark.backgroundColor;
        state.color = dark.color;
    },
    setLight(state) {
        state.backgroundColor = light.backgroundColor;
        state.color = light.color;
    }
  }
});

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;
