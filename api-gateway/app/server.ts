import http from "http";
import {app, routes} from "./config/app";
import {onError} from "./config/requestLogging";
import config from "./config/serverConfig";
import {CommonRoutesConfig} from "./config/routeConfig";

function createServer(): http.Server {
  app.set("port", config.port);

  const server = http.createServer(app);
  server.listen(config.port);
  server.on("error", onError);
  server.on("listening", () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
    console.log(`API gateway server is running on port ${config.port} 🚀`);

    if (config.node_env !== "test") {
      routes.forEach((route: CommonRoutesConfig) => {
        console.log(`Routes configured for -> ${route.getName()}`);
      });
    }
  })

  return server;
}

export default async function main(): Promise<http.Server> {
  return createServer();
}

main();