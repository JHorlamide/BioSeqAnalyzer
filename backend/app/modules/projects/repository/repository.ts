import Project from "../model/Project";
import { IProject } from "../types/types";

class ProjectRepository {
  public async createProject(projectData: IProject) {
    return await Project.create({ ...projectData });
  }

  public async getAllProjects(query: any, page: number, limit: number) {
    const skip = (page - 1) * limit;
    return await Project.find(query).skip(skip).limit(limit).exec();
  }

  public async getProjectById(projectId: string) {
    return await Project.findById(projectId).exec();
  }

  public async countProjects(query: any) {
    return await Project.countDocuments(query).exec();
  }
}

export default new ProjectRepository();
