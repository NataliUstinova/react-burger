import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ element, anonymous = false }) {
  const isAuth = useSelector((store) => store.user.isAuth);

  const location = useLocation();
  const from = location.state?.from || "/";
  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && isAuth) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={from} />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !isAuth) {
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return element;
}
