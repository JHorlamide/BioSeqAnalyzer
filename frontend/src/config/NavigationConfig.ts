/* Libraries */
import { FaProjectDiagram } from "react-icons/fa";
import { GiDna1 } from "react-icons/gi"
import { IconType } from 'react-icons';

/* Application Modules */
import { APP_PREFIX_PATH } from "./AppConfig";

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
    title: 'Protein Analyzer',
    Icon: FaProjectDiagram,
  },

  {
    key: 'dashboards-members',
    path: `${APP_PREFIX_PATH}/project-members`,
    title: 'DNA Sequence',
    Icon: GiDna1,
  },
]

export default navigationConfig;