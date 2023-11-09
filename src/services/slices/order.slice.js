import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  number: 0,
  status: "",
};

const ingredientsSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderNumber: (state, action) => {
      state.number = action.payload;
    },
    setOrderStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setOrderNumber, setOrderStatus } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
