/* React */
import React, { Suspense, memo } from "react";

/* Application Modules */
import AppLoader from "../Loading/AppLoader";
import Views from "../../views";
import MobileNote from "../MobileNote/MobileNote";
import { useAppSelector } from "../../store/store";

const AppLayout = React.lazy(() => import("./AppLayout"));
const AuthLayout = React.lazy(() => import("./AuthLayout"));

const Layout = () => {
  const token = useAppSelector((state) => state.auth.token);
  const Layout = token ? AppLayout : AuthLayout;

  return (
    <Suspense fallback={<AppLoader />}>
      <MobileNote />
      
      <Layout>
        <Views />
      </Layout>
    </Suspense>
  );
};

export default memo(Layout);
