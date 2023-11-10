import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

const initialState = {
  allIngredients: [],
  constructorIngredients: [],
  middleIngredients: [],
  currentIngredient: {},
  totalPrice: 0,
};

function calculateTotalPrice(ingredients) {
  return ingredients.reduce((total, item) => {
    return total + item.price;
  }, 0);
}

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.fetchIngredients();
      if (response.success) {
        return response.data;
      } else {
        return rejectWithValue(response.error);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setAllIngredients: (state, action) => {
      state.allIngredients = action.payload;
    },

    setConstructorIngredients: (state, action) => {
      const item = action.payload;
      if (item.type === "bun") {
        state.constructorIngredients = state.constructorIngredients.filter(
          (ingredient) => ingredient.type !== "bun"
        );
        state.constructorIngredients.unshift(action.payload);
        state.constructorIngredients.push(action.payload);
      } else {
        state.constructorIngredients.push(item);
      }
      state.middleIngredients = state.constructorIngredients.filter(
        (ingredient) => ingredient.type !== "bun"
      );
      state.totalPrice = calculateTotalPrice(state.constructorIngredients);
    },

    deleteConstructorIngredient: (state, action) => {
      state.middleIngredients = state.middleIngredients.filter(
        (ingredient) => ingredient.uniqueId !== action.payload
      );
      state.constructorIngredients = state.constructorIngredients.filter(
        (ingredient) => ingredient.uniqueId !== action.payload
      );
      state.totalPrice = calculateTotalPrice(state.constructorIngredients);
    },

    setCurrentIngredient: (state, action) => {
      state.currentIngredient = action.payload;
    },

    moveMiddleIngredients: (state, action) => {
      const { dragIndex, hoverIndex } = action.payload;
      const dragIngredient = { ...state.middleIngredients.at(dragIndex) };
      state.middleIngredients.splice(dragIndex, 1);
      state.middleIngredients.splice(hoverIndex, 0, dragIngredient);
    },
  },
  extraReducers: {
    [fetchIngredients.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchIngredients.fulfilled]: (state, action) => {
      state.ingredients = action.payload;
      state.isLoading = false;
    },
    [fetchIngredients.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setAllIngredients,
  setConstructorIngredients,
  deleteConstructorIngredient,
  setCurrentIngredient,
  moveMiddleIngredients,
} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
