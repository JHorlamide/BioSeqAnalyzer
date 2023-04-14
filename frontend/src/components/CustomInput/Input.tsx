import { Ref, forwardRef } from "react";
import { Input, InputProps, FormControl, FormLabel } from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";

interface IProps<T extends string> extends InputProps {
  id: string;
  name: string;
  label: string;
  error?: string;
  register: UseFormRegister<any>;
}

const FormInput = forwardRef(
  <T extends string>(props: IProps<T>, ref: Ref<HTMLInputElement>) => {
    const { name, label, id, register, ...rest } = props;

    return (
      <FormControl {...rest}>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <Input
          _placeholder={{
            opacity: "0.6",
            color: "gray.500",
            fontSize: "15px",
          }}
          id={name}
          {...register(name)}
          {...rest}
          {...rest}
          height="45px"
          bg={"gray.700"}
          borderRadius="20px"
        />
      </FormControl>
    );
  }
);

export default FormInput;
