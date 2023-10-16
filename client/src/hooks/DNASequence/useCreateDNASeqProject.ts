/* React */ 
import { useState } from "react";

/* Libraries */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

/* Application Modules */
import utils from "../../utils";
import useNavigation from "../useNavigation";
import useErrorToast from "../useErrorToast";
import { ProjectFormData, projectSchema } from "../../schemas/DNASequence/DNASequenceProjectSchema";
import { APP_PREFIX_PATH } from "../../config/AppConfig";
import { useCreateProjectMutation, useGetProjectQuery, useUpdateProjectMutation } from "../../services/DNASequence/DNASeqProjectAPI";

const UNSUPPORTED_TOPOLOGY_ERROR = "Currently circular RNA sequences is not supported.";

export const useCreateDNASeqProject = () => {
  const { handleError } = useErrorToast();
  const { handleNavigate } = useNavigation();
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({ resolver: zodResolver(projectSchema) });

  const submitProject = async (data: ProjectFormData) => {
    const formData = utils.getFilledForm(data);
    const { nucleotide_type, topology } = formData;

    if (nucleotide_type === "R" && topology === "C") {
      return handleError(UNSUPPORTED_TOPOLOGY_ERROR)
    }

    try {
      const response = await createProject(formData).unwrap();
      if (response.name !== undefined) {
        toast.success("Project created successfully");
        return handleNavigate(`${APP_PREFIX_PATH}/dna-sequence/dashboard`)
      }
    } catch (error: any) {
      const errorField = Object.keys(error.data)[0];
      const errorMessage = error.error || `${errorField}: ${error.data[errorField][0]}`;
      handleError(errorMessage);
    }
  };

  return {
    errors,
    isLoading,
    register,
    getValues,
    submitProject,
    handleSubmit,
  };
}

export const useCreateDNASeqProjectWithFileUpload = () => {
  const { handleError } = useErrorToast();
  const { handleNavigate } = useNavigation();
  const [isDragOver, setIsDragOver] = useState(false);
  const [projectFile, setProjectFile] = useState<File | null | undefined>();
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({ resolver: zodResolver(projectSchema) });

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    setProjectFile(event.dataTransfer.files[0]);
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setProjectFile(file);

    if (!file) {
      handleError("No file selected");
    };
  };

  const getReqBody = (projectFormData: ProjectFormData) => {
    const { nucleotide_type, topology } = projectFormData;
    
    const formData = new FormData();
    formData.append("name", projectFile ? projectFile.name : "");
    formData.append("file", projectFile as File);
    formData.append("topology", topology);
    formData.append("nucleotide_type", nucleotide_type);

    return formData;
  }

  const submitProject = async (data: ProjectFormData) => {
    const formData = utils.getFilledForm(data);
    const { nucleotide_type, topology } = formData;

    if (nucleotide_type === "R" && topology === "C") {
      return handleError(UNSUPPORTED_TOPOLOGY_ERROR)
    }

    try {
      const response = await createProject({...getReqBody(formData) as any}).unwrap();
      if (response.name !== undefined) {
        toast.success("Project created successfully");
        return handleNavigate(`${APP_PREFIX_PATH}/dna-sequence/dashboard`)
      }
    } catch (error: any) {
      const errorField = Object.keys(error.data)[0];
      const errorMessage = error.error || `${errorField}: ${error.data[errorField][0]}`;
      handleError(errorMessage);
    }
  };

  return {
    errors,
    isLoading,
    projectFile,
    register,
    getValues,
    submitProject,
    handleSubmit,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInputChange,
  };
}

export const useUpdateDNASeqProject = (projectId: string) => {
  const { handleError } = useErrorToast();
  const { handleNavigate } = useNavigation();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({ resolver: zodResolver(projectSchema) });
  const [updateProject, { isLoading }] = useUpdateProjectMutation();
  const { data } = useGetProjectQuery({ projectId });

  const submitProject = async (data: ProjectFormData) => {
    const formData = utils.getFilledForm(data);
    const { nucleotide_type, topology } = formData;

    if (nucleotide_type === "R" && topology === "C") {
      return handleError(UNSUPPORTED_TOPOLOGY_ERROR)
    }

    try {
      const response = await updateProject({ projectId, ...formData }).unwrap();

      if (response.name !== undefined) {
        toast.success("Project updated successfully");
        return handleNavigate(`${APP_PREFIX_PATH}/dna-sequence/dashboard`)
      }
    } catch (error: any) {
      const errorField = Object.keys(error.data)[0];
      const errorMessage = error.error || `${errorField}: ${error.data[errorField][0]}`;
      handleError(errorMessage);
    }
  };

  return {
    errors,
    isLoading,
    register,
    getValues,
    submitProject,
    handleSubmit,
    projectData: data ?? data
  };
}