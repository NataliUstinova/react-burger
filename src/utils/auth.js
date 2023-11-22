import { api } from "./api";
import { deleteCookie, getCookie, setCookie } from "./cookies";
import {
  resetRequestSent,
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

  function refreshToken() {
    api
      .refreshToken()
      .then((res) => {
        if (res.success) {
          setCookie("token", decodeURIComponent(res.accessToken), {
            expires: 20 * 60 * 1000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getUserData() {
    api
      .getUser()
      .then((res) => {
        if (res.success) {
          dispatch(setUserEmail(res.user.email));
          dispatch(setUserName(res.user.name));
          dispatch(setUserIsAuth(true));
        }
      })
      .catch((err) => {
        dispatch(setUserIsAuth(false));
        refreshToken();
        console.log(err);
      });
  }

  function resetPassword(email) {
    api
      .resetPassword(email)
      .then((res) => {
        if (res.success) {
          dispatch(resetRequestSent(true));
          navigate("/reset-password");
        }
      })
      .catch(console.error);
  }

  function confirmResetPassword(password, token) {
    api
      .confirmPasswordReset(password, token)
      .then((res) => {
        console.log(res);
        if (res.success) {
          alert(res.message);
          navigate("/profile");
        }
      })
      .catch((err) => alert(err));
  }

  function authCheck() {
    if (getCookie("token")) {
      navigate(-1);
    }
  }

  return {
    handleLogout,
    handleLogin,
    handleRegister,
    resetPassword,
    getUserData,
    authCheck,
    confirmResetPassword,
  };
};

export default useAuth;
