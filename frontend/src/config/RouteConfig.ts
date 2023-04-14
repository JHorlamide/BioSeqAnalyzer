import React from "react";
import { AUTH_PREFIX_PATH, APP_PREFIX_PATH } from "./AppConfig";

interface IRoute {
  [x: string]: any;
  key: string;
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>
}

export const publicRoute: IRoute[] = [
  {
    key: "login",
    path: `${AUTH_PREFIX_PATH}/login`,
    component: React.lazy(() => import("../views/auth-views/login/Login"))
  },

  {
    key: "register",
    path: `${AUTH_PREFIX_PATH}/register`,
    component: React.lazy(() => import("../views/auth-views/register/Register"))
  },
  
  {
    key: "forgot-password",
    path: `${AUTH_PREFIX_PATH}/forgot-password`,
    component: React.lazy(() => import("../views/auth-views/forgot-password/ForgotPassword"))
  }
]

export const protectedRoute: IRoute[] = [
  {
    key: "dashboard",
    path: `${APP_PREFIX_PATH}/dashboard`,
    component: React.lazy(() => import("../views/app-views/dashboard"))
  },
]