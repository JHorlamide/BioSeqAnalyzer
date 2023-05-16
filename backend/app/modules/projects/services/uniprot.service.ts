import { ClientError } from "../../../common/exceptions/clientError";
import { httpClient } from "../../../config/httpClient";
import { ERR_MSG } from "../types/constants";

class UniProtService {
  public async getProteinSequence(uniprotId: string | undefined) {
    if (!uniprotId) {
      throw new ClientError(ERR_MSG.PDB_ID_REQUIRED);
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