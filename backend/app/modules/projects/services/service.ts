import { PDB_BASE_URL } from "../../../config/EnvironmentConfig";
import projectRepository from "../repository/repository";
import { IProject } from "../types/types";
import { ERR_MSG } from "../types/constants";
import { AppError } from "../../../common/middleware/appError";

class ProjectService {
  public createProject(project: IProject) {

  }

  private async getProteinSequence(uniprotID: string) {
    if (!uniprotID) {
      throw new AppError("InvalidUniprotIdError", 400, ERR_MSG.invalidUniprotIdError, true);
    }
  }

  private getProteinPDBID(proteinPDBID: string) {
    if (!proteinPDBID) {
      throw new AppError("InvalidProteinPDBIdError", 400, ERR_MSG.requiredPDBIdError, true);
    }

    return `${PDB_BASE_URL}/${proteinPDBID}`
  }
}

export default new ProjectService();
