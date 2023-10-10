/* Libraries */
import { Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

/* Chakra UI */
import {
  Stack,
  Box,
  Flex,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
  InputRightElement,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

/* Application Modules */
import Button from "../../../components/CustomBtn/Button";
import FormContainer from "../../../components/FormContainer/FormContainer";
import { AUTH_PREFIX_PATH } from "../../../config/AppConfig";
import { useLogin } from "../../../hooks/useAuth";
import { FormInput } from "../../../components/FormInput/FormInput";

type LoginFormFields = {
  email: string;
  password: string;
}

const Login = () => {
  const {
    errors,
    show,
    isValid,
    isLoading,
    handleShowPassword,
    handleSubmit,
    onSubmit,
    register,
  } = useLogin();

  return (
    <FormContainer showHeading={true}>
      <Stack pb={10}>
        <Text textAlign="center" color="white">
          Don't have an account?{" "}
          <Box as="small" fontSize={16} color="blue">
            <Link to={`${AUTH_PREFIX_PATH}/register`}>Register</Link>
          </Box>
        </Text>
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={8} color="white">
          <FormControl>
            <FormLabel color="white">Email</FormLabel>
            <InputGroup>
              <InputLeftElement
                pt="5px"
                pointerEvents={"none"}
                children={<HiOutlineMail color="white" />}
              />

              <FormInput<LoginFormFields>
                type="email"
                name="email"
                register={register}
                errors={errors}
                placeholder="Enter your email"
              />
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel color="white">Password</FormLabel>
            <InputGroup>
              <InputLeftElement
                paddingTop={"5px"}
                pointerEvents={"none"}
                children={<RiLockPasswordLine color="white" />}
              />

              <FormInput<LoginFormFields>
                type={show ? "text" : "password"}
                name="password"
                register={register}
                errors={errors}
                placeholder="Enter your password"
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

        <Flex justify="end" py={3}>
          <Text color="blue">
            <Link to={`${AUTH_PREFIX_PATH}/forgot-password`}>
              Forgot Password?
            </Link>
          </Text>
        </Flex>

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
          Login
        </Button>
      </form>
    </FormContainer>
  );
};

export default Login;
