import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import appStyles from "./app.module.css";
import Main from "../../pages/main/main";
import OrderFeed from "../../pages/order-feed/order-feed";
import Profile from "../../pages/profile/profile";
import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, modalTypes } from "../../services/slices/modal.slice";
import { resetCurrentIngredient } from "../../services/slices/ingredients.slice";
import { resetOrder } from "../../services/slices/order.slice";
const IngredientDetails = lazy(() =>
  import("../ingredient-details/ingredient-details")
);
const OrderDetails = lazy(() => import("../order-details/order-details"));

function App() {
  const { isOpen, modalType } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const handleModalClose = () => {
    dispatch(closeModal());
    modalType === modalTypes.INGREDIENT
      ? dispatch(resetCurrentIngredient())
      : dispatch(resetOrder());
  };
  return (
    <div className={appStyles.container}>
      <AppHeader />
      <Suspense fallback={null}>
        {isOpen && (
          <Modal
            onClose={handleModalClose}
            children={
              modalType === modalTypes.INGREDIENT ? (
                <IngredientDetails />
              ) : (
                <OrderDetails />
              )
            }
          />
        )}
      </Suspense>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/order-feed" element={<OrderFeed />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
