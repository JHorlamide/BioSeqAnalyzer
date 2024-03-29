import Project from "../model/Project";
import { IUpdateProject, IProject } from "../types/types";

class ProjectRepository {
  public async createProject(projectData: IProject) {
    return await Project.create({ ...projectData });
  }

  public async getProjects(authorId: string) {
    return await Project.find({ authorId }).exec();
  }

  public async getAllProjects(query: any, page: number, limit: number) {
    const skip = (page - 1) * limit;
    return await Project.find(query).skip(skip).limit(limit).lean().exec();
  }

  public async getProjectById(projectId: string) {
    return await Project.findById(projectId).exec();
  }

  public async getProjectByAuthorId(authorId: string) {
    return await Project.findOne({ authorId }).exec();
  }

  public async countProjects(query: any) {
    return await Project.countDocuments(query).exec();
  }

  public async updateProject(updateBodyField: IUpdateProject) {
    const { projectId, projectData } = updateBodyField;

    return await Project.findOneAndUpdate(
      { _id: projectId },
      { $set: projectData },
      { new: true }).exec();
  }

  public async deleteProject(projectId: string) {
    return await Project.findOneAndDelete({ _id: projectId }).exec();
  }

  public async deleteAllUserProjects(authorId: string, projectIds: string[]) {
    return await Project.deleteMany({
      authorId,
      
      _id: { $in: projectIds }
    })
  }
}

export default new ProjectRepository();
