import { forwardRef, Ref } from "react";
import { Input, InputProps, FormErrorMessage } from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";

type LoginInputName = "email" | "password";

interface LoginInputProps extends InputProps {
  name: LoginInputName;
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
            color: "white",
            fontSize: "15px",
          }}
          id={name}
          pl="35px"
          color="white"
          width="100%"
          height="45px"
          bg="brand_blue.300"
          border="1px solid white"
          focusBorderColor="white"
          borderRadius="20px"
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
