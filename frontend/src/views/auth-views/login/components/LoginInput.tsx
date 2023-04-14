import { forwardRef, Ref } from "react";
import { Input, InputProps, FormErrorMessage } from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";

interface LoginInputProps extends InputProps {
  name: "email" | "password";
  error?: string;
  register: UseFormRegister<{
    email: string;
    password: string;
  }>;
}

export const LoginInput = forwardRef(
  (props: LoginInputProps, ref: Ref<HTMLInputElement>) => {
    const { name, error, register, ...rest } = props;

    return (
      <>
        <Input
          _placeholder={{
            opacity: "0.6",
            color: "gray.500",
            fontSize: "15px",
          }}
          pl="35px"
          width="100%"
          height="45px"
          bg={"gray.700"}
          border="none"
          focusBorderColor="none"
          borderRadius={"20px"}
          id={name}
          {...rest}
          {...register(name)}
        />

        {error && (
          <FormErrorMessage pt={2} pl={2} color="red.500">
            {error}
          </FormErrorMessage>
        )}
      </>
    );
  }
);
