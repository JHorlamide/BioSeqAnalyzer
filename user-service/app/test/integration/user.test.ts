/* Core */
import http from "http";

/* Libraries */
import supertest, { SuperAgentTest } from "supertest";

/* Application Modules */
import createServer from "../../server";

describe("user and authentication endpoint", function () {
  let server: http.Server;
  let request: SuperAgentTest

  beforeAll(async function () {
    server = createServer();
    request = supertest.agent(server);
  })

  afterAll(() => {
    server.close();
  })

  it("", async function () {

  })
});
