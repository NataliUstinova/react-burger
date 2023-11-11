import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

const initialState = {
  number: 0,
  status: "",
};

export const postOrder = createAsyncThunk(
  "order/postOrder",
  async (ingredientIds) => {
    const response = await api.postOrder(ingredientIds);
    if (response.success) {
      return response.order;
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderNumber: (state, action) => {
      state.number = action.payload;
    },
    setOrderStatus: (state, action) => {
      state.status = action.payload;
    },
    resetOrder: (state) => {
      state.number = 0;
      state.status = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.number = action.payload.number;
        state.status = "succeeded";
        state.loading = false;
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setOrderNumber, setOrderStatus, resetOrder } =
  orderSlice.actions;
export default orderSlice.reducer;
