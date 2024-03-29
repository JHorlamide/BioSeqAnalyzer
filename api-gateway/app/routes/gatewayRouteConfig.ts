/* Libraries */
import { Application } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

/* Application Modules */
import config from "../config/serverConfig";
import { CommonRoutesConfig } from "../config/routeConfig";
import { validJWTNeeded } from "../middleware/authMiddleware";

const APP_PREFIX_PATH = config.prefix;

export class GatewayRoute extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, "GatewayRoute");
  }

  configureRoutes(): Application {
    /*** Private Route ***/

    /***
    * @route  /api/protein-projects
    * @desc   Protein service route
    * @access Private
    * ***/
    this.app.use(`${APP_PREFIX_PATH}/protein-projects`, validJWTNeeded, createProxyMiddleware({
      target: config.PROTEIN_BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        [`^/projects`]: "",
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
      target: config.DNA_SEQUENCE_BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        [`^/dna-sequence`]: "",
      },

      onError: (err, req, res) => {
        res.status(500).send({ status: "Proxy Error", message: err });
      }
    }))

    /***
    * @route  /api/dna-sequence/delete-projects
    * @desc   Delete all user projects
    * @access Private
    * ***/
    this.app.use(`${APP_PREFIX_PATH}/delete-projects`, validJWTNeeded, createProxyMiddleware({
      target: config.DNA_SEQUENCE_BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        [`^/delete-projects`]: "",
      },

      onError: (err, req, res) => {
        res.status(500).send({ status: "Proxy Error", message: err });
      }
    }))

    /*** Public Route ***/

    /***
    * @route  /api/users
    * @desc   User service route
    * @access Public
    * ***/
    this.app.use(`${APP_PREFIX_PATH}/users`, createProxyMiddleware({
      target: config.USER_BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        [`^/users`]: "",
      },

      onError: (err, req, res) => {
        res.status(500).send({ status: "Proxy Error", message: err });
      }
    }))

    /***
    * @route  /api/add-user-to-project
    * @desc   DNASequence service route to associate invited-user to project
    * @access Public
    * ***/
    this.app.use(`${APP_PREFIX_PATH}/add-user-to-project`, createProxyMiddleware({
      target: config.DNA_SEQUENCE_BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        [`^/add-user-to-project`]: "",
      },

      onError: (err, req, res) => {
        res.status(500).send({ status: "Proxy Error", message: err });
      }
    }))

    /***
    * @route  /api/project/share/:projectId
    * @desc   DNASequence service route to get project details
    * @access Public
    * ***/
    this.app.use(`${APP_PREFIX_PATH}/project/share/:projectId`, createProxyMiddleware({
      target: config.DNA_SEQUENCE_BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        [`^/project/share/:projectId`]: "",
      },

      onError: (err, req, res) => {
        res.status(500).send({ status: "Proxy Error", message: err });
      }
    }))

    return this.app;
  }
}