import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import appStyles from "./app.module.css";
import Main from "../../pages/main/main";
import OrderFeed from "../../pages/order-feed/order-feed";
import Profile from "../../pages/profile/profile";
import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";
import { useSelector } from "react-redux";
import { modalTypes } from "../../services/slices/modal.slice";
const IngredientDetails = lazy(() =>
  import("../ingredient-details/ingredient-details")
);
const OrderDetails = lazy(() => import("../order-details/order-details"));

function App() {
  const { isOpen, modalType } = useSelector((state) => state.modal);

  return (
    <div className={appStyles.container}>
      <AppHeader />
      <Suspense fallback={null}>
        {isOpen && (
          <Modal
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
