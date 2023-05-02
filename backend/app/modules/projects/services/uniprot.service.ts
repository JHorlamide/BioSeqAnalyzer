import { AppError } from "../../../common/middleware/appError";
import { httpClient } from "../../../config/httpClient";
import { ERR_MSG } from "../types/constants";

class UniProtService {
  public async getProteinSequence(uniprotId: string) {
    if (!uniprotId) {
      throw new AppError("invalidUniProtId", 400, ERR_MSG.requiredPDBIdError, true);
    }

    const response = await httpClient.get(`/${uniprotId}.fasta`);

    if (response.status === 200) {
      const sequenceArray = response.data.split("\n");
      return sequenceArray.slice(1).join("\n");
    }

    return null;
  }
}

export default new UniProtService();