import { Application } from "express";
import { CommonRoutesConfig } from "../config/routeConfig"
import config from "../config/serverConfig";
import { createProxyMiddleware } from "http-proxy-middleware";
import { validJWTNeeded } from "../middleware/authMiddleware";

const APP_PREFIX_PATH = config.prefix;

export class GatewayRoute extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, "GatewayRoute");
  }

  configureRoutes(): Application {
    this.app.use(`${APP_PREFIX_PATH}/users`, createProxyMiddleware({
      target: 'http://user-service:7070',
      changeOrigin: true,
      pathRewrite: {
        [`^/users`]: "",
      },
      onError: (err, req, res) => {
        res.status(500).send({ status: "Proxy Error", message: err });
      }
    }))

    this.app.use(`${APP_PREFIX_PATH}/protein-projects`, validJWTNeeded, createProxyMiddleware({
      target: 'http://protein-analyzer:8080',
      changeOrigin: true,
      pathRewrite: {
        [`^/projects`]: "",
      },
      onError: (err, req, res) => {
        res.status(500).send({ status: "Proxy Error", message: err });
      }
    }))

    this.app.use(`${APP_PREFIX_PATH}/dna-sequence`, validJWTNeeded, createProxyMiddleware({
      target: 'http://dna-sequence:8000',
      changeOrigin: true,
      pathRewrite: {
        [`^/dna-sequence`]: "",
      },
      onError: (err, req, res) => {
        res.status(500).send({ status: "Proxy Error", message: err });
      }
    }))

    return this.app;
  }
}