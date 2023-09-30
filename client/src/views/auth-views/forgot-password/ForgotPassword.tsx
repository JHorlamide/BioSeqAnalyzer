import { HStack } from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { BsArrowLeftShort } from "react-icons/bs";
import FormInput from "../../../components/CustomInput/Input";
import {
  ForgotPassFormData,
  forgotPasswordSchema,
} from "../../../schemas/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../components/CustomBtn/Button";
import { AUTH_PREFIX_PATH } from "../../../config/AppConfig";
import { Fragment } from "react";
import useNavigation from "../../../hooks/useNavigation";
import FormContainer from "../../../components/FormContainer/FormContainer";

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
            color="white"
            bg="brand_blue.50"
            isDisabled={!isValid}
          >
            Send
          </Button>

          <Button
            _hover={{ bg: "white" }}
            type="button"
            width="full"
            onClick={() => handleNavigate(`${AUTH_PREFIX_PATH}/login`)}
            leftIcon={<BsArrowLeftShort size={25} color="black" />}
          >
            Back
          </Button>
        </HStack>
      </form>
    </FormContainer>
  );
};

export default ForgotPassword;
