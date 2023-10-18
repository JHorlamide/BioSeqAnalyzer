/* React */
import { useEffect, useState } from "react";

/* Libraries */
import { useForm } from "react-hook-form";
import { ProjectFormData, projectSchema } from "../../schemas/proteinAnalyzer/proteinProjectSchema";
import { zodResolver } from "@hookform/resolvers/zod";

/* Application Modules */
import { toast } from "react-hot-toast";
import { APP_PREFIX_PATH } from "../../config/AppConfig";
import useNavigation from "../useNavigation";
import utils from "../../utils";
import useErrorToast from "../useErrorToast";
import {
  useCreateProjectMutation,
  useGetProjectQuery,
  useUpdateProjectMutation
} from "../../services/proteinProject/proteinProjectAPI";

export const useCreateProteinProject = () => {
  const { handleError } = useErrorToast();
  const { handleNavigate } = useNavigation();
  const [inputVisibility, setInputVisibility] = useState({
    showRawSeqInput: false,
    showUniProtInput: true,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProjectFormData>({ resolver: zodResolver(projectSchema) });
  const [createProject, { isLoading }] = useCreateProjectMutation();

  const toggleShowUniProtInput = () => {
    setInputVisibility((prevState) => ({
      showRawSeqInput: !prevState.showRawSeqInput,
      showUniProtInput: !prevState.showUniProtInput,
    }));
  };

  const submitProject = async (data: ProjectFormData) => {
    try {
      const projectInputData = utils.getFilledFormData(data);
      const response = await createProject(projectInputData).unwrap();
      if (response.status === "Success") {
        toast.success(response.message);
        return handleNavigate(`${APP_PREFIX_PATH}/protein-analyzer/dashboard`);
      }

      handleError(response.message);
    } catch (error: any) {
      handleError(error);
    }
  };

  return {
    errors,
    isValid,
    isLoading,
    register,
    submitProject,
    handleSubmit,
    toggleShowUniProtInput,
    showRawSeqInput: inputVisibility.showRawSeqInput,
    showUniProtInput: inputVisibility.showUniProtInput,
  };
}

export const useUpdateProject = (projectId: string) => {
  const { handleError } = useErrorToast();
  const { handleNavigate } = useNavigation();
  const [projectData, setProjectData] = useState<ProjectFormData>();
  const [inputVisibility, setInputVisibility] = useState({
    showRawSeqInput: false,
    showUniProtInput: true,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProjectFormData>({ resolver: zodResolver(projectSchema) });

  const [updateProject, { isLoading }] = useUpdateProjectMutation();
  const { data: project } = useGetProjectQuery({ projectId });

  useEffect(() => {
    if (project) setProjectData(project?.data);
  }, [project]);

  const toggleShowUniProtInput = () => {
    setInputVisibility((prevState) => ({
      showRawSeqInput: !prevState.showRawSeqInput,
      showUniProtInput: !prevState.showUniProtInput,
    }));
  };

  const submitProject = async (data: ProjectFormData) => {
    try {
      const projectInputData = utils.getFilledFormData(data);
      const response = await updateProject({ projectId, data: projectInputData }).unwrap();
      if (response.status === "Success") {
        toast.success(response.message);
        return handleNavigate(`${APP_PREFIX_PATH}/protein-analyzer/dashboard`);
      }

      handleError(response.message);
    } catch (error: any) {
      handleError(error);
    }
  }

  return {
    errors,
    isValid,
    isLoading,
    projectData,
    register,
    handleSubmit,
    submitProject,
    toggleShowUniProtInput,
    showRawSeqInput: inputVisibility.showRawSeqInput,
    showUniProtInput: inputVisibility.showUniProtInput,
  };
}
