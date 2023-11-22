import { api } from "./api";
import { deleteCookie, setCookie } from "./cookies";
import {
  setPreLoginLocation,
  setUserEmail,
  setUserIsAuth,
  setUserName,
  setUserPassword,
  setUserRefreshToken,
  setUserToken,
} from "../services/slices/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { preLoginLocation } = useSelector((state) => state.user);

  function handleLogout() {
    api.logout().then((res) => {
      console.log(res);
      if (res.success) {
        deleteCookie("token");
        deleteCookie("refreshToken");
        dispatch(setUserEmail(""));
        dispatch(setUserName(""));
        dispatch(setUserIsAuth(false));
        dispatch(setUserPassword(""));
        dispatch(setPreLoginLocation("/"));
        navigate("/login");
      }
    });
  }

  function handleLogin(email, password) {
    api
      .login(email, password)
      .then((res) => {
        if (res.success) {
          setCookie("refreshToken", res.refreshToken, { expires: null });
          setCookie("token", decodeURIComponent(res.accessToken), {
            expires: 20 * 60 * 1000,
          });
          dispatch(setUserEmail(email));
          dispatch(setUserPassword(password));
          dispatch(setUserIsAuth(true));
          dispatch(setUserToken(res.accessToken));
          dispatch(setUserRefreshToken(res.refreshToken));
          navigate(preLoginLocation);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleRegister(email, password, name) {
    api
      .register({
        email: email,
        password: password,
        name: name,
      })
      .then((res) => {
        console.log(res);
        if (res.success) {
          setCookie("refreshToken", res.refreshToken, { expires: null });
          setCookie("token", decodeURIComponent(res.accessToken), {
            expires: 20 * 60 * 1000,
          });
          dispatch(setUserEmail(email));
          dispatch(setUserPassword(password));
          dispatch(setUserName(name));
          dispatch(setUserIsAuth(true));
          dispatch(setUserToken(res.accessToken));
          dispatch(setUserRefreshToken(res.refreshToken));
          navigate("/");
        }
      })
      .catch((err) => alert(err));
  }

  return {
    handleLogout,
    handleLogin,
    handleRegister,
  };
};

export default useAuth;
