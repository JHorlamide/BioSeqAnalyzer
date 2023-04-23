import React from "react";
import FormContainer from "../FormContainer/FormContainer";
import { useLocation } from "react-router-dom";
import { AUTH_PREFIX_PATH } from "../../config/AppConfig";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const formHeading =
    location.pathname === `${AUTH_PREFIX_PATH}/forgot-password`
      ? "Reset your password"
      : "";

  return (
    <FormContainer showHeading={true} formHeading={formHeading}>
      {children}
    </FormContainer>
  );
};

export default AuthLayout;
