import { FaProjectDiagram, FaUsers } from "react-icons/fa";
import { APP_PREFIX_PATH } from "./AppConfig";

const navigationConfig = [
  {
    key: 'dashboard',
    path: `${APP_PREFIX_PATH}/dashboard`,
    title: 'Dashboard',
    icon: FaProjectDiagram,
  },

  {
    key: 'dashboards-members',
    path: `${APP_PREFIX_PATH}/project-members`,
    title: 'Project Members',
    icon: FaUsers,
  },
]

export default navigationConfig;