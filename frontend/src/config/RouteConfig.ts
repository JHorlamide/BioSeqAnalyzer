import { AUTH_PREFIX_PATH, APP_PREFIX_PATH } from "./AppConfig";

/* Protected Components */
import Dashboard from "../views/app-views/dashboard/Dashboard";
import CreateProjectForm from "../views/app-views/create-project/CreateProjectForm";
import UpdateProjectForm from "../views/app-views/create-project/UpdateProjectForm";
import ProjectOverview from "../views/app-views/project-overview/ProjectOverview";
import ProjectMembers from "../views/app-views/project-members/ProjectMembers";

/* Public Components */
import Website from "../views/website/Website";
import Login from "../views/auth-views/login/Login";
import Register from "../views/auth-views/register/Register";
import ForgotPassword from "../views/auth-views/forgot-password/ForgotPassword";

interface IRoute {
  [x: string]: any;
  key: string;
  path: string;
  component: () => JSX.Element
}

export const publicRoute: IRoute[] = [
  {
    key: "website",
    path: `/website`,
    component: Website
  },

  {
    key: "login",
    path: `${AUTH_PREFIX_PATH}/login`,
    component: Login
  },

  {
    key: "register",
    path: `${AUTH_PREFIX_PATH}/register`,
    component: Register
  },

  {
    key: "forgot-password",
    path: `${AUTH_PREFIX_PATH}/forgot-password`,
    component: ForgotPassword
  },
]

export const protectedRoute: IRoute[] = [
  {
    key: "dashboard",
    path: `${APP_PREFIX_PATH}/dashboard`,
    component: Dashboard
  },

  {
    key: "create-projects",
    path: `${APP_PREFIX_PATH}/create-project`,
    component: CreateProjectForm
  },

  {
    key: "update-projects",
    path: `${APP_PREFIX_PATH}/project/update/:projectId`,
    component: UpdateProjectForm
  },

  {
    key: "project-members",
    path: `${APP_PREFIX_PATH}/project-members`,
    component: ProjectMembers
  },

  {
    key: "project-overview",
    path: `${APP_PREFIX_PATH}/project-overview/:projectId`,
    component: ProjectOverview
  },
]