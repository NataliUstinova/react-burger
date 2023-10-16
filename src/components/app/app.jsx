import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import appStyles from "./app.module.css";
import Main from "../../pages/main/main";
import OrderFeed from "../../pages/order-feed/order-feed";
import Profile from "../../pages/profile/profile";
import AppHeader from "../app-header/app-header";
import { api } from "../../utils/api";
import Modal from "../modal/modal";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const toggleModal = (data) => {
    setIsModalOpen(!isModalOpen);
    if (data) {
      setModalData(data);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    api
      .fetchIngredients()
      .then((res) => {
        if (res.success) {
          setIngredients(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={appStyles.container}>
      <AppHeader />
      <Modal isOpen={isModalOpen} onClose={toggleModal} data={modalData} />
      <Routes>
        <Route
          path="/"
          element={
            <Main
              data={ingredients}
              isLoading={isLoading}
              toggleModal={toggleModal}
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
