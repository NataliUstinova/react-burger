import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

const initialState = {
  number: 0,
  status: "",
};

export const postOrder = createAsyncThunk(
  "order/postOrder",
  async (ingredientIds, { rejectWithValue }) => {
    try {
      const response = await api.postOrder(ingredientIds);
      if (!response.success) {
        return rejectWithValue(response);
      }
      return response.order;
    } catch (error) {
      return rejectWithValue(error.message);
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
  },
  extraReducers: {
    [postOrder.pending]: (state) => {
      state.status = "loading";
      state.loading = true;
    },
    [postOrder.fulfilled]: (state, action) => {
      state.number = action.payload.number; // Ensure the payload has 'number' property
      state.status = "succeeded";
      state.loading = false;
    },
    [postOrder.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload; // This will be the error message or the whole response
      state.loading = false;
    },
  },
});

export const { setOrderNumber, setOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
