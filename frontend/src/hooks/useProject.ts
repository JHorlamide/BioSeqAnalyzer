import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ProjectFormData, projectSchema } from "../schemas/project.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProjectMutation } from "../store/slices/services/project/projectApiSlice";
import { toast } from "react-hot-toast";
import useNavigation from "./useNavigation";
import { APP_PREFIX_PATH } from "../config/AppConfig";
import { getProteinSequence } from "../services/ProjectService";

const useProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [animoAcidSequence, setAminoAcidSequence] = useState("");
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

  const [createProject, { isLoading, isError }] = useCreateProjectMutation();

  useEffect(() => {
    setLoading(true);
    setError("");

    const controller = new AbortController();
    const { signal } = controller;

    getProteinSequence(uniprotId, { signal })
      .then((response) => {
        setAminoAcidSequence(response.data);
        setLoading(false);
      })
      .catch((error: any) => {
        const errorMessage = error.response.data.message || error.message;
        setLoading(false);
        if (signal.aborted) return;
        setError(`Failed to fetch protein sequence: ${errorMessage}`);
      });
  }, [uniprotId])

  const toggleShowUniProtInput = () => {
    setInputVisibility((prevState) => ({
      showRawSeqInput: !prevState.showRawSeqInput,
      showUniProtInput: !prevState.showUniProtInput,
    }));
  };

  const submitProject = async (data: ProjectFormData) => {
    const projectData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== "")
    ) as ProjectFormData;

    try {
      const response = await createProject(projectData).unwrap();

      if (response.status === "Success") {
        toast.success(response.message);
        return handleNavigate(`${APP_PREFIX_PATH}/dashboard`);
      }

      toast.error(response.message);

    } catch (error: any) {
      console.log(error);
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
