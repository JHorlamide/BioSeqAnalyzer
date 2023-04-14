import { HStack } from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { BsArrowLeftShort } from "react-icons/bs";
import FormInput from "../../../components/CustomInput/Input";
import {
  ForgotPassFormData,
  forgotPasswordSchema,
} from "../../../schemas/forgot-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormContainer from "../../../components/FormContainer/FormContainer";
import Button from "../../../components/CustomBtn/Button";
import { useNavigate } from "react-router-dom";
import { AUTH_PREFIX_PATH } from "../../../config/AppConfig";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPassFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  const handleNavigate = () => {
    navigate(`${AUTH_PREFIX_PATH}/login`);
  };

  return (
    <FormContainer showHeading={true} formHeading="Reset your password">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Email"
          name="email"
          id="email"
          type="email"
          placeholder="Enter your email address"
          register={register}
          error={errors.email?.message}
        />

        <HStack mt={8} justifyItems="center">
          <Button
            type="submit"
            width="full"
            alignSelf={"end"}
            isDisabled={!isValid}
          >
            Send
          </Button>

          <Button
            type="button"
            width="1/2"
            onClick={handleNavigate}
            leftIcon={<BsArrowLeftShort size={25} color="gray.3000" />}
          >
            Back
          </Button>
        </HStack>
      </form>
    </FormContainer>
  );
};

export default ForgotPassword;
