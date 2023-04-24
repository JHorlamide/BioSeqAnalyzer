import Project from "../model/Project";
import { IProject } from "../types/types";

class ProjectRepository {
  public async createProject(projectData: IProject) {
    return await Project.create({ ...projectData });
  }

  public async getAllProjects() {
    return await Project.find({}).exec();
  }

  public async getProjectById(projectId: string) {
    return await Project.findById(projectId).exec();
  }
}

export default new ProjectRepository();
