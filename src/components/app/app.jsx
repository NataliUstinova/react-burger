import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import appStyles from "./app.module.css";
import Main from "../../pages/main/main";
import OrderFeed from "../../pages/order-feed/order-feed";
import Profile from "../../pages/profile/profile";
import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";
import { useModal } from "../../hooks/useModal";
const IngredientDetails = lazy(() =>
  import("../ingredient-details/ingredient-details")
);
const OrderDetails = lazy(() => import("../order-details/order-details"));

function App() {
  const { isModalOpen, modalData, openModal, closeModal } = useModal();
  return (
    <div className={appStyles.container}>
      <AppHeader />
      <Suspense fallback={null}>
        {modalData && (
          <Modal
            isOpen={isModalOpen}
            onOpen={openModal}
            onClose={closeModal}
            children={
              modalData.name ? (
                <IngredientDetails ingredient={modalData} />
              ) : (
                <OrderDetails order={modalData} />
              )
            }
          />
        )}
      </Suspense>
      <Routes>
        <Route
          path="/"
          element={<Main openModal={openModal} closeModal={closeModal} />}
        />
        <Route path="/order-feed" element={<OrderFeed />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
