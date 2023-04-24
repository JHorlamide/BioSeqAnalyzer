import express from "express";
import cors from "cors";
import helmet from "helmet";
import { useTreblle } from "treblle";

import { requestLogger } from "./requestLogger";
import { CommonRoutesConfig } from "../common/CommonRouteConfig";
import errorMiddleware from "../common/middleware/errorMiddleware";
import { NODE_ENV, TREBLE_API_KEY, TREBLLE_PROJECT_ID } from "./environmentConfig";

// Routes imports
import { AuthRoute } from "../modules/auth/routeConfig";
import { UserRoute } from "../modules/users/routeConfig";
import { ProjectRoute } from "../modules/projects/routeConfig";

const app = express();
const routes: CommonRoutesConfig[] = [];

useTreblle(app, {
  apiKey: TREBLE_API_KEY,
  projectId: TREBLLE_PROJECT_ID
})

// Middleware that enables Cross-Origin Resource Sharing (CORS) for the server.
// This allows the server to handle requests from different domains or origins.
app.use(cors());

// Middleware that sets various HTTP headers for enhanced security.
// This helps protect our application from well-known web vulnerabilities.
app.use(helmet());

// adds middleware to parse incoming JSON data in HTTP requests
// and limits the size of the JSON payload to 5 megabytes to prevent 
// server overload.
app.use(express.json({ limit: "5mb" }));

// Enable parsing of URL-encoded data with extended syntax, 
// allowing rich objects and arrays to be encoded into the URL - encoded format
app.use(express.urlencoded({ extended: false }));

if (NODE_ENV !== "test") {
  app.use(requestLogger);
}

// routes definition
routes.push(new ProjectRoute(app));
routes.push(new AuthRoute(app));
routes.push(new UserRoute(app));

// Error handing middleware
app.use(errorMiddleware);

export { app, routes };
