import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../utils/api";
import { getCookie } from "../../utils/cookies";
import {
  setPreLoginLocation,
  setUserIsAuth,
} from "../../services/slices/user.slice";

const ProtectedRouteElement = ({ element }) => {
  const { isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const currentPage = useLocation().pathname;

  const init = async () => {
    await getCookie("token");
    if (getCookie("token")) {
      dispatch(setUserIsAuth(true));
      await api
        .getUser()
        .then((res) => {
          if (res.success) {
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
