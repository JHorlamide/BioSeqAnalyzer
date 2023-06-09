import { ClientError } from "../../../common/exceptions/clientError";
import { ServerError } from "../../../common/exceptions/serverError";
import { httpClient } from "../../../config/httpClient";
import { ERR_MSG } from "../types/constants";

class UniProtService {
  public async getProteinSequence(uniprotId: string | undefined) {
    if (!uniprotId) {
      throw new ClientError(ERR_MSG.INVALID_UNIPROT_ID);
    }

    try {
      const response = await httpClient.get(`/${uniprotId}.fasta`);
      if (response.status === 200) {
        const sequenceArray = response.data.split("\n");
        return sequenceArray.slice(1).join("\n");
      }

      return null;
    } catch (error: any) {
      console.log({ message: error.response });
      if (error.response && error.response.status) {
        const errorMessage = this.getErrorMessage(error.response.status);
        throw new ClientError(errorMessage);
      } else {
        throw new ServerError(ERR_MSG.REQ_ERROR);
      }
    }
  }

  private getErrorMessage(statusCode: number): string {
    switch (statusCode) {
      case 400:
        return ERR_MSG.INVALID_UNIPROT;
      case 404:
        return ERR_MSG.UNIPROT_NOT_FOUND;
      default:
        return ERR_MSG.REQ_ERROR;
    }
  }
}

export default new UniProtService();