/* Application Modules */
import { httpClient } from "../../config/httpClient";
import { ERR_MSG } from "../types/constants";
import { ClientError, ServerError } from "../../common/exceptions/ApiError";

class UniProtService {
  public async getProteinSequence(uniprotId: string | undefined) {
    if (!uniprotId) {
      throw new ClientError(ERR_MSG.INVALID_UNIPROT_ID);
    }

    try {
      const response = await httpClient.get(`/${uniprotId}.fasta`);

      if (response.status === 200) {
        return response.data;
      }

      return null;
    } catch (error: any) {
      if (error.response && error.response.status) {
        const errorMessage = this.getErrorMessage(error.response.status);
        throw new ClientError(errorMessage);
      }

      throw new ServerError("Unable to fetch data from external service - please try again later");
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