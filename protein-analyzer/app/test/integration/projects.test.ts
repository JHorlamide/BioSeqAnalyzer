/* Core */
import http from "http";

/* Libraries */
import mongoose from "mongoose";
import supertest, { SuperAgentTest } from "supertest";

/* Application Modules */
import createServer from "../../server";
import {
  accessToken,
  createWithProjectPDBID,
  createProjectWithUniProtId,
  createProjectWithoutUniProtIDAndPDBID,
  userId,
  updateProjectText,
} from "../fixtures/testData";

const BASE_URL = "/api/protein-projects";

let firstProjectIdTest = "";

describe("protein project endpoint", function () {
  let server: Promise<http.Server>;
  let request: SuperAgentTest

  beforeAll(async function () {
    server = createServer();
    request = supertest.agent(await server);
  })

  afterAll(async function () {
    (await server).close(async function () {
      await mongoose.connection.db.collection("projects").drop();
      await mongoose.disconnect();
    });
  });

  it("it should create a new project with uniprotId", async function () {
    const response = await request
      .post(BASE_URL)
      .set({ "X-Decoded-User": accessToken })
      .send(createProjectWithUniProtId);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe("Success");
    expect(response.body.data).toHaveProperty("proteinAminoAcidSequence");
    expect(response.body.data).toHaveProperty("uniprotId");
    firstProjectIdTest = response.body.data._id;
  });

  it("it should create a new project with PDB ID", async function () {
    const response = await request
      .post(BASE_URL)
      .set({ "X-Decoded-User": accessToken })
      .send(createWithProjectPDBID);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe("Success");
    expect(response.body.data).toHaveProperty("proteinPDBID");
  });

  it("it should create a new project without uniprot or PDB ID", async function () {
    const response = await request
      .post(BASE_URL)
      .set({ "X-Decoded-User": accessToken })
      .send(createProjectWithoutUniProtIDAndPDBID)


    expect(response.status).toBe(201);
    expect(response.body.status).toBe("Success");
    expect(response.body.data).toHaveProperty("projectTitle")
    expect(response.body.data).toHaveProperty("measuredProperty")
    expect(response.body.data).toHaveProperty("_id");
  });

  it("it should disallow POST to create project without an accessToken", async function () {
    const response = await request
      .post(BASE_URL)
      .send(createProjectWithoutUniProtIDAndPDBID)

    expect(response.body.status).toBe(500);
  });

  describe("with a valid accessToken", function () {
    it("it should allow GET to fetch all projects", async function () {
      const response = await request
        .get(BASE_URL)
        .set({ "X-Decoded-User": accessToken });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("Success");
      expect(response.body.data).toHaveProperty("totalPages");
      expect(response.body.data).toHaveProperty("totalCount");
      expect(response.body.data.projects.length).toBeGreaterThanOrEqual(0);
    });

    it("it should allow GET to fetch a single project", async function () {
      const response = await request
        .get(`${BASE_URL}/${firstProjectIdTest}`)
        .set({ "X-Decoded-User": accessToken });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("Success");
      expect(response.body.data.authorId).toBe(userId);
    });

    it("it should allow PUT to update a single project", async function () {
      const response = await request
        .put(`${BASE_URL}/${firstProjectIdTest}`)
        .set({ "X-Decoded-User": accessToken })
        .send(updateProjectText);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("Success");
      expect(response.body.data.authorId).toBe(userId);
      expect(response.body.data._id).toBe(firstProjectIdTest);
    });

    it("it should allow DELETE to delete a single project", async function () {
      const response = await request
        .delete(`${BASE_URL}/${firstProjectIdTest}`)
        .set({ "X-Decoded-User": accessToken })

      expect(response.status).toBe(204);
    });
  })
})