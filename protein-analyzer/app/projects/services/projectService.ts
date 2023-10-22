/* Application Modules */
import config from "../../config/appConfig";
import projectRepository from "../repository/repository";
import uniprotService from "./uniprot.service";
import fileService from "../fileService/fileService";
import { ERR_MSG } from "../types/constants";
import { ClientError, NotFoundError, ServerError } from "../../common/exceptions/ApiError";
import {
  IUpdateProject,
  IProject,
  CSVColumnDataType,
  IMutationRange,
  PaginationParams,
  SearchParams,
  QueryType
} from "../types/types";

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

    if (!projectData.user) {
      throw new ClientError(ERR_MSG.USER_ID_REQUIRED);
    }

    return await this.createProteinProject(projectData);
  }

  // Fetch all the create project by a given user from the DB
  public async getAllProjects(
    paginationParams: PaginationParams,
    searchParams: SearchParams
  ) {
    const { page, limit } = paginationParams;
    const { userId, ...filteredSearchParams } = searchParams;
    const searchFilters = Object.entries(filteredSearchParams)
      .filter(([key, value]) => value !== "")
      .reduce((acc, [key, value]) => ({ ...acc, [key]: { $regex: value, $options: "i" } }), {});

    try {
      const query: QueryType = { user: userId };

      if (Object.keys(searchFilters).length > 0) {
        query.$or = [searchFilters];
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

  public getProjectFileName = async (projectId: string): Promise<string> => {
    try {
      const project = await this.getProjectById(projectId);

      if (!project) throw new NotFoundError(ERR_MSG.PROJECT_NOT_FOUND);

      const { projectFileName } = project;

      if (!projectFileName) throw new ClientError(ERR_MSG.NO_FILE_UPLOAD);

      return projectFileName;
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  public async updateProject(projectUpdateData: IUpdateProject) {
    const { projectId, projectData } = projectUpdateData;
    let pdbFileUrl;
    let proteinPDBID;
    let proteinAminoAcidSequence;

    if (!projectId) {
      throw new ClientError(ERR_MSG.PROJECT_ID_REQUIRED)
    }

    /** Ensure that the necessary data is provided to update the project **/
    if (Object.keys(projectData).length === 0) {
      throw new ClientError(ERR_MSG.INVALID_PROJECT_DATA)
    }

    try {
      /** If uniprotId is provided, retrieve the protein sequence **/
      if (projectData.uniprotId) {
        proteinAminoAcidSequence = await this.getProteinSequenceFromUniProt(projectData.uniprotId!!);
      }

      /** If proteinPDBID is provided, add the PDB URL to the project data **/
      if (projectData.proteinPDBID) {
        proteinPDBID = projectData.proteinPDBID
        pdbFileUrl = `${config.pdbBaseUrl}/${projectData.proteinPDBID}`;
      }


      const updatedProject = await projectRepository.updateProject({
        projectId,
        projectData: { ...projectData, proteinAminoAcidSequence, pdbFileUrl }
      })

      if (!updatedProject) {
        throw new NotFoundError(ERR_MSG.PROJECT_NOT_FOUND);
      }

      return updatedProject;
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  public async deleteProject(projectId: string) {
    try {
      const project = await projectRepository.deleteProject(projectId);

      if (!project) throw new NotFoundError(ERR_MSG.PROJECT_NOT_FOUND);

      await fileService.deleteFile(project.projectFileName);
      return project;
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  public async uploadProjectFile(projectId: string, file: Express.Multer.File) {
    try {
      const project = await projectRepository.getProjectById(projectId);
      if (!project) {
        throw new NotFoundError(ERR_MSG.PROJECT_NOT_FOUND);
      }

      const { response, bucketKey } = await fileService.uploadFileToBucket(file);
      if (!response || response.$metadata.httpStatusCode !== 200) {
        throw new ServerError(ERR_MSG.FILE_UPLOAD_ERROR);
      }

      project.projectFileName = bucketKey;
      return await project.save();
    } catch (error: any) {
      throw new ServerError(ERR_MSG.FILE_UPLOAD_ERROR);
    }
  }

  /** Get Histogram Data **/
  public async getHistogramData(projectId: string) {
    const csvData: CSVColumnDataType[] = await this.getFileCSVData(projectId);

    /** Calculate the histogram data **/
    const histogramData: { label: string, count: number }[] = [];
    const countByLabel: { [key: string]: number } = {};

    csvData.forEach((row) => {
      const label = row.muts;
      countByLabel[label] = (countByLabel[label] || 0) + 1;
    });

    for (const label in countByLabel) {
      histogramData.push({ label, count: countByLabel[label] });
    }

    /**
     * 1. Distribution of fitness scores as a histogram
     * The reference sequence should be highlighted in the histogram
     * **/
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
    try {
      const csvData: CSVColumnDataType[] = await this.getFileCSVData(projectId);

      const topMutants = csvData
        .sort((a, b) => b.fitness - a.fitness)
        .slice(0, 10);

      return topMutants;
    } catch (error: any) {
      throw new ServerError(error.message)
    }
  }

  // Get mutation distribution
  public getMutationDistribution = async (projectId: string) => {
    const csvData: CSVColumnDataType[] = await this.getFileCSVData(projectId);
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

  /**
   * Get mutation range
   * For each individual mutation, the range of scores for
   * sequences that include this mutation
   * */
  public async getMutationRange(projectId: string, limitNumber: number) {
    const csvData: CSVColumnDataType[] = await this.getFileCSVData(projectId);
    const mutations = csvData.flatMap((row) => row.muts.split(','));
    const mutationRanges: IMutationRange[] = [];
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

    // I would refactor this later.
    // there is genu reason why am slicing the data
    // I don't just want to send the entire data to client
    // since am not rendering all the data
    return mutationRanges.slice(0, limitNumber);
  }

  // Get highest fitness
  public async getHighestFitness(projectId: string) {
    try {
      const csvData: CSVColumnDataType[] = await this.getFileCSVData(projectId);

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
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  // Get fold improvement
  public getFoldImprovement = async (projectId: string) => {
    try {
      const csvData: CSVColumnDataType[] = await this.getFileCSVData(projectId);

      const wildTypeFitness = this.getWildTypeFitness(csvData);
      const bestFitnessEntry = this.getBestFitnessEntry(csvData);

      const bestFitness = bestFitnessEntry.fitness;
      const foldImprovement = bestFitness / wildTypeFitness;
      return foldImprovement;
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  // Get sequence above reference
  public getSequencesAboveReference = async (projectId: string) => {
    try {
      const csvData: CSVColumnDataType[] = await this.getFileCSVData(projectId);

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
    } catch (error: any) {
      throw new ServerError(error.message);
    }
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

  // Helper function to get the entry with the best fitness score
  private getBestFitnessEntry(csvData: CSVColumnDataType[]) {
    return csvData.reduce((prev, curr) => (curr.fitness > prev.fitness ? curr : prev));
  }

  // Helper function to get the fitness score of the wild type sequence
  private getWildTypeFitness(csvData: CSVColumnDataType[]) {
    const wildTypeEntry = csvData.find((entry) => entry.muts.includes('WT'));
    return wildTypeEntry ? wildTypeEntry.fitness : 0;
  }

  // Get file from aws
  private getFileCSVData = async (projectId: string) => {
    try {
      const projectFileName = await this.getProjectFileName(projectId);
      return await fileService.downloadAndParseFileFromBucket(projectFileName);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  private async createProteinProject(projectData: IProject) {
    const { proteinPDBID, uniprotId } = projectData;
    let proteinAminoAcidSequence: string | undefined;
    let pdbFileUrl: string | undefined;

    try {
      // If uniprotId is provided, retrieve the protein sequence
      if (uniprotId) {
        proteinAminoAcidSequence = await this.getProteinSequenceFromUniProt(uniprotId);
      }

      // If proteinPDBID is provided, add the PDB URL to the project data
      if (proteinPDBID) {
        pdbFileUrl = `${config.pdbBaseUrl}/${proteinPDBID}`;
      }

      const project: IProject = { ...projectData, proteinAminoAcidSequence, pdbFileUrl };
      return await projectRepository.createProject(project);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  private async getProteinSequenceFromUniProt(uniprotId: string) {
    try {
      const proteinSequence = await uniprotService.getProteinSequence(uniprotId);

      if (!proteinSequence) {
        throw new ServerError("Server error. Please try again later")
      }

      return proteinSequence;
    } catch (error: any) {
      if (error instanceof ClientError) {
        throw new ClientError(error.message);
      }

      throw new ServerError(error.message);
    }
  }
}

export default new ProjectService();
