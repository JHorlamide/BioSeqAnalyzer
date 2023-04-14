import { Navigate, Outlet } from "react-router-dom";
import { AUTHENTICATED_ENTRY } from "../config/AppConfig";
import { useAppSelector } from "../hooks/reduxHook";

const PublicRoute = () => {
  const { token } = useAppSelector((state) => state.auth);
  return token ? <Navigate to={AUTHENTICATED_ENTRY} /> : <Outlet />;
};

export default PublicRoute;
