/* React */
import { useState } from "react";

/* Libraries */
import { Link, useSearchParams } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

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
import { AUTHENTICATED_ENTRY, AUTH_PREFIX_PATH } from "../../../config/AppConfig";
import { FormInput } from "../../../components/CustomInput/FormInput/FormInput";
import { useAppDispatch } from "../../../store/store";
import { useLoginUserMutation } from "../../../services/auth/authApi";
import { LoginFormData, loginSchema } from "../../../schemas/auth/loginSchema";
import { ProteinProjectAPI } from "../../../services/proteinProject/proteinProjectAPI";
import { setRefreshToken, setToken, setUser } from "../../../store/slices/authSlice";
import useErrorToast from "../../../hooks/useErrorToast";
import { AUTH_TOKEN, REFRESH_TOKEN } from "../../../constants/AuthConstant";
import useNavigation from "../../../hooks/useNavigation";

type LoginFormFields = {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const { handleError } = useErrorToast();
  const { handleNavigate } = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const [pathQuery] = useSearchParams();
  const userEmail = pathQuery.get("user_email");
  const projectType = pathQuery.get("project_type")
  const invitationToken = pathQuery.get("invitation_token")

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUser(data).unwrap();
      if (response.status === "Success") {
        const { accessToken, refreshToken, user } = response.data;
        handleAuthTokenDispatchAndStorage(user, accessToken, refreshToken);
        dispatch(ProteinProjectAPI.util.invalidateTags(["GetAllProjects"]));

        toast.success(response.message);
        handleNavigate(`${AUTHENTICATED_ENTRY}`);
      }
    } catch (error: any) {
      handleError(error);
    }
  };

  const handleAuthTokenDispatchAndStorage = (
    user: any,
    accessToken: string,
    refreshToken: string
  ) => {
    dispatch(setUser(user));
    dispatch(setToken(accessToken));
    dispatch(setRefreshToken(refreshToken));
    localStorage.setItem(AUTH_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  };

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
                defaultValue={userEmail ? userEmail : ""}
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
                type={showPassword ? "text" : "password"}
                name="password"
                register={register}
                errors={errors}
                placeholder="Enter your password"
              />

              <InputRightElement _hover={{ cursor: "pointer" }}>
                {showPassword ? (
                  <AiOutlineEye
                    onClick={() => setShowPassword(!showPassword)}
                    color="white"
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    onClick={() => setShowPassword(!showPassword)}
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
