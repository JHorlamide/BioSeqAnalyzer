/* Core */
import http from "http";

/* Application Modules */
import config from "./config/appConfig";
import { logger } from "./config/logger";
import { app, routes } from "./config/app";
import { onError } from "./config/requestLogger";
import { CommonRoutesConfig } from "./common/CommonRouteConfig";

function createServer(): http.Server {
  app.set("port", config.port);

  const server = http.createServer(app);
  server.listen(config.port);
  server.on("error", onError);
  server.on("listening", () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
    logger.info(`Server listening on ${bind}... 🚀`);

    if (config.node_env !== "test") {
      routes.forEach((route: CommonRoutesConfig) => {
        logger.info(`Routes configured for -> ${route.getName()}`);
      });
    }
  })

  return server;
}

export default async function main(): Promise<http.Server> {
  const server = createServer();
  return server;
}

if (config.node_env !== "test") {
  main();
}
