/* Libraries */
import toast from "react-hot-toast";
import { BsArrowLeftShort } from "react-icons/bs";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";

/* Application Modules */
import Button from "../../../components/CustomBtn/Button";
import useNavigation from "../../../hooks/useNavigation";
import useErrorToast from "../../../hooks/useErrorToast";
import FormContainer from "../../../components/FormContainer/FormContainer";
import { FormInput } from "../../../components/CustomInput/FormInput/FormInput";
import { AUTH_PREFIX_PATH } from "../../../config/AppConfig";
import { useResetPasswordMutation } from "../../../services/auth/authApi";
import { resetPasswordSchema, ResetPassFormData } from "../../../schemas/auth/forgotPasswordSchema";

/* Chakra UI */
import { HStack } from "@chakra-ui/react";

type ForgotPasswordField = {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const { resetToken } = useParams();
  const { handleError } = useErrorToast();
  const { handleNavigate } = useNavigation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPassFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      const { password, confirmPassword } = data;

      const response = await resetPassword({
        password,
        confirmPassword,
        passwordToken: String(resetToken)
      }).unwrap();

      if (response.status === "Success") {
        toast.success(response.message);
        return handleNavigate(`${AUTH_PREFIX_PATH}/login`);
      }

      toast.error(response.message);
    } catch (error: any) {
      handleError(error.message);
    }
  };

  return (
    <FormContainer
      showHeading={true}
      formHeading="Reset your password"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput<ForgotPasswordField>
          label="New password"
          name="password"
          id="password"
          type="password"
          color="white"
          placeholder="Enter your new password"
          register={register}
          errors={errors}
        />

        <FormInput<ForgotPasswordField>
          label="Confirm password"
          name="confirmPassword"
          id="confirmPassword"
          type="password"
          color="white"
          placeholder="Confirm password"
          register={register}
          errors={errors}
        />

        <HStack mt={8} justifyItems="center">
          <Button
            _hover={{ bg: "white" }}
            type="button"
            width="full"
            onClick={() => handleNavigate(`${AUTH_PREFIX_PATH}/login`)}
            leftIcon={<BsArrowLeftShort size={25} color="black" />}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            width="full"
            alignSelf={"end"}
            color="white"
            bg="brand_blue.50"
            isDisabled={!isValid}
            isLoading={isLoading}
            _hover={{ bg: "brand_blue.200" }}
          >
            Send
          </Button>
        </HStack>
      </form>
    </FormContainer>
  );
}

export default ResetPassword