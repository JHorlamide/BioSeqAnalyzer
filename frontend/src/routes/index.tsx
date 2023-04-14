import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoute, protectedRoute } from "../config/RouteConfig";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import AppRoute from "./AppRoute";
import { AUTHENTICATED_ENTRY } from "../config/AppConfig";

const AppRouter = () => {
  return (
    <Routes>
      {/* Protected Routes */}
      <Route path="/" element={<ProtectedRoute />}>
        <Route
          path="/"
          element={<Navigate replace to={AUTHENTICATED_ENTRY} />}
        />

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
