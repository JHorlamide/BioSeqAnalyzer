import { FieldErrors, UseFormReturn } from "react-hook-form";
import { ProjectFormData } from "../../../../../schemas/project.schema";

export interface ProjectFormProps {
  projectId?: string;
  projectData?: ProjectFormData;
  errors: FieldErrors<ProjectFormData>;
  isValid: boolean;
  isLoading: boolean;
  submitProject: (data: ProjectFormData) => Promise<void>;
  register: UseFormReturn<ProjectFormData>['register'];
  handleSubmit: UseFormReturn<ProjectFormData>['handleSubmit'];
  toggleShowUniProtInput: () => void;
  showRawSeqInput: boolean;
  showUniProtInput: boolean;
};
