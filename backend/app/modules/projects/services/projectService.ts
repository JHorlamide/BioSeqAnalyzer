import mongoose from "mongoose";
import internal, { Readable } from "stream";
import csvParser from "csv-parser";
import config from "../../../config/appConfig";
import projectRepository from "../repository/repository";
import uniprotService from "./uniprot.service";
import { IUpdateProject, IProject, IGetProjects, CSVColumnDataType } from "../types/types";
import { ERR_MSG } from "../types/constants";
import { ClientError } from "../../../common/exceptions/clientError";
import { NotFoundError } from "../../../common/exceptions/notFoundError";
import { ServerError } from "../../../common/exceptions/serverError";
import s3Service from "../s3Service/s3Service";

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

  public getProjectFileKey = async (projectId: string) => {
    try {
      const project = await this.getProjectById(projectId);
      const { Key } = project.projectFile;

      if (!Key) {
        throw new ClientError(ERR_MSG.NO_FILE_UPLOAD);
      }

      return project.projectFile.Key;
    } catch (error: any) {
      throw new ClientError(error.message);
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

  public async parseCSVFile(fileBuffer: Buffer): Promise<any[]> {
    try {
      const csvData: CSVColumnDataType[] = await new Promise((resolve, reject) => {
        const readableStream = Readable.from(fileBuffer.toString());
        const results: any[] = [];
        readableStream
          .pipe(csvParser())
          .on("data", (data: any) => {
            results.push(data);
          })
          .on("end", () => {
            resolve(results);
          })
          .on("error", (error: Error) => {
            reject(error);
          });
      });

      return csvData;
    } catch (error: any) {
      throw new ServerError(`${ERR_MSG.PARSE_CSV_FAILED}: ${error.message}`);
    }
  }

  public async parseS3ReadStream(s3ReadStream: internal.Readable) {
    try {
      const csvData: CSVColumnDataType[] = await new Promise((resolve, reject) => {
        const results: CSVColumnDataType[] = [];
        s3ReadStream
          .pipe(csvParser())
          .on("data", (data: any) => {
            results.push(data);
          })
          .on("end", () => {
            resolve(results);
          })
          .on("error", (error: Error) => {
            reject(error);
          });
      });

      return csvData;
    } catch (error: any) {
      throw new ServerError(`${ERR_MSG.PARSE_CSV_FAILED}: ${error.message}`);
    }
  }

  public validateCSVStructure(csvData: CSVColumnDataType[]): boolean {
    const expectedColumns = ['sequence', 'fitness', 'muts'];
    const hasExpectedColumns = csvData.length > 0 && expectedColumns.every((column) => csvData[0].hasOwnProperty(column));
    const hasExpectedWildTypeSequence = csvData.some((row) => row.muts === 'WT');

    return hasExpectedColumns && hasExpectedWildTypeSequence;
  }

  public async uploadProjectFile(projectId: string, file: Express.Multer.File) {
    try {
      const project = await projectRepository.getProjectById(projectId);
      if (!project) {
        throw new ClientError(ERR_MSG.PROJECT_NOT_FOUND);
      }

      const response = await s3Service.uploadFile(file);

      // Update the project with the new projectFile data
      project.projectFile = {
        fileName: file.originalname,
        Bucket: response.Bucket,
        Key: response.Key
      };

      return await project.save();
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  // Get Histogram Data
  public async getHistogramData(projectId: string) {
    const csvData: CSVColumnDataType[] = await this.getFile(projectId);

    // Calculate the histogram data
    const histogramData: { label: string, count: number }[] = [];
    const countByLabel: { [key: string]: number } = {};

    csvData.forEach((row) => {
      const label = row.muts;
      countByLabel[label] = (countByLabel[label] || 0) + 1;
    });

    for (const label in countByLabel) {
      histogramData.push({ label, count: countByLabel[label] });
    }

    // 1. Distribution of fitness scores as a histogram
    // The reference sequence should be highlighted in the histogram
    const fitnessScores: number[] = csvData.map((row) => row.fitness);
    const referenceSequence = 'WT'; // Assuming the reference sequence is denoted as 'WT'
    const histogramWithReference = histogramData.map((item) => ({
      label: item.label,
      count: item.label === referenceSequence ? item.count : item.count, // Highlight the reference sequence in the histogram
    }));

    return histogramWithReference;
  }

  // Get top 10 mutation
  public async getTopMutants(projectId: string) {
    const csvData: CSVColumnDataType[] = await this.getFile(projectId);

    const topMutants = csvData
      .sort((a, b) => b.fitness - a.fitness)
      .slice(0, 10);

    return topMutants;
  }

  // Get mutation distribution
  public getMutationDistribution = async (projectId: string) => {
    // First implementation -> Count the number of mutations per sequence and create a distribution object
    // const mutationDistribution: { [numMutations: number]: number } = {};
    // for (const entry of csvData) {
    //   const numMutations = entry.muts.split(',').length;
    //   if (mutationDistribution[numMutations]) {
    //     mutationDistribution[numMutations]++;
    //   } else {
    //     mutationDistribution[numMutations] = 1;
    //   }
    // }
    const csvData: CSVColumnDataType[] = await this.getFile(projectId);
    const mutationCounts: number[] = csvData.map((row) => row.muts.split(',').length);
    const mutationDistribution: { mutationCount: number; count: number }[] = [];
    const countByMutationCount: { [key: number]: number } = {};

    mutationCounts.forEach((count) => {
      countByMutationCount[count] = (countByMutationCount[count] || 0) + 1;
    });

    for (const count in countByMutationCount) {
      mutationDistribution.push({ mutationCount: parseInt(count), count: countByMutationCount[count] });
    }

    return mutationDistribution;
  }

  // Get mutation range
  public async getMutationRange(projectId: string) {
    const csvData: CSVColumnDataType[] = await this.getFile(projectId);

    const mutations = csvData.flatMap((row) => row.muts.split(','));
    const mutationRanges: { mutation: string; scoreRange: { min: number; max: number } }[] = [];
    const scoresByMutation: { [key: string]: number[] } = {};

    mutations.forEach((mutation, index) => {
      const fitnessScore = csvData[index].fitness;

      if (!scoresByMutation[mutation]) {
        scoresByMutation[mutation] = [];
      }
      scoresByMutation[mutation].push(fitnessScore);
    });

    for (const mutation in scoresByMutation) {
      const scores = scoresByMutation[mutation];

      mutationRanges.push({
        mutation,
        scoreRange: {
          min: Math.min(...scores),
          max: Math.max(...scores),
        },
      });
    }

    return mutationRanges;
  }

  // Get highest fitness
  public async getHighestFitness(projectId: string) {
    const csvData: CSVColumnDataType[] = await this.getFile(projectId);

    // Find the sequence with the highest fitness value
    const highestFitnessEntry = csvData.reduce((prev, curr) => {
      return curr.fitness > prev.fitness ? curr : prev;
    });

    const highestFitnessSequence = highestFitnessEntry.sequence;
    const highestFitnessValue = highestFitnessEntry.fitness;

    const result = {
      sequence: highestFitnessSequence,
      fitness: highestFitnessValue,
    };

    return result
  }

  // Get fold improvement
  public getFoldImprovement = async (projectId: string) => {
    const csvData: CSVColumnDataType[] = await this.getFile(projectId);

    const wildTypeFitness = this.getWildTypeFitness(csvData);
    const bestFitnessEntry = this.getBestFitnessEntry(csvData);

    const bestFitness = bestFitnessEntry.fitness;
    const foldImprovement = bestFitness / wildTypeFitness;
    return foldImprovement;
  }

  // Get sequence above reference
  public getSequencesAboveReference = async (projectId: string) => {
    const csvData: CSVColumnDataType[] = await this.getFile(projectId);

    // Filter the csvData to get sequences with mutations
    // and scores above the reference sequence (wild type)
    const sequencesAboveReference = csvData.filter((entry) => {
      return entry.muts.includes("WT") && entry.fitness > this.getReferenceFitness(csvData);
    });

    const totalSequences = csvData.length;
    const sequencesAboveReferenceCount = sequencesAboveReference.length;
    const hitRate = (sequencesAboveReferenceCount / totalSequences) * 100;

    const result = {
      hitRate,
      totalSequences,
      sequencesAboveReferenceCount,
    };

    return result;
  }

  // Helper function to get the fitness score of the reference sequence (wild type)
  private getReferenceFitness(csvData: CSVColumnDataType[]) {
    for (const entry of csvData) {
      if (entry.muts.includes("WT")) {
        return entry.fitness;
      }
    }

    return 0; // Default value if reference sequence is not found
  }

  // Helper function to get the fitness score of the wild type sequence
  private getWildTypeFitness(csvData: CSVColumnDataType[]) {
    const wildTypeEntry = csvData.find((entry) => entry.muts.includes('WT'));
    return wildTypeEntry ? wildTypeEntry.fitness : 0;
  }

  // Helper function to get the entry with the best fitness score
  public getBestFitnessEntry(csvData: CSVColumnDataType[]) {
    return csvData.reduce((prev, curr) => (curr.fitness > prev.fitness ? curr : prev));
  }

  // Get file from aws
  private getFile = async (projectId: string) => {
    const projectFileKey = await this.getProjectFileKey(projectId);
    const s3ReadStream = s3Service.getFile(projectFileKey);
    const csvData = await this.parseS3ReadStream(s3ReadStream);
    return csvData;
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
    const { proteinPDBID } = projectData;
    const pdbFileUrl = `${config.pdbBaseUrl}/${proteinPDBID}`;

    const projectWithPDBID = { ...projectData, proteinPDBID, pdbFileUrl };
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

// public hasWildTypeSequence(csvData: any[]): boolean {
//   return csvData.some((row) => row.muts === 'WT');
// }