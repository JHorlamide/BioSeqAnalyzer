import { PDB_BASE_URL } from "../../../config/environmentConfig";
import projectRepository from "../repository/repository";
import uniprotService from "./uniprot.service";
import { IUpdateProject, IProject, IGetProjects } from "../types/types";
import { ERROR_MESSAGES } from "../types/constants";
import { AppError } from "../../../common/middleware/appError";
import { GENERAL_ERROR } from "../../../config/appConstants";

const { name, statusCode } = GENERAL_ERROR.ERROR_MSG;

class ProjectService {
  /**
  * Creates a project using the given project data. If uniprotId is provided, retrieves the protein sequence
  * and adds it to the project data. If proteinPDBID is provided, adds the PDB URL to the project data.
  * @param projectData The data for the project to be created.
  * @returns The created project.
  */
  public async createProject(projectData: IProject) {
    // Ensure that the necessary data is provided to create the project
    if (Object.keys(projectData).length === 0) {
      const { REQUIRED_PROJECT_DATA } = ERROR_MESSAGES;

      throw new AppError(
        REQUIRED_PROJECT_DATA.name,
        REQUIRED_PROJECT_DATA.statusCode,
        REQUIRED_PROJECT_DATA.message, true);
    }

    const { uniprotId, proteinPDBID, user } = projectData;

    if (!user) {
      const { REQUIRED_USER_ID } = ERROR_MESSAGES;

      throw new AppError(
        REQUIRED_USER_ID.name,
        REQUIRED_USER_ID.statusCode,
        REQUIRED_USER_ID.message, true);
    }

    if (uniprotId) return this.createProjectIfUniprotIdExist(projectData);

    if (proteinPDBID) return this.createProjectIfPDBIDExist(projectData);

    // If neither uniprotId nor proteinPDBID is provided, create the project as-is
    return projectRepository.createProject(projectData);
  }

  // Fetch all the create project by a given user from the DB
  public async getAllProjects(params: IGetProjects) {
    const { page, limit, search, userId } = params;

    try {
      const query: any = { user: userId };

      // Apply search filter if provided
      if (search) {
        query.$or = [
          { projectTitle: { $regex: search, $options: "i" } },
          { measuredProperty: { $regex: search, $options: "i" } },
          { projectGoal: { $regex: search, $options: "i" } },
        ];
      }

      const totalCount = await projectRepository.countProjects(query);
      const totalPages = Math.ceil(totalCount / limit);
      const projects = await projectRepository.getAllProjects(query, page, limit);

      return {
        projects,
        totalPages,
        totalCount,
      };
    } catch (error: any) {
      throw new AppError(name, statusCode, error.message, true);
    }
  }

  // Get a single project by the given projectId
  public async getProjectById(projectId: string) {
    if (!projectId) {
      const { REQUIRED_PROJECT_ID } = ERROR_MESSAGES;

      throw new AppError(
        REQUIRED_PROJECT_ID.name,
        REQUIRED_PROJECT_ID.statusCode,
        REQUIRED_PROJECT_ID.message, true);
    }

    try {
      const project = await projectRepository.getProjectById(projectId);

      if (!project) {
        const { PROJECT_NOT_FOUND } = ERROR_MESSAGES;

        throw new AppError(
          PROJECT_NOT_FOUND.name,
          PROJECT_NOT_FOUND.statusCode,
          PROJECT_NOT_FOUND.message, true);
      }

      return project;
    } catch (error: any) {
      throw new AppError(name, statusCode, error.message, true);
    }
  }

  public async getProjectByUserId(userId: string) {
    try {
      const project = await projectRepository.getProjectByUserId(userId);

      if (!project) {
        const { PROJECT_NOT_FOUND } = ERROR_MESSAGES;

        throw new AppError(
          PROJECT_NOT_FOUND.name,
          PROJECT_NOT_FOUND.statusCode,
          PROJECT_NOT_FOUND.message, true);
      }

      return project;
    } catch (error: any) {
      throw new AppError(name, statusCode, error.message, true);
    }
  }

  public async updateProject(projectUpdateData: IUpdateProject) {
    const { projectId, projectData } = projectUpdateData;

    console.log({ serviceLevel: projectId })

    if (!projectId) {
      const { REQUIRED_PROJECT_ID } = ERROR_MESSAGES;

      throw new AppError(
        REQUIRED_PROJECT_ID.name,
        REQUIRED_PROJECT_ID.statusCode,
        REQUIRED_PROJECT_ID.message, true);
    }

    // Ensure that the necessary data is provided to create the project
    if (Object.keys(projectData).length === 0) {
      const { REQUIRED_PROJECT_DATA } = ERROR_MESSAGES;

      throw new AppError(
        REQUIRED_PROJECT_DATA.name,
        REQUIRED_PROJECT_DATA.statusCode,
        REQUIRED_PROJECT_DATA.message, true);
    }

    try {
      const updatedProject = await projectRepository.updateProject(projectUpdateData)
      if (!updatedProject) {
        const { PROJECT_NOT_FOUND } = ERROR_MESSAGES;

        throw new AppError(
          PROJECT_NOT_FOUND.name,
          PROJECT_NOT_FOUND.statusCode,
          PROJECT_NOT_FOUND.message, true);
      }

      return updatedProject;
    } catch (error: any) {
      throw new AppError(name, statusCode, error.message, true);
    }
  }

  private async createProjectIfUniprotIdExist(projectData: IProject) {
    // If uniprotId is provided, retrieve the protein sequence
    const proteinSequence = await uniprotService.getProteinSequence(projectData.uniprotId!!);

    // Add the protein sequence to the project data and create the project
    const projectWithSequence = {
      ...projectData,
      proteinAminoAcidSequence: proteinSequence
    };

    return await this.createProteinProject(projectWithSequence);
  }

  private async createProjectIfPDBIDExist(projectData: IProject) {
    // If proteinPDBID is provided, add the PDB URL to the project data and create the project
    const PDBID = `${PDB_BASE_URL}/${projectData.proteinPDBID}`;

    const projectWithPDBID = {
      ...projectData,
      proteinPDBID: PDBID
    };

    return await this.createProteinProject(projectWithPDBID);
  }

  private async createProteinProject(projectData: IProject) {
    try {
      return await projectRepository.createProject(projectData);
    } catch (error: any) {
      throw new AppError(name, statusCode, error.message, true);
    }
  }
}

export default new ProjectService();
