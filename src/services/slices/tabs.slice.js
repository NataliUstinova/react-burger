import { createSlice } from "@reduxjs/toolkit";

export const tabsSlice = createSlice({
  name: "tabs",
  initialState: {
    currentTab: "Булки",
  },
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
  },
});

export const { setCurrentTab } = tabsSlice.actions;

export default tabsSlice.reducer;
