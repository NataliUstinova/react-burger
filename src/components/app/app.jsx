import React, { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import appStyles from "./app.module.css";
import Main from "../../pages/main/main";
import OrderFeed from "../../pages/order-feed/order-feed";
import Profile from "../../pages/profile/profile";
import AppHeader from "../app-header/app-header";
import { api } from "../../utils/api";
import Modal from "../modal/modal";
import { useModal } from "../../hooks/useModal";
const IngredientDetails = lazy(() =>
  import("../ingredient-details/ingredient-details")
);
const OrderDetails = lazy(() => import("../order-details/order-details"));

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { isModalOpen, modalData, openModal, closeModal } = useModal();

  useEffect(() => {
    setIsLoading(true);
    api
      .fetchIngredients()
      .then((res) => {
        if (res.success) {
          setIngredients(res.data);
        }
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={appStyles.container}>
      <div id="modals"></div>
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
          element={
            <Main
              data={ingredients}
              isLoading={isLoading}
              openModal={openModal}
              closeModal={closeModal}
            />
          }
        />
        <Route path="/order-feed" element={<OrderFeed />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
