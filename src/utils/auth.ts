import { api } from "./api";
import { deleteCookie, getCookie } from "./cookies";
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
import {
  TUserConfirmPasswordReset,
  TUserLoginInfo,
  TUserRegisterInfo,
  TUserResetPassword,
} from "./types";

interface AuthHook {
  handleLogout: () => void;
  handleLogin: ({ email, password }: TUserLoginInfo) => void;
  handleRegister: ({ email, password, name }: TUserRegisterInfo) => void;
  getUserData: () => void;
  resetPassword: ({ email }: TUserResetPassword) => void;
  confirmResetPassword: ({
    password,
    token,
  }: TUserConfirmPasswordReset) => void;
  authCheck: () => void;
}

const useAuth = (): AuthHook => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { preLoginLocation } = useSelector((state: any) => state.user);

  const handleLogout = () => {
    api.logout().then((res) => {
      if (res.success) {
        deleteCookie("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(setUserEmail(""));
        dispatch(setUserName(""));
        dispatch(setUserIsAuth(false));
        dispatch(setUserPassword(""));
        dispatch(setPreLoginLocation("/"));
        navigate("/login");
      }
    });
  };

  const handleLogin = ({ email, password }: TUserLoginInfo) => {
    api
      .login({ email, password })
      .then((res) => {
        if (res.success) {
          api.saveTokens(res.refreshToken, res.accessToken);
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
  };

  const handleRegister = ({ email, password, name }: TUserRegisterInfo) => {
    api
      .register({
        email: email,
        password: password,
        name: name,
      })
      .then((res) => {
        console.log(res);
        if (res.success) {
          api.saveTokens(res.refreshToken, res.accessToken);
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
  };

  const getUserData = () => {
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
        console.log(err);
      });
  };

  const resetPassword = ({ email }: TUserResetPassword) => {
    api
      .resetPassword({ email })
      .then((res) => {
        if (res.success) {
          dispatch(resetRequestSent(true));
          navigate("/reset-password");
        }
      })
      .catch(console.error);
  };

  const confirmResetPassword = ({
    password,
    token,
  }: TUserConfirmPasswordReset) => {
    api
      .confirmPasswordReset({ password, token })
      .then((res) => {
        console.log(res);
        if (res.success) {
          alert(res.message);
          navigate("/profile");
        }
      })
      .catch((err) => alert(err));
  };

  const authCheck = () => {
    if (getCookie("accessToken")) {
      dispatch(setUserIsAuth(true));
      navigate(-1);
    }
  };

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
