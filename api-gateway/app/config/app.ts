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

const allowedOrigins = [config.USER_BASE_URL, config.PROTEIN_BASE_URL, config.DNA_SEQUENCE_BASE_URL];

const corsOption: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Not allowed by CORS'));
  },
}

app.use(cors(corsOption));

app.use(helmet());

app.use(errorHandler);

app.use(requestLogger);

// routes definition
routes.push(new GatewayRoute(app));

export { app, routes };
