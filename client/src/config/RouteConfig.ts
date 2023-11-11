import { AUTH_PREFIX_PATH, APP_PREFIX_PATH } from "./AppConfig";

/* Public Components */
import Website from "../views/website/Website";
import Login from "../views/auth-views/Login/Login";
import Register from "../views/auth-views/Register/Register";
import ForgotPassword from "../views/auth-views/ForgotPassword/ForgotPassword";
import ResetPassword from "../views/auth-views/ResetPassword/ResetPassword";

/* Protected Components -> Protein Analyzer */
import ProteinAnalyzerDashboard from "../views/app-views/ProteinAnalyzer/ProteinAnalyzerDashboard/ProteinAnalyzerDashboard";
import CreateProjectForm from "../views/app-views/ProteinAnalyzer/CreateProteinProject/CreateProjectView";
import UpdateProjectForm from "../views/app-views/ProteinAnalyzer/CreateProteinProject/UpdateProjectForm";
import ProjectOverview from "../views/app-views/ProteinAnalyzer/ProjectOverview/ProjectOverview";

/* Protected Components -> DNA Sequence */
import DNASequenceDashboard from "../views/app-views/DNASequence/DNASeqDashboard/DNASequenceDashboard";
import CreateProject from "../views/app-views/DNASequence/CreateDNAProject/CreateProjectView";
import UpdateDNASeqProjectForm from "../views/app-views/DNASequence/CreateDNAProject/UpdateDNASeqProjectForm";
import SequenceOverview from "../views/app-views/DNASequence/DNASequenceMap/DNASequenceMap";
import ProteinSequenceMap from "../views/app-views/ProteinAnalyzer/ProteinSequenceMap/ProteinSequenceMap";

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
    key: "forgotPassword",
    path: `${AUTH_PREFIX_PATH}/forgot-password`,
    component: ForgotPassword
  },

  {
    key: "resetPassword",
    path: `${AUTH_PREFIX_PATH}/reset-password/:resetToken`,
    component: ResetPassword
  },

  {
    key: "SharedDNASequenceOverview",
    path: `${APP_PREFIX_PATH}/dna-sequence/shared/overview/:projectId`,
    component: SequenceOverview
  },
]

export const protectedRoute: IRoute[] = [
  /* Protein Analyzer */
  {
    key: "proteinAnalyzerDashboard",
    path: `${APP_PREFIX_PATH}/protein-analyzer/dashboard`,
    component: ProteinAnalyzerDashboard
  },

  {
    key: "proteinAnalyzerCreateProjects",
    path: `${APP_PREFIX_PATH}/create-protein-project`,
    component: CreateProjectForm
  },

  {
    key: "proteinAnalyzerUpdateProjects",
    path: `${APP_PREFIX_PATH}/protein-project/update/:projectId`,
    component: UpdateProjectForm
  },

  {
    key: "proteinAnalyzerProjectOverview",
    path: `${APP_PREFIX_PATH}/protein-project/overview/:projectId`,
    component: ProjectOverview
  },

  {
    key: "sequenceMap",
    path: `${APP_PREFIX_PATH}/protein-project/overview/:projectId/sequence-map`,
    component: ProteinSequenceMap
  },

  /* DNA Sequence */
  {
    key: "DNASequenceDashboard",
    path: `${APP_PREFIX_PATH}/dna-sequence/dashboard`,
    component: DNASequenceDashboard
  },

  {
    key: "DNASequenceCreateProject",
    path: `${APP_PREFIX_PATH}/create-dna-project`,
    component: CreateProject
  },
  {
    key: "DNASequenceProjectDetails",
    path: `${APP_PREFIX_PATH}/dna-sequence/update/:projectId`,
    component: UpdateDNASeqProjectForm
  },
  {
    key: "DNASequenceOverview",
    path: `${APP_PREFIX_PATH}/dna-sequence/overview/:projectId`,
    component: SequenceOverview
  },
]