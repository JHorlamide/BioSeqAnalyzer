/* Libraries */
import { Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

/* Application Modules */
import { AUTH_PREFIX_PATH } from "../../../config/AppConfig";
import { useRegister } from "../../../hooks/useAuth";
import { FormInput } from "../../../components/FormInput/FormInput";
import Button from "../../../components/CustomBtn/Button";
import FormContainer from "../../../components/FormContainer/FormContainer";

/* Chakra UI */
import {
  Stack,
  Box,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
  InputRightElement,
} from "@chakra-ui/react";

type RegisterFormFields = {
  fullName: string;
  email: string;
  password: string;
}

const Register = () => {
  const {
    handleShowPassword,
    handleSubmit,
    onSubmit,
    register,
    errors,
    show,
    isLoading,
    isValid
  } = useRegister();

  return (
    <FormContainer showHeading={true}>
      <Stack pb={10}>
        <Text textAlign="center" color="white">
          Already have an account?{" "}
          <Box as="small" fontSize={16} color="blue">
            <Link to={`${AUTH_PREFIX_PATH}/login`}>Login</Link>
          </Box>
        </Text>
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={8} color="white">
          <FormControl>
            <FormLabel color="white">Full Name</FormLabel>
            <InputGroup flexDirection="column" width="100%">
              <InputLeftElement
                paddingTop={"5px"}
                pointerEvents={"none"}
                children={<MdDriveFileRenameOutline color="white" />}
              />

              <FormInput<RegisterFormFields>
                name="fullName"
                placeholder="Enter your full name"
                register={register}
                errors={errors}
              />
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel color="white">Email Address</FormLabel>
            <InputGroup flexDirection="column" width="100%">
              <InputLeftElement
                paddingTop={"5px"}
                pointerEvents={"none"}
                children={<HiOutlineMail color="white" />}
              />

              <FormInput<RegisterFormFields>
                name="email"
                type="email"
                placeholder="Enter your email address"
                register={register}
                errors={errors}
              />
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel color="white">Password</FormLabel>
            <InputGroup flexDirection="column" width="100%">
              <InputLeftElement
                paddingTop={"5px"}
                pointerEvents={"none"}
                children={<RiLockPasswordLine color="white" />}
              />

              <FormInput<RegisterFormFields>
                name="password"
                type={show ? "text" : "password"}
                placeholder="Enter your password"
                register={register}
                errors={errors}
              />

              <InputRightElement _hover={{ cursor: "pointer" }}>
                {show ? (
                  <AiOutlineEye
                    onClick={handleShowPassword}
                    color="white"
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    onClick={handleShowPassword}
                    color="white"
                  />
                )}
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </VStack>

        <Button
          my={6}
          color="white"
          bg="brand_blue.50"
          width="full"
          type="submit"
          isLoading={isLoading}
          isDisabled={!isValid}
          _hover={{ bg: "brand_blue.200" }}
        >
          Register
        </Button>
      </form>
    </FormContainer>
  );
};

export default Register;
