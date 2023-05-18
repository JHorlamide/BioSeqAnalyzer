import mongoose from "mongoose";
import config from "../../../config/appConfig";
import projectRepository from "../repository/repository";
import uniprotService from "./uniprot.service";
import { IUpdateProject, IProject, IGetProjects } from "../types/types";
import { ERR_MSG } from "../types/constants";
import { ClientError } from "../../../common/exceptions/clientError";
import { NotFoundError } from "../../../common/exceptions/notFoundError";
import { ServerError } from "../../../common/exceptions/serverError";

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
      throw new ClientError(ERR_MSG.INVALID_PROJECT_DATA);
    }

    const { uniprotId, proteinPDBID, user } = projectData;

    if (!user) {
      throw new ClientError(ERR_MSG.USER_ID_REQUIRED);
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
      throw new ServerError(error.message);
    }
  }

  // Get a single project by the given projectId
  public async getProjectById(projectId: string) {
    if (!projectId && this.isMongooseObjectId(projectId)) {
      throw new ClientError(ERR_MSG.PROJECT_ID_REQUIRED)
    }

    try {
      const project = await projectRepository.getProjectById(projectId);

      if (!project) {
        throw new NotFoundError(ERR_MSG.PROJECT_NOT_FOUND);
      }

      return project;
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  public async getProjectByUserId(userId: string) {
    try {
      const project = await projectRepository.getProjectByUserId(userId);

      if (!project) {
        throw new NotFoundError(ERR_MSG.PROJECT_NOT_FOUND);
      }

      return project;
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  public async updateProject(projectUpdateData: IUpdateProject) {
    const { projectId, projectData } = projectUpdateData;

    if (!projectId) {
      throw new ClientError(ERR_MSG.PROJECT_ID_REQUIRED)
    }

    // Ensure that the necessary data is provided to create the project
    if (Object.keys(projectData).length === 0) {
      throw new ClientError(ERR_MSG.INVALID_PROJECT_DATA)
    }

    try {
      const updatedProject = await projectRepository.updateProject(projectUpdateData)
      if (!updatedProject) {
        throw new NotFoundError(ERR_MSG.PROJECT_NOT_FOUND);
      }

      return updatedProject;
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  public async deleteProject(projectId: string) {
    if (!projectId || !this.isMongooseObjectId(projectId)) {
      throw new ClientError(ERR_MSG.PROJECT_ID_REQUIRED)
    }

    try {
      const project = await projectRepository.deleteProject(projectId);

      if (!project) {
        throw new NotFoundError(ERR_MSG.PROJECT_NOT_FOUND);
      }
    } catch (error: any) {
      throw new ServerError(error.message);
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
    /*
      If proteinPDBID is provided, add the PDB URL
      to the project data and create the project
    */
    const PDBID = `${config.pdb_base_url}/${projectData.proteinPDBID}`;

    const projectWithPDBID = { ...projectData, proteinPDBID: PDBID };

    return await this.createProteinProject(projectWithPDBID);
  }

  private async createProteinProject(projectData: IProject) {
    try {
      return await projectRepository.createProject(projectData);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  private isMongooseObjectId(id: string): boolean {
    if (id && typeof id === 'string') {
      return mongoose.Types.ObjectId.isValid(id);
    }

    return false;
  }

}

export default new ProjectService();
