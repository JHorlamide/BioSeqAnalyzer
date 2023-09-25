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
import { AUTHENTICATED_ENTRY, AUTH_PREFIX_PATH } from "../config/AppConfig";
import utils from "../utils";
import { RegisterFormData, registrationSchema } from "../schemas/register.schema";
import { useRegisterUserMutation } from "../services/auth/registerApi";
import useErrorToast from "./useErrorToast";
import { projectApi } from "../services/project/projectApi";
import Utils from "../utils";

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
        handleNavigate(`${AUTHENTICATED_ENTRY}`);
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
  const [registerUser, { isLoading }] = useRegisterUserMutation();

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
      const errorMessage = Utils.getErrorMessage(error);
      handleOnError(errorMessage);
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
