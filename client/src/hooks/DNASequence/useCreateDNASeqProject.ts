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

export const useCreateDNASeqProject = () => {
  const { handleOnError } = useErrorToast();
  const { handleNavigate } = useNavigation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({ resolver: zodResolver(projectSchema) });
  const isLoading = false;
  // const [createProject, { isLoading }] = useCreateProjectMutation();

  const submitProject = async (data: ProjectFormData) => {
    try {
      console.log({ data });
    } catch (error: any) {
      const errorMessage = utils.getErrorMessage(error);
      handleOnError(errorMessage);
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