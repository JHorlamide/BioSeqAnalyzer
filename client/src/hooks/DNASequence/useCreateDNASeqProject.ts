/* Libraries */
import { useForm } from "react-hook-form";
import { ProjectFormData, projectSchema } from "../../schemas/DNASequence/DNASequenceProjectSchema";
import { zodResolver } from "@hookform/resolvers/zod";

/* Application Modules */
import { toast } from "react-hot-toast";
import { APP_PREFIX_PATH } from "../../config/AppConfig";
import useNavigation from "../useNavigation";
import utils from "../../utils";
import useErrorToast from "../useErrorToast";
import { useCreateProjectMutation } from "../../services/DNASequence/DNASeqProjectAPI";

export const useCreateDNASeqProject = () => {
  const { handleError } = useErrorToast();
  const { handleNavigate } = useNavigation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({ resolver: zodResolver(projectSchema) });
  const [createProject, { isLoading }] = useCreateProjectMutation();

  const submitProject = async (data: ProjectFormData) => {
    try {
      const projectFormData = utils.getFilledForm(data);
      const response = await createProject(projectFormData).unwrap();
      if (response.status === 201) {
        toast.success("Project created successfully");
        return handleNavigate(`${APP_PREFIX_PATH}/dna-sequence/dashboard`)
      }
    } catch (error: any) {
      console.log({ error })
      const errorMessage = utils.getErrorMessage(error);
      handleError(errorMessage);
    }
  };

  return {
    errors,
    isLoading,
    register,
    submitProject,
    handleSubmit,
  };
}