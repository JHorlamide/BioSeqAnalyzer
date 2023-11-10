import config from "../config/serverConfig";
import { Application } from "express";
import { CommonRoutesConfig } from "../config/routeConfig"
import { createProxyMiddleware } from "http-proxy-middleware";
import { validJWTNeeded } from "../middleware/authMiddleware";

const APP_PREFIX_PATH = config.prefix;
const USER_BASE_URL = "http://user-service:7070";
const PROTEIN_BASE_URL = "http://protein-analyzer:8080";
const DNA_SEQUENCE_BASE_URL = "http://dna-sequence:8000";

export class GatewayRoute extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, "GatewayRoute");
  }

  configureRoutes(): Application {
    /***
    * @route  /api/users
    * @desc   User service route
    * @access Public
    * ***/
    this.app.use(`${APP_PREFIX_PATH}/users`, createProxyMiddleware({
      target: USER_BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        [`^/users`]: "",
      },
      onError: (err, req, res) => {
        res.status(500).send({ status: "Proxy Error", message: err });
      }
    }))

    /***
    * @route  /api/protein-projects
    * @desc   Protein service route
    * @access Private
    * ***/
    this.app.use(`${APP_PREFIX_PATH}/protein-projects`, validJWTNeeded, createProxyMiddleware({
      target: PROTEIN_BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        [`^/projects`]: "",
      },
      onError: (err, req, res) => {
        res.status(500).send({ status: "Proxy Error", message: err });
      }
    }))

    /***
    * @route  /api/protein-user-project-associations
    * @desc   Protein service route
    * @access Public
    * ***/
    this.app.use(`${APP_PREFIX_PATH}/protein-user-project-associations`, createProxyMiddleware({
      target: PROTEIN_BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        [`^/protein-user-project-associations`]: "",
      },
      onError: (err, req, res) => {
        res.status(500).send({ status: "Proxy Error", message: err });
      }
    }))

    /***
    * @route  /api/dna-sequence
    * @desc   DNASequence service route
    * @access Private
    * ***/
    this.app.use(`${APP_PREFIX_PATH}/dna-sequence`, validJWTNeeded, createProxyMiddleware({
      target: DNA_SEQUENCE_BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        [`^/dna-sequence`]: "",
      },
      onError: (err, req, res) => {
        res.status(500).send({ status: "Proxy Error", message: err });
      }
    }))

    /***
    * @route  /api/dna-user-project-associations
    * @desc   DNASequence service route
    * @access Public
    * ***/
    this.app.use(`${APP_PREFIX_PATH}/dna-user-project-associations`, createProxyMiddleware({
      target: DNA_SEQUENCE_BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        [`^/dna-user-project-associations`]: "",
      },
      onError: (err, req, res) => {
        res.status(500).send({ status: "Proxy Error", message: err });
      }
    }))

    return this.app;
  }
}