import { FaProjectDiagram, FaUsers } from "react-icons/fa";
import { SiPolymerproject } from "react-icons/si";
import { APP_PREFIX_PATH } from "./AppConfig";

const navigationConfig = [
  {
    key: 'dashboard',
    path: `${APP_PREFIX_PATH}/dashboard`,
    title: 'Dashboard',
    icon: FaProjectDiagram,
  },

  {
    key: 'dashboards-projects',
    path: `${APP_PREFIX_PATH}/create-project`,
    title: 'Projects',
    icon: SiPolymerproject,
  },

  {
    key: 'dashboards-members',
    path: `${APP_PREFIX_PATH}/project-members`,
    title: 'Project Members',
    icon: FaUsers,
  },
]

export default navigationConfig;