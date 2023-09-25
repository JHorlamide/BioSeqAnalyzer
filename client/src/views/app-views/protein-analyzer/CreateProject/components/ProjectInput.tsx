import { forwardRef, Ref, Fragment } from "react";
import {
  Input,
  InputProps,
  FormErrorMessage,
  Select,
  SelectProps,
  FormLabel,
  Stack,
} from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";
import { IProject, InputName } from "../../../../../schemas/project.schema";

type SelectOptionType = {
  label: string;
  value: string;
};

interface ProjectInputProps {
  inputProps?: InputProps;
  name: InputName;
  error?: string;
  register: UseFormRegister<IProject>;
}

interface SelectInputProps extends ProjectInputProps {
  label: string;
  selectOptions: SelectOptionType[];
  selectProps?: SelectProps;
}

const ProjectInput = forwardRef(
  (props: ProjectInputProps, ref: Ref<HTMLInputElement>) => {
    const { name, inputProps, error, register } = props;

    return (
      <Fragment>
        <Input
          _placeholder={{
            opacity: "0.6",
            color: "brand_blue.100",
            fontSize: "15px",
          }}
          pl="35px"
          width="100%"
          height="45px"
          border="1px solid white"
          bg="brand_blue.300"
          focusBorderColor="white"
          borderRadius="20px"
          id={name}
          {...inputProps}
          {...register(name)}
        />

        {error && (
          <FormErrorMessage pt={2} pl={2} color="red.500">
            {error}
          </FormErrorMessage>
        )}
      </Fragment>
    );
  }
);

export const SelectInput = forwardRef(
  (props: SelectInputProps, ref: Ref<HTMLInputElement>) => {
    const {
      name,
      label,
      selectOptions,
      selectProps,
      error,
      register,
      ...rest
    } = props;

    return (
      <Fragment>
        <Stack width="full">
          <FormLabel>{label}</FormLabel>
          <Select
            {...selectProps}
            {...rest}
            {...register(name)}
            _focus={{ border: "none", borderColor: "white" }}
            border="0.5px solid white"
          >
            {selectOptions.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Stack>

        {error && (
          <FormErrorMessage pt={2} pl={2} color="red.500">
            {error}
          </FormErrorMessage>
        )}
      </Fragment>
    );
  }
);

export default ProjectInput;
