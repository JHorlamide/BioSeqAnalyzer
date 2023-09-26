/* Libraries */
import http from "http";

/* Application Modules */
import config from "./config/serverConfig";
import { app, routes } from "./config/app";
import { onError } from "./config/requestLogging";
import { CommonRoutesConfig } from "./config/routeConfig";
import { logger } from "./config/logger";

function createServer(): http.Server {
  app.set("port", config.port);

  const server = http.createServer(app);
  server.listen(config.port);
  server.on("error", onError);
  server.on("listening", () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
    logger.info(`API gateway server is running on port ${config.port} 🚀`);

    if (config.node_env !== "test") {
      routes.forEach((route: CommonRoutesConfig) => {
        logger.info(`Routes configured for -> ${route.getName()}`);
      });
    }
  })

  return server;
}

export default async function main(): Promise<http.Server> {
  return createServer();
}

main();