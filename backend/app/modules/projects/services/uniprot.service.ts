import { AppError } from "../../../common/middleware/appError";
import { apiClient } from "../../../config/apiClient";
import { ERR_MSG } from "../types/constants";

class UniProtService {
  public async getProteinSequence(uniprotID: string) {
    if (!uniprotID) {
      throw new AppError("invalidUniProtId", 400, ERR_MSG.requiredPDBIdError, true);
    }

    const response = await apiClient.get(`/${uniprotID}.fasta`);

    if (response.status === 200) {
      const sequenceArray = response.data.split("\n");
      return sequenceArray.slice(1).join("\n");
    }

    return null;
  }
}

export default new UniProtService();