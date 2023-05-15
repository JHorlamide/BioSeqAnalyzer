import express from "express";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import { useTreblle } from "treblle";

import { requestLogger } from "./requestLogger";
import { CommonRoutesConfig } from "../common/CommonRouteConfig";
import config from "./appConfig";
import { errorHandler } from "../common/middleware/errorHandler";

// Routes imports
import { AuthRoute } from "../modules/auth/routeConfig";
import { UserRoute } from "../modules/users/routeConfig";
import { ProjectRoute } from "../modules/projects/routeConfig";

const app = express();
const routes: CommonRoutesConfig[] = [];

useTreblle(app, {
  apiKey: config.treble.api_key,
  projectId: config.treble.project_id
})

// Middleware that enables Cross-Origin Resource Sharing (CORS) for the server.
// This allows the server to handle requests from different domains or origins.
const corsOptions: CorsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
}

app.use(cors(corsOptions));

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

if (config.node_env !== "test") {
  app.use(requestLogger);
}

// routes definition
routes.push(new ProjectRoute(app));
routes.push(new AuthRoute(app));
routes.push(new UserRoute(app));

// Error handing middleware
app.use(errorHandler);

export { app, routes };
