import { useState } from "react";
import { useLoginUserMutation } from "../services/auth/authApi";
import { useAppDispatch } from "../store/store";
import useNavigation from "./useNavigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "../schemas/login.schema";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { setRefreshToken, setToken, setUser } from "../store/slices/authSlice";
import { AUTH_TOKEN, REFRESH_TOKEN } from "../constants/AuthConstant";
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from "../config/AppConfig";
import utils from "../utils";
import { RegisterFormData, registrationSchema } from "../schemas/register.schema";
import { useRegisterUserMutation } from "../services/auth/registerApi";
import useErrorToast from "./useErrorToast";
import { projectApi } from "../services/project/projectApi";

export const useLogin = () => {
  const { handleOnError } = useErrorToast();
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
        dispatch(projectApi.util.invalidateTags(["GetAllProjects"]));
        toast.success(response.message);
        handleNavigate(`${APP_PREFIX_PATH}/dashboard`);
      }
    } catch (error: any) {
      const errorMessage = utils.getErrorMessage(error);
      handleOnError(errorMessage);
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
    onSubmit,
    handleShowPassword,
    isLoading,
    errors,
    isValid,
    register,
    handleSubmit,
    show,
  }

}

export const useRegister = () => {
  const { handleOnError } = useErrorToast();
  const { handleNavigate } = useNavigation();
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registrationSchema) });
  const [registerUser, { isLoading, isError }] = useRegisterUserMutation();

  const handleShowPassword = () => setShow(!show);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await registerUser(data).unwrap();
      if (response.status === "Success") {
        toast.success(response.message);
        setTimeout(() => {
          handleNavigate(`${AUTH_PREFIX_PATH}/login`);
        }, 2000);
      }
    } catch (error: any) {
      const errorMessage = error.response.data.message || error.message;
      handleOnError(errorMessage);
    }
  };

  return {
    onSubmit,
    handleSubmit,
    handleShowPassword,
    register,
    isLoading,
    errors,
    isValid,
    show
  }
}

export default useLogin;