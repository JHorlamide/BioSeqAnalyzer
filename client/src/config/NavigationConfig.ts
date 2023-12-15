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
    key: 'dashboard-protein-analyzer',
    path: `${APP_PREFIX_PATH}/protein-analyzer/dashboard`,
    title: 'Protein Analyzer',
    Icon: FaProjectDiagram,
  },

  {
    key: 'dashboards-dna-sequence',
    path: `${APP_PREFIX_PATH}/dna-sequence/dashboard`,
    title: 'DNA/RNA Sequence',
    Icon: GiDna1,
  },
]

export default navigationConfig;