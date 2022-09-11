import { Navigate, Route, Routes } from "react-router-dom";

import { AppRoutes } from "../constants/route.constants";
import Home from "../pages/home/home";
import SettingsPage from "../pages/settings/settingsPage";
import UserId from "../pages/user/userId";
import Users from "../pages/users/users";

export default function AuthenticatedApp() {
  return (
    <Routes>
      <Route path={AppRoutes.authenticatedRoutes.home} element={<Home />} />
      <Route path={AppRoutes.authenticatedRoutes.user} element={<UserId />} />
      <Route path={AppRoutes.authenticatedRoutes.users} element={<Users />} />;
      <Route
        path={AppRoutes.authenticatedRoutes.settings}
        element={<SettingsPage />}
      />
      ;
      <Route
        path={AppRoutes.fallBack}
        element={<Navigate replace to={AppRoutes.authenticatedRoutes.home} />}
      />
    </Routes>
  );
}
