import express from "express";
import helmet from "helmet";
import cors from "cors";

import { errorHandler } from "../middleware/errorHandler";
import { requestLogger } from "./requestLogging";
import { CommonRoutesConfig } from "./routeConfig";
import { GatewayRoute } from "../routes/gatewayRouteConfig";

const app = express();
const routes: CommonRoutesConfig[] = [];

app.use(cors());

app.use(helmet());

app.use(errorHandler);

app.use(requestLogger);

// routes definition
routes.push(new GatewayRoute(app));

export { app, routes };
