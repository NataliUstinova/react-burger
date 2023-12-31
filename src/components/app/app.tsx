import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import appStyles from "./app.module.css";
import Main from "../../pages/main/main";
import OrderFeed from "../../pages/order-feed/order-feed";
import Profile from "../../pages/profile/profile";
import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, modalTypes } from "../../services/slices/modal.slice";
import {
  fetchIngredients,
  resetCurrentIngredient,
} from "../../services/slices/ingredients.slice";
import { resetOrder } from "../../services/slices/order.slice";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Ingredient from "../../pages/ingredient/ingredient";
import Orders from "../../pages/profile/orders/orders";
import ProtectedRoute from "../protected-route/protected-route";
import { getCookie } from "../../utils/cookies";
import { setUserIsAuth } from "../../services/slices/user.slice";
import useAuth from "../../utils/auth";
import Error404 from "../../pages/error404/error404";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

const App: React.FC = () => {
  const { modalType } = useSelector((state: any) => state.modal);
  const dispatch = useDispatch();
  const { getUserData } = useAuth();
  const navigate = useNavigate();
  const handleModalClose = () => {
    dispatch(closeModal());
    modalType === modalTypes.INGREDIENT
      ? dispatch(resetCurrentIngredient()) && navigate(-1)
      : dispatch(resetOrder()) && navigate(-1);
  };

  const init = async () => {
    await getCookie("accessToken");
    if (getCookie("accessToken")) {
      dispatch(setUserIsAuth(true));
      await getUserData();
    }
  };

  useEffect(() => {
    init();
    // @ts-ignore
    dispatch(fetchIngredients());
  }, []);

  const token = getCookie("accessToken");
  useEffect(() => {
    if (getCookie("accessToken")) {
      dispatch(setUserIsAuth(true));
    }
  }, [token, dispatch]);

  const location = useLocation();
  let background = location.state?.background;

  return (
    <div className={appStyles.container}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Main />} />
        <Route
          path="/login"
          element={<ProtectedRoute anonymous element={<Login />} />}
        />
        <Route
          path="/register"
          element={<ProtectedRoute anonymous element={<Register />} />}
        />
        <Route path="/order-feed" element={<OrderFeed />} />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path="/profile/orders"
          element={<ProtectedRoute element={<Orders />} />}
        />
        <Route
          path="/forgot-password"
          element={<ProtectedRoute anonymous element={<ForgotPassword />} />}
        />
        <Route
          path="/reset-password"
          element={<ProtectedRoute anonymous element={<ResetPassword />} />}
        />
        <Route path="/ingredients/:id" element={<Ingredient />} />
        <Route path={"*"} element={<Error404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}

      {background && (
        <Routes>
          <Route
            path="/profile/orders/:number"
            element={
              <ProtectedRoute
                element={
                  <Modal onClose={handleModalClose}>
                    <OrderDetails />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
