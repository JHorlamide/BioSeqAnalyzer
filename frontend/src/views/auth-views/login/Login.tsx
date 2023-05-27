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
import { Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { AUTH_PREFIX_PATH } from "../../../config/AppConfig";
import { Fragment } from "react";
import Button from "../../../components/CustomBtn/Button";
import { LoginInput } from "./components/LoginInput";
import { useLogin } from "../../../hooks/useAuth";

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
    <Fragment>
      <Stack pb={10}>
        <Text textAlign="center">
          Don't have an account?{" "}
          <Box as="small" fontSize={16} color="blue">
            <Link to={`${AUTH_PREFIX_PATH}/register`}>Register</Link>
          </Box>
        </Text>
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={8}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <InputGroup>
              <InputLeftElement
                pt="5px"
                pointerEvents={"none"}
                children={<HiOutlineMail color="gray.3000" />}
              />

              <LoginInput
                pl="35px"
                name="email"
                type="email"
                placeholder="Email"
                register={register}
                error={errors.email?.message}
              />
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <InputLeftElement
                paddingTop={"5px"}
                pointerEvents={"none"}
                children={<RiLockPasswordLine color="gray.3000" />}
              />

              <LoginInput
                name="password"
                placeholder="Password"
                type={show ? "text" : "password"}
                register={register}
                error={errors.password?.message}
              />

              <InputRightElement _hover={{ cursor: "pointer" }}>
                {show ? (
                  <AiOutlineEye
                    onClick={handleShowPassword}
                    color="gray.3000"
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    onClick={handleShowPassword}
                    color="gray.3000"
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
          isLoading={isLoading}
          isDisabled={!isValid}
          my={6}
          width="full"
          type="submit"
        >
          Login
        </Button>
      </form>
    </Fragment>
  );
};

export default Login;
