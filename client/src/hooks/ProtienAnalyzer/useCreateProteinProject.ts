/* React */
import { useEffect, useState } from "react";

/* Libraries */
import { useForm } from "react-hook-form";
import { ProjectFormData, projectSchema } from "../../schemas/proteinProjectSchema";
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
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProjectFormData>({ resolver: zodResolver(projectSchema) });

  const { handleError } = useErrorToast();
  const { handleNavigate } = useNavigation();
  const [inputVisibility, setInputVisibility] = useState({
    showRawSeqInput: false,
    showUniProtInput: true,
  });
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
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProjectFormData>({ resolver: zodResolver(projectSchema) });

  const { handleError } = useErrorToast();
  const { handleNavigate } = useNavigation();
  const [inputVisibility, setInputVisibility] = useState({
    showRawSeqInput: false,
    showUniProtInput: true,
  });

  const { data: project } = useGetProjectQuery({ projectId });
  const [updateProject, { isLoading }] = useUpdateProjectMutation();

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

  useEffect(() => {
    if (project && project.data) {
      const {
        projectGoal,
        projectTitle,
        uniprotId,
        proteinPDBID,
        measuredProperty,
        proteinAminoAcidSequence
      } = project.data;

      setValue("projectTitle", projectTitle);
      setValue("projectGoal", projectGoal);
      setValue("uniprotId", uniprotId);
      setValue("measuredProperty", measuredProperty);
      setValue("proteinPDBID", proteinPDBID);
      setValue("proteinAminoAcidSequence", proteinAminoAcidSequence);
    }
  }, [project]);

  return {
    errors,
    isValid,
    isLoading,
    register,
    handleSubmit,
    submitProject,
    toggleShowUniProtInput,
    showRawSeqInput: inputVisibility.showRawSeqInput,
    showUniProtInput: inputVisibility.showUniProtInput,
  };
}
