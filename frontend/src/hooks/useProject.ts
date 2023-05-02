import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ProjectFormData, projectSchema } from "../schemas/project.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProjectMutation, useGetProteinSequenceQuery } from "../services/project/projectApi";
import { toast } from "react-hot-toast";
import useNavigation from "./useNavigation";
import { APP_PREFIX_PATH } from "../config/AppConfig";

const useProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [animoAcidSequence, setAminoAcidSequence] = useState<string | undefined>("");
  const [inputVisibility, setInputVisibility] = useState({
    showRawSeqInput: false,
    showUniProtInput: true,
  });
  const { handleNavigate } = useNavigation();

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProjectFormData>({ resolver: zodResolver(projectSchema) });
  const uniprotId = watch("uniprotId");

  const [createProject, { isLoading }] = useCreateProjectMutation();

  const {
    data,
    error: proteinSequenceError,
    isLoading: proteinSequenceIsLoading
  } = useGetProteinSequenceQuery({ uniprotId });

  useEffect(() => {
    setLoading(proteinSequenceIsLoading);
    setError("");

    if (data) {
      setAminoAcidSequence(data.data);
      setLoading(false);
    }

    if (proteinSequenceError) {
      setLoading(false);
      setError("Error fetching sequence");
    }
  }, [data, proteinSequenceError, proteinSequenceIsLoading]);

  const toggleShowUniProtInput = () => {
    setInputVisibility((prevState) => ({
      showRawSeqInput: !prevState.showRawSeqInput,
      showUniProtInput: !prevState.showUniProtInput,
    }));
  };

  const getFilledForm = (projectField: ProjectFormData) => {
    return Object.fromEntries(
      Object.entries(projectField).filter(([_, value]) => value !== "")
    ) as ProjectFormData;
  }

  const submitProject = async (data: ProjectFormData) => {
    const projectData = getFilledForm(data);

    try {
      const response = await createProject(projectData).unwrap();

      if (response.status === "Success") {
        toast.success(response.message);
        return handleNavigate(`${APP_PREFIX_PATH}/dashboard`);
      }

      toast.error(response.message);
    } catch (error: any) {
      const errorMessage = error.response?.data.message || error.data.message || error.message;
      toast.error(errorMessage);
    }
  };

  return {
    error,
    loading,
    errors,
    isValid,
    isLoading,
    submitProject,
    register,
    handleSubmit,
    toggleShowUniProtInput,
    animoAcidSequence,
    showRawSeqInput: inputVisibility.showRawSeqInput,
    showUniProtInput: inputVisibility.showUniProtInput,
  };
}

export default useProject;
