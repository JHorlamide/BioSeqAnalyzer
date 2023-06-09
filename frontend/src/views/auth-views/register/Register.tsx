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
import { Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { AUTH_PREFIX_PATH } from "../../../config/AppConfig";
import { Fragment } from "react";
import { RegisterInput } from "./components/RegisterInput";
import Button from "../../../components/CustomBtn/Button";
import { useRegister } from "../../../hooks/useAuth";

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
    <Fragment>
      <Stack pb={10}>
        <Text textAlign="center" color="white">
          Already have an account?{" "}
          <Box as="small" fontSize={16} color="blue">
            <Link to={`${AUTH_PREFIX_PATH}/login`}>Login</Link>
          </Box>
        </Text>
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={8}>
          <FormControl>
            <FormLabel color="white">Full Name</FormLabel>
            <InputGroup flexDirection="column" width="100%">
              <InputLeftElement
                paddingTop={"5px"}
                pointerEvents={"none"}
                children={<MdDriveFileRenameOutline color="white" />}
              />

              <RegisterInput
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                register={register}
                error={errors.fullName?.message}
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

              <RegisterInput
                name="email"
                type="email"
                placeholder="Enter your email address"
                register={register}
                error={errors.email?.message}
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

              <RegisterInput
                name="password"
                type={show ? "text" : "password"}
                placeholder="Enter your password"
                register={register}
                error={errors.password?.message}
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
          isLoading={isLoading}
          isDisabled={!isValid}
          my={6}
          color="white"
          bg="brand_blue.50"
          width="full"
          type="submit"
        >
          Register
        </Button>
      </form>
    </Fragment>
  );
};

export default Register;
