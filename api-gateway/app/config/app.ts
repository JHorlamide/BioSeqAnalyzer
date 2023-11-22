import express from "express";
import helmet from "helmet";
import cors, { CorsOptions } from "cors";

import config from "./serverConfig";
import { errorHandler } from "../middleware/errorHandler";
import { requestLogger } from "./requestLogging";
import { CommonRoutesConfig } from "./routeConfig";
import { GatewayRoute } from "../routes/gatewayRouteConfig";

const app = express();
const routes: CommonRoutesConfig[] = [];

const corsOptions: CorsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(helmet());

app.use(errorHandler);

app.use(requestLogger);

// routes definition
routes.push(new GatewayRoute(app));

export { app, routes };
