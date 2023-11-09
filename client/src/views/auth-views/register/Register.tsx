/* React */
import { useState } from "react";

/* Libraries */
import { Link, useSearchParams } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

/* Application Modules */
import { AUTHENTICATED_ENTRY, AUTH_PREFIX_PATH, BASE_URL } from "../../../config/AppConfig";
import { FormInput } from "../../../components/CustomInput/FormInput/FormInput";
import Button from "../../../components/CustomBtn/Button";
import FormContainer from "../../../components/FormContainer/FormContainer";
import useNavigation from "../../../hooks/useNavigation";
import useErrorToast from "../../../hooks/useErrorToast";
import { RegisterFormData, registrationSchema } from "../../../schemas/auth/registerSchema";
import { useRegisterUserMutation } from "../../../services/auth/registerApi";
import { useAcceptProjectInviteMutation } from "../../../services/user/userServiceAPI";

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
  const { handleNavigate } = useNavigation();
  const [pathQuery] = useSearchParams();
  const { handleError } = useErrorToast();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registrationSchema) });
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [acceptInvitation, { isLoading: isLoadingAccept }] = useAcceptProjectInviteMutation()

  const userEmail = pathQuery.get("user_email");
  const projectType = pathQuery.get("project_type");
  const invitationToken = pathQuery.get("invitation_token");
  const projectId = pathQuery.get("project_id");

  const addUserToProject = async (userId: string) => {
    try {
      const proteinReqURL = `${BASE_URL}/protein-user-project-associations/`;
      const DNASeqReqURL = `${BASE_URL}/dna-user-project-associations/`;
      const reqURL = projectType === "dna" ? DNASeqReqURL : proteinReqURL;

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

  const handleUserRegistration = async (data: RegisterFormData) => {
    try {
      const response = await registerUser(data).unwrap();

      if (response.status === "Success") {
        toast.success(response.message);

        setTimeout(() => {
          handleNavigate(`${AUTH_PREFIX_PATH}/login`);
        }, 1000);
      }
    } catch (error: any) {
      handleError(error);
    }
  }

  const handleAcceptInviteRegistration = async (data: RegisterFormData) => {
    try {
      const reqBody = {
        fullName: data.fullName,
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

  const onSubmit = async (data: RegisterFormData) => {

    if (invitationToken && projectType && userEmail) {
      return await handleAcceptInviteRegistration(data);
    }

    await handleUserRegistration(data);
  };


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
                defaultValue={userEmail ? userEmail : ""}
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
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                register={register}
                errors={errors}
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
          Register
        </Button>
      </form>
    </FormContainer>
  );
};

export default Register;
