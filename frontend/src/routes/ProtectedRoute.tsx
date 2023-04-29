import { useAppSelector } from "../store";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import {
  AUTH_PREFIX_PATH,
  UNAUTHENTICATED_ENTRY,
  REDIRECT_URL_KEY,
} from "../config/AppConfig";

const ProtectedRoute = () => {
  const token = useAppSelector((state) => state.auth.token);
  const location = useLocation();

  if (!token) {
    return (
      <Navigate
        to={`${AUTH_PREFIX_PATH}${UNAUTHENTICATED_ENTRY}?${REDIRECT_URL_KEY}=${location.pathname}`}
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
