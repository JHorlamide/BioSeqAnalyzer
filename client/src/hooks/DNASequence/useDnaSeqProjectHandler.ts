/* React */
import { useEffect, useState } from "react";

/* Libraries */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

/* Application Modules */
import utils from "../../utils";
import useNavigation from "../useNavigation";
import useErrorToast from "../useErrorToast";
import { DNA_SEQ_ENTRY } from "../../config/AppConfig";
import { ProjectFormData, projectSchema } from "../../schemas/DNASequenceProjectSchema";
import {
  useCreateProjectMutation,
  useGetProjectQuery,
  useUpdateProjectMutation
} from "../../services/DNASequence/DNASeqProjectAPI";

const UNSUPPORTED_TOPOLOGY_ERROR = "Currently circular RNA sequences is not supported.";

export const useCreateDNASeqProject = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({ resolver: zodResolver(projectSchema) });

  const { handleError } = useErrorToast();
  const { handleNavigate } = useNavigation();
  const [createProject, { isLoading }] = useCreateProjectMutation();


  const submitProject = async (data: ProjectFormData) => {
    const formData = utils.getFilledFormData(data);
    const { nucleotide_type, topology } = formData;

    if (nucleotide_type === "R" && topology === "C") {
      return handleError(UNSUPPORTED_TOPOLOGY_ERROR)
    }

    try {
      const response = await createProject(formData).unwrap();

      if (response.status === "Success") {
        toast.success("Project created successfully");
        return handleNavigate(DNA_SEQ_ENTRY);
      }

      handleError(response.message);
    } catch (error: any) {
      handleError(error.message || error);
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
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({ resolver: zodResolver(projectSchema) });


  const { handleError } = useErrorToast();
  const { handleNavigate } = useNavigation();
  const [isDragOver, setIsDragOver] = useState(false);
  const [projectFile, setProjectFile] = useState<File | null | undefined>();
  const [createProject, { isLoading }] = useCreateProjectMutation();


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
    const projectName = utils.capitalizeText(fileName)
    formData.append("name", projectName);
    formData.append("nucleotide_type", nucleotide_type);
    formData.append("topology", topology);
    formData.append("file", projectFile as File);

    try {
      const response = await createProject(formData).unwrap();

      if (response.status === "Success") {
        toast.success("Project created successfully");
        return handleNavigate(DNA_SEQ_ENTRY);
      }

      handleError(response.message);
    } catch (error: any) {
      handleError(error.message || error);
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

export const useCreateDNASeqProjectByImport = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({ resolver: zodResolver(projectSchema) });


  const { handleError } = useErrorToast();
  const { handleNavigate } = useNavigation();
  const [createProject, { isLoading }] = useCreateProjectMutation();


  const submitProject = async (data: ProjectFormData) => {
    const formData = utils.getFilledFormData(data);
    const { nucleotide_type, topology } = formData;

    if (nucleotide_type === "R" && topology === "C") {
      return handleError(UNSUPPORTED_TOPOLOGY_ERROR)
    }

    try {
      const response = await createProject({
        ...formData,
        name: formData.sequence_id
      }).unwrap();

      if (response.status === "Success") {
        toast.success("Project created successfully");
        return handleNavigate(DNA_SEQ_ENTRY);
      }

      handleError(response.message);
    } catch (error: any) {
      handleError(error.message || error);
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

export const useUpdateDNASeqProject = (projectId: string) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({ resolver: zodResolver(projectSchema) });

  const { handleError } = useErrorToast();
  const { handleNavigate } = useNavigation();
  const { data } = useGetProjectQuery({ projectId });
  const [updateProject, { isLoading }] = useUpdateProjectMutation();

  const submitProject = async (data: ProjectFormData) => {
    const formData = utils.getFilledFormData(data);
    const { nucleotide_type, topology } = formData;

    if (nucleotide_type === "R" && topology === "C") {
      return handleError(UNSUPPORTED_TOPOLOGY_ERROR)
    }

    try {
      const response = await updateProject({ projectId, ...formData }).unwrap();

      if (response && response.id === projectId) {
        toast.success("Project updated successfully");
        return handleNavigate(DNA_SEQ_ENTRY);
      }
    } catch (error: any) {
      handleError(error.message || error);
    }
  };

  useEffect(() => {
    if (data && data.data) {
      const {
        name,
        bases,
        description,
        sequence_id,
        topology,
        nucleotide_type
      } = data.data;

      setValue('name', name);
      setValue('topology', topology);
      setValue('nucleotide_type', nucleotide_type);
      setValue('bases', bases !== null ? bases : "");
      setValue('description', description !== null ? description : "");
      setValue('sequence_id', sequence_id !== null ? sequence_id : "");
    }
  }, [data]);

  return {
    errors,
    isLoading,
    register,
    submitProject,
    handleSubmit,
  };
}
