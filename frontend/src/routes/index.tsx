import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoute, protectedRoute } from "../config/RouteConfig";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import AppRoute from "./AppRoute";
import { AUTHENTICATED_ENTRY } from "../config/AppConfig";
import Website from "../views/website/Website";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Website />} />

      {/* Protected Routes */}
      <Route path="/" element={<ProtectedRoute />}>
        {protectedRoute.map((route, index) => (
          <Route
            key={route.key + index}
            path={route.path}
            element={
              <AppRoute
                routeKey={route.key}
                component={route.component}
              // {...route.meta}
              />
            }
          />
        ))}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      {/* Public Routes */}
      <Route path="/" element={<PublicRoute />}>
        {publicRoute.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <AppRoute
                routeKey={route.key}
                component={route.component}
              // {...route.meta}
              />
            }
          />
        ))}
      </Route>
    </Routes>
  );
};

export default AppRouter;
