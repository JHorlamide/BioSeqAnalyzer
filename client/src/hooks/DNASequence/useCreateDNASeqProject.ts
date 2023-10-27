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
import { APP_PREFIX_PATH } from "../../config/AppConfig";
import { ProjectFormData, projectSchema } from "../../schemas/DNASequence/DNASequenceProjectSchema";
import {
  useCreateProjectMutation,
  useGetProjectQuery,
  useUpdateProjectMutation
} from "../../services/DNASequence/DNASeqProjectAPI";

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
    const formData = utils.getFilledFormData(data);
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
      const message = error.data[errorField] || error.data[errorField][0];
      const errorMessage = error.error || `${errorField}: ${message}`;
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

  const submitProject = async (data: ProjectFormData) => {
    const filledFormData = utils.getFilledFormData(data);
    const { nucleotide_type, topology } = filledFormData;

    if (nucleotide_type === "R" && topology === "C") {
      return handleError(UNSUPPORTED_TOPOLOGY_ERROR)
    }

    const formData = new FormData();
    const fileName = String(projectFile && projectFile.name.split(".")[0]);
    const projectName = fileName.charAt(0).toUpperCase() + fileName.slice(1)
    formData.append("name", projectName);
    formData.append("nucleotide_type", nucleotide_type);
    formData.append("topology", topology);
    formData.append("file", projectFile as File);

    try {
      const response = await createProject(formData).unwrap();

      if (response.name !== undefined) {
        toast.success("Project created successfully");
        return handleNavigate(`${APP_PREFIX_PATH}/dna-sequence/dashboard`)
      }
    } catch (error: any) {
      const errorField = Object.keys(error.data)[0];
      const message = error.data[errorField] || error.data[errorField][0];
      const errorMessage = error.error || `${errorField}: ${message}`;
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
    const formData = utils.getFilledFormData(data);
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