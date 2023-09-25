import React, { Fragment } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      {children}
    </Fragment>
  );
};

export default AuthLayout;

// showHeading={true} formHeading={formHeading}
// const location = useLocation();
// const formHeading =
//   location.pathname === `${AUTH_PREFIX_PATH}/forgot-password`
//     ? "Reset your password"
//     : "";
