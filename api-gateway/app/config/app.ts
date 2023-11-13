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

const allowedOrigins = ["http://localhost:5173"]

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
    if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.use(helmet());

app.use(errorHandler);

app.use(requestLogger);

// routes definition
routes.push(new GatewayRoute(app));

export { app, routes };
