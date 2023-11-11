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
import useErrorToast from "../../../hooks/useErrorToast";
import useNavigation from "../../../hooks/useNavigation";
import { AUTHENTICATED_ENTRY, AUTH_PREFIX_PATH, BASE_URL } from "../../../config/AppConfig";
import { FormInput } from "../../../components/CustomInput/FormInput/FormInput";
import { useAppDispatch } from "../../../store/store";
import { useLoginUserMutation } from "../../../services/auth/authApi";
import { LoginFormData, loginSchema } from "../../../schemas/auth/loginSchema";
import { ProteinProjectAPI } from "../../../services/proteinProject/proteinProjectAPI";
import { DNASeqProjectAPI } from "../../../services/DNASequence/DNASeqProjectAPI";
import { setRefreshToken, setToken, setUser } from "../../../store/slices/authSlice";
import { AUTH_TOKEN, REFRESH_TOKEN } from "../../../constants/AuthConstant";
import { useAcceptProjectInviteMutation } from "../../../services/user/userServiceAPI";

type LoginFormFields = {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    userId: string;
    fullName: string;
    email: string;
  }
}

const Login = () => {
  const dispatch = useAppDispatch();
  const [pathQuery] = useSearchParams();
  const { handleError } = useErrorToast();
  const { handleNavigate } = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const redirectUrl = pathQuery.get("redirect");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });
  const [acceptInvitation, { isLoading: isLoadingAccept }] = useAcceptProjectInviteMutation()

  const userEmail = pathQuery.get("user_email");
  const projectType = pathQuery.get("project_type");
  const invitationToken = pathQuery.get("invitation_token");
  const projectId = pathQuery.get("project_id");

  const addUserToProject = async (userId: string) => {
    try {
      const proteinReqURL = `${BASE_URL}/protein-user-project-associations/`;
      const DNASeqReqURL = `${BASE_URL}/dna-user-project-associations/`;
      const reqURL = projectType?.toLowerCase() === "dna" ? DNASeqReqURL : proteinReqURL;

      const requestData = {
        user_id: userId,
        project_id: String(projectId)
      };

      const requestOption = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(requestData)
      }

      const response = await fetch(reqURL, requestOption);
      const result = await response.json();

      if (result.status === "Success") {
        return result;
      }

      handleError(result.message);
    } catch (error: any) {
      handleError(error.message);
    }
  }

  const handleAcceptInviteRegistration = async (data: LoginFormData) => {
    try {
      const reqBody = {
        userEmail: data.email,
        password: data.password,
        invitationToken: String(invitationToken)
      }

      const response = await acceptInvitation(reqBody).unwrap();

      if (response.status === "Success") {
        const { userId } = response.data;
        const res = await addUserToProject(userId);

        if (res.status === "Success") {
          toast.success(response.message);
          return handleNavigate(AUTHENTICATED_ENTRY);
        }
      }

      handleError(response.message);
    } catch (error: any) {
      handleError(error.message);
    }
  }

  const handleLogin = async (data: LoginFormData) => {
    try {
      const response = await loginUser(data).unwrap();

      if (response.status === "Success") {
        dispatchTokenAndRefetchData(response.data);
        toast.success(response.message);

        if (redirectUrl !== null) {
          return handleNavigate(redirectUrl);
        }

        return handleNavigate(AUTHENTICATED_ENTRY);
      }

      handleError(response.message);
    } catch (error: any) {
      handleError(error);
    }
  }

  const onSubmit = async (data: LoginFormData) => {
    if (invitationToken && projectType && userEmail) {
      return await handleAcceptInviteRegistration(data);
    }

    await handleLogin(data);
  };

  const dispatchTokenAndRefetchData = (authData: LoginResponse) => {
    const { user, accessToken, refreshToken } = authData;

    dispatch(setUser(user));
    dispatch(setToken(accessToken));
    dispatch(setRefreshToken(refreshToken));
    dispatch(ProteinProjectAPI.util.invalidateTags(["GetAllProjects"]));
    dispatch(DNASeqProjectAPI.util.invalidateTags(["GetAllDNAProjects"]));
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
          isLoading={isLoading ? isLoading : isLoadingAccept}
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
