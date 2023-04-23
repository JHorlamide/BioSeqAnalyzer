import { HStack } from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { BsArrowLeftShort } from "react-icons/bs";
import FormInput from "../../../components/CustomInput/Input";
import {
  ForgotPassFormData,
  forgotPasswordSchema,
} from "../../../schemas/forgot-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../components/CustomBtn/Button";
import { AUTH_PREFIX_PATH } from "../../../config/AppConfig";
import { Fragment } from "react";
import useNavigation from "../../../hooks/useNavigation";

const ForgotPassword = () => {
  const { handleNavigate } = useNavigation();
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

  return (
    <Fragment>
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
            onClick={() => handleNavigate(`${AUTH_PREFIX_PATH}/login`)}
            leftIcon={<BsArrowLeftShort size={25} color="gray.3000" />}
          >
            Back
          </Button>
        </HStack>
      </form>
    </Fragment>
  );
};

export default ForgotPassword;
