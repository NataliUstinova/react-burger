import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../utils/cookies";
import {
  setPreLoginLocation,
  setUserIsAuth,
} from "../../services/slices/user.slice";
import useAuth from "../../utils/auth";

const ProtectedRouteElement = ({ element }) => {
  const { isAuth } = useSelector((state) => state.user);
  const { getUserData } = useAuth();
  const dispatch = useDispatch();
  const currentPage = useLocation().pathname;

  const init = () => {
    if (getCookie("token") || getCookie("refreshToken")) {
      dispatch(setUserIsAuth(true));
      getUserData();
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    dispatch(setPreLoginLocation(currentPage));
  }, [currentPage]);

  return isAuth ? element : <Navigate to="/login" />;
};
export default ProtectedRouteElement;
