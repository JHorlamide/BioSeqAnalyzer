import { FaProjectDiagram, FaUsers } from "react-icons/fa";
import { APP_PREFIX_PATH } from "./AppConfig";
import { IconType } from 'react-icons';

interface NavConfigProps {
  key: string;
  title: string;
  path: string;
  Icon: IconType;
}

const navigationConfig: NavConfigProps[] = [
  {
    key: 'dashboard',
    path: `${APP_PREFIX_PATH}/dashboard`,
    title: 'Dashboard',
    Icon: FaProjectDiagram,
  },

  {
    key: 'dashboards-members',
    path: `${APP_PREFIX_PATH}/project-members`,
    title: 'Project Members',
    Icon: FaUsers,
  },
]

export default navigationConfig;