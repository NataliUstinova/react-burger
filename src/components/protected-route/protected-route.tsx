import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

interface ProtectedRouteProps {
  element: React.ReactNode;
  anonymous?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  anonymous = false,
}: ProtectedRouteProps): Element | any => {
  const isAuth = useSelector((store: any) => store.user.isAuth);

  const location = useLocation();
  const from = location.state?.from || "/";
  if (anonymous && isAuth) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
};

export default ProtectedRoute;
