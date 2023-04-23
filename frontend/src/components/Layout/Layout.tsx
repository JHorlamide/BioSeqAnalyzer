import React, { Suspense, memo } from "react";
import Loading from "../Loading/Loading";
import Views from "../../views";
import { useAppSelector } from "../../hooks/reduxHook";

const AppLayout = React.lazy(() => import("./AppLayout"));
const AuthLayout = React.lazy(() => import("./AuthLayout"));

const Layout = () => {
  const token = useAppSelector((state) => state.auth.token);
  const Layout = token ? AppLayout : AuthLayout;

  return (
    <Suspense fallback={<Loading />}>
      <Layout>
        <Views />
      </Layout>
    </Suspense>
  );
};

export default memo(Layout);
