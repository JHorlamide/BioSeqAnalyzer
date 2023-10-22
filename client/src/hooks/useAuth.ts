import { useState } from "react";

/* Libraries */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

/* Application Modules */
import useNavigation from "./useNavigation";
import useErrorToast from "./useErrorToast";
import { ProteinProjectAPI } from "../services/proteinProject/proteinProjectAPI";
import { useLoginUserMutation } from "../services/auth/authApi";
import { useAppDispatch } from "../store/store";
import { LoginFormData, loginSchema } from "../schemas/auth/loginSchema";
import { setRefreshToken, setToken, setUser } from "../store/slices/authSlice";
import { AUTH_TOKEN, REFRESH_TOKEN } from "../constants/AuthConstant";
import { AUTHENTICATED_ENTRY, AUTH_PREFIX_PATH } from "../config/AppConfig";
import { useRegisterUserMutation } from "../services/auth/registerApi";
import { RegisterFormData, registrationSchema } from "../schemas/auth/registerSchema";

export const useLogin = () => {
  const { handleError: handleError } = useErrorToast();
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const { handleNavigate } = useNavigation();
  const [loginUser, { isLoading }] = useLoginUserMutation();

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

  const handleShowPassword = () => setShow(!show);

  return {
    show,
    errors,
    isValid,
    isLoading,
    onSubmit,
    register,
    handleSubmit,
    handleShowPassword,
  }
}

export const useRegister = () => {
  const { handleError } = useErrorToast();
  const { handleNavigate } = useNavigation();
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registrationSchema) });
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const onSubmit = async (data: RegisterFormData) => {
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
  };

  const handleShowPassword = () => setShow(!show);

  return {
    show,
    isLoading,
    errors,
    isValid,
    register,
    onSubmit,
    handleSubmit,
    handleShowPassword,
  }
}

export default useLogin;
