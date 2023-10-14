/* Libraries */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/* Application Modules */
import utils from "../../utils";
import useNavigation from "../useNavigation";
import useErrorToast from "../useErrorToast";
import { toast } from "react-hot-toast";
import { ProjectFormData, projectSchema } from "../../schemas/DNASequence/DNASequenceProjectSchema";
import { APP_PREFIX_PATH } from "../../config/AppConfig";
import { useCreateProjectMutation } from "../../services/DNASequence/DNASeqProjectAPI";

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
    try {
      const projectFormData = utils.getFilledForm(data);
      const { nucleotide_type, topology } = projectFormData;

      if (nucleotide_type === "R" && topology === "C") {
        return handleError("Currently circular RNA sequences is not supported.")
      }

      const response = await createProject(projectFormData).unwrap();
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