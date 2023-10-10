/* Libraries */
import { FieldValues, useForm } from "react-hook-form";
import { BsArrowLeftShort } from "react-icons/bs";
import { zodResolver } from "@hookform/resolvers/zod";

/* Application Modules */
import { AUTH_PREFIX_PATH } from "../../../config/AppConfig";
import { FormInput } from "../../../components/FormInput/FormInput";
import Button from "../../../components/CustomBtn/Button";
import useNavigation from "../../../hooks/useNavigation";
import FormContainer from "../../../components/FormContainer/FormContainer";
import {
  ForgotPassFormData,
  forgotPasswordSchema,
} from "../../../schemas/forgotPasswordSchema";

/* Chakra UI */
import { HStack } from "@chakra-ui/react";

type ForgotPasswordField = {
  email: string;
}

const ForgotPassword = () => {
  const { handleNavigate } = useNavigation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPassFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: FieldValues) => { };

  return (
    <FormContainer
      showHeading={true}
      formHeading="Reset your password"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput<ForgotPasswordField>
          label="Email"
          name="email"
          id="email"
          type="email"
          color="white"
          placeholder="Enter your email address"
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
            Back
          </Button>

          <Button
            type="submit"
            width="full"
            alignSelf={"end"}
            color="white"
            bg="brand_blue.50"
            isDisabled={!isValid}
          >
            Send
          </Button>
        </HStack>
      </form>
    </FormContainer>
  );
};

export default ForgotPassword;
