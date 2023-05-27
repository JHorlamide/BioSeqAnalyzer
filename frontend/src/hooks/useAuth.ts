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

export const useLogin = () => {
  const [show, setShow] = useState(false);
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const { handleNavigate } = useNavigation();

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

        toast.success(response.message);

        // Update the state
        dispatch(setUser(user));
        dispatch(setToken(accessToken));
        dispatch(setRefreshToken(refreshToken));

        localStorage.setItem(AUTH_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
        handleNavigate(`${APP_PREFIX_PATH}/dashboard`);
      }
    } catch (error: any) {
      const errorMessage = utils.getErrorMessage(error);
      toast.error(errorMessage);
    }
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
      toast.error(errorMessage);
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