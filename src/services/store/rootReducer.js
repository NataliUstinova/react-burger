import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "../slices/ingredients.slice";
import orderReducer from "../slices/order.slice";
import tabsReducer from "../slices/tabs.slice";
import modalReducer from "../slices/modal.slice";
import userReducer from "../slices/user.slice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    order: orderReducer,
    tabs: tabsReducer,
    modal: modalReducer,
    user: userReducer,
  },
});
