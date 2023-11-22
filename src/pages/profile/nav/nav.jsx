import React, { useEffect } from "react";
import profileStyles from "../profile.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { api } from "../../../utils/api";
import { deleteCookie } from "../../../utils/cookies";
import {
  setUserEmail,
  setUserIsAuth,
  setUserName,
  setUserPassword,
} from "../../../services/slices/user.slice";
import { useDispatch } from "react-redux";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOrdersActive, setIsOrdersActive] = React.useState(false);

  useEffect(() => {
    setIsOrdersActive(window.location.pathname === "/profile/orders");
  }, []);
  function handleLogout() {
    api.logout().then((res) => {
      console.log(res);
      if (res.success) {
        deleteCookie("token");
        dispatch(setUserEmail(""));
        dispatch(setUserName(""));
        dispatch(setUserIsAuth(false));
        dispatch(setUserPassword(""));
        navigate("/login");
      }
    });
  }

  return (
    <nav className={profileStyles.nav}>
      <NavLink
        to={"/profile"}
        end
        className={({ isActive }) =>
          `${isActive ? "text_color_primary" : "text_color_inactive"} ${
            profileStyles.link
          } text_type_main-medium pt-4`
        }
      >
        Профиль
      </NavLink>
      <NavLink
        to={"/profile/orders"}
        className={({ isActive }) =>
          `${isActive ? "text_color_primary" : "text_color_inactive"} ${
            profileStyles.link
          } text_type_main-medium`
        }
      >
        История заказов
      </NavLink>
      <button
        className={`${profileStyles.button} text_type_main-medium text_color_inactive`}
        onClick={handleLogout}
      >
        Выйти
      </button>
      <p className="pt-20 text_color_inactive text_type_main-small">
        {isOrdersActive
          ? "В этом разделе вы можете просмотреть свою историю заказов"
          : "В этом разделе вы можете изменить свои персональные данные"}
      </p>
    </nav>
  );
};

export default Nav;
