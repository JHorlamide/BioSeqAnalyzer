import { Suspense, memo } from "react";
import Loading from "../Loading/Loading";
import AppRouter from "../../routes";
import { BrowserRouter } from "react-router-dom";

const Layout = () => {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Suspense>
  );
};

export default memo(Layout);
