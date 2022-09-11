import { Navigate, Route, Routes } from "react-router-dom";

import { AppRoutes } from "../constants/route.constants";
import Login from "../pages/login/login";
import Register from "../pages/register/register";

export default function UnauthenticatedApp() {
  return (
    <Routes>
      <Route path={AppRoutes.unauthenticatedRoutes.login} element={<Login />} />
      <Route
        path={AppRoutes.unauthenticatedRoutes.register}
        element={<Register />}
      />
      <Route
        path={AppRoutes.fallBack}
        element={
          <Navigate replace to={AppRoutes.unauthenticatedRoutes.login} />
        }
      />
    </Routes>
  );
}
