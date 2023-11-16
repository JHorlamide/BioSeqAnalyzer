/* Core */
import http from "http";

/* Libraries */
import mongoose from "mongoose";
import supertest, { SuperAgentTest } from "supertest";

/* Application Modules */
import createServer from "../../server";
import DBConnectWithRetry from "../../config/DBConfig";
import {
  projects,
  createWithProjectPDBID,
  createProjectWithUniProtId,
  createProjectWithoutUniProtIDAndPDBID
} from "../fixtures/testData";

describe("Protein project endpoint", () => {
  let server: http.Server;
  let request: SuperAgentTest

  beforeEach(async function () {
    await DBConnectWithRetry();
    server = createServer();
    request = supertest.agent(server);
  })

  afterEach(async function () {
    server.close(() => {
      mongoose.disconnect()
    });
  });

  it("it should create a new project with uniprotId", async () => {
    const response = await request
      .post("/api/protein-projects")
      .send(createProjectWithUniProtId);

    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body.status).toBe("Success");
  })
})