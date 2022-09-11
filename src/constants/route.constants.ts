export const AppRoutes = {
  authenticatedRoutes: {
    home: "/",
    users: "/users",
    user: "/user/:uid",
    settings: "/settings",
    userByUid: (uid: string) => `/user/${uid}`,
    logout: "/logout",
  },
  unauthenticatedRoutes: {
    login: "/login",
    register: "/register",
  },
  fallBack: "*",
};
