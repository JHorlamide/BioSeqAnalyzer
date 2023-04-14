import http from "http";
import { app, routes } from "./config/app";
import { CommonRoutesConfig } from "./common/CommonRouteConfig";
import { onError } from "./config/requestLogger";
import { PORT, NODE_ENV } from "./config/EnvironmentConfig";
import DBConnectWithRetry from "./config/DBConfig";

async function connectToDatabase(): Promise<void> {
  try {
    await DBConnectWithRetry();
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
}

function createServer(): http.Server {
  app.set("port", PORT);

  const server = http.createServer(app);
  server.listen(PORT);
  server.on("error", onError);
  server.on("listening", () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
    console.log(`Server listening on ${bind}... 🚀`);

    if (NODE_ENV !== "test") {
      routes.forEach((route: CommonRoutesConfig) => {
        console.log(`Routes configured for -> ${route.getName()}`);
      });
    }
  })

  return server;
}

export default async function main(): Promise<http.Server> {
  await connectToDatabase();
  const server = createServer();
  return server;
}

if (NODE_ENV !== "test") {
  main();
}
