import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ProjectFormData, projectSchema } from "../schemas/projectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateProjectMutation,
  useGetProjectQuery,
  useUpdateProjectMutation
} from "../services/project/projectApi";
import { toast } from "react-hot-toast";
import useNavigation from "./useNavigation";
import { APP_PREFIX_PATH } from "../config/AppConfig";
import utils from "../utils";
import useErrorToast from "./useErrorToast";

const getFilledForm = (projectField: ProjectFormData) => {
  return Object.fromEntries(
    Object.entries(projectField).filter(([_, value]) => value !== "")
  ) as ProjectFormData;
}

export const useProject = () => {
  const { handleOnError } = useErrorToast();
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
      const projectInputData = getFilledForm(data);
      const response = await createProject(projectInputData).unwrap();
      if (response.status === "Success") {
        toast.success(response.message);
        return handleNavigate(`${APP_PREFIX_PATH}/protein-analyzer/dashboard`);
      }

      handleOnError(response.message);
    } catch (error: any) {
      const errorMessage = utils.getErrorMessage(error);
      handleOnError(errorMessage);
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
  const { handleOnError } = useErrorToast();
  const { handleNavigate } = useNavigation();
  const [projectData, setProjectData] = useState<ProjectFormData>();
  const [inputVisibility, setInputVisibility] = useState({
    showRawSeqInput: false,
    showUniProtInput: true,
  });

  const [updateProject, { isLoading }] = useUpdateProjectMutation();
  const { data: project } = useGetProjectQuery({ projectId });

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProjectFormData>({ resolver: zodResolver(projectSchema) });

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
      const projectInputData = getFilledForm(data);
      const response = await updateProject({ projectId, data: projectInputData }).unwrap();
      if (response.status === "Success") {
        toast.success(response.message);
        return handleNavigate(`${APP_PREFIX_PATH}/protein-analyzer/dashboard`);
      }

      handleOnError(response.message);
    } catch (error: any) {
      const errorMessage = utils.getErrorMessage(error);
      handleOnError(errorMessage);
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
