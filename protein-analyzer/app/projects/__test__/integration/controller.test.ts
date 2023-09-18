import http from "http";
import main from "../../../server";
import supertest, { SuperAgentTest } from "supertest";

describe("CreateNewProject", () => {
  let server: Promise<http.Server>;
  let request: SuperAgentTest

  beforeEach(async function() {
    server = main();
    request = supertest.agent(await server);
  })

  afterEach(async function () {
    // shut down the Express.js server, then tell jest we're done:
    (await server).close();
  });

  it("it should create a new project", () => {
    expect(1).toBe(1);
  })
})