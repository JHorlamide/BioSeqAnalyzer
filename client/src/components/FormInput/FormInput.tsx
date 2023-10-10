/* React */
import { Fragment } from "react";

/* Libraries */
import { ErrorMessage } from "@hookform/error-message";
import {
  Path,
  DeepMap,
  FieldError,
  FieldValues,
  UseFormRegister,
  RegisterOptions,
} from "react-hook-form";

/* Chakra UI */
import {
  Input,
  InputProps,
  FormErrorMessage,
  Select,
  SelectProps,
  FormLabel,
  Stack,
} from "@chakra-ui/react";

type FormInputProps<IFormValues extends FieldValues> = {
  name: Path<IFormValues>;
  label?: string;
  rules?: RegisterOptions;
  errors?: Partial<DeepMap<IFormValues, FieldError>>;
  register?: UseFormRegister<IFormValues>;
} & Omit<InputProps, "name">;

interface SelectOptionType {
  label: string;
  value: string;
};

interface SelectInputProps<IFormValues extends FieldValues> {
  name: Path<IFormValues>;
  label: string;
  rules?: RegisterOptions;
  errors?: Partial<DeepMap<IFormValues, FieldError>>;
  register?: UseFormRegister<IFormValues>;
  selectProps?: SelectProps;
  selectOptions: SelectOptionType[];
}

export const FormInput =
  <IFormValues extends Record<string, unknown>>(props: FormInputProps<IFormValues>) => {
    const { name, rules, label, errors, register, ...inputProps } = props;

    return (
      <Fragment>
        {label && <FormLabel htmlFor={name} color="white">{label}</FormLabel>}

        <Input
          id={name}
          name={name}
          pl="35px"
          width="100%"
          height="45px"
          border="1px solid white"
          bg="brand_blue.300"
          focusBorderColor="white"
          borderRadius="20px"
          _placeholder={{
            opacity: "0.6",
            color: "brand_blue.100",
            fontSize: "15px",
          }}
          {...inputProps}
          {...(register && register(name, rules))}
        />

        <ErrorMessage
          errors={errors}
          name={name as any}
          render={({ message }) => (
            <FormErrorMessage pt={2} pl={2} color="red.500">
              {message}
            </FormErrorMessage>
          )}
        />
      </Fragment>
    );
  }

export const SelectInput =
  <IFormValues extends Record<string, unknown>>(props: SelectInputProps<IFormValues>) => {
    const {
      name,
      label,
      selectOptions,
      selectProps,
      errors,
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
            {...(register && register(name))}
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

        <ErrorMessage
          errors={errors}
          name={name as any}
          render={({ message }) => (
            <FormErrorMessage pt={2} pl={2} color="red.500">
              {message}
            </FormErrorMessage>
          )}
        />
      </Fragment>
    );
  }

export default SelectInput