/* Core */
import internal, { Readable } from "stream";

/* Libraries */ 
import csvParser from "csv-parser";

/* Application Modules */ 
import { CSVColumnDataType } from "../types/types";
import { ServerError } from "../../common/exceptions/customError";
import { ERR_MSG } from "../types/constants";

class FileService {
  public async parseCSVFile(fileBuffer: Buffer): Promise<CSVColumnDataType[]> {
    try {
      const csvData: CSVColumnDataType[] = await new Promise((resolve, reject) => {
        const readableStream = Readable.from(fileBuffer.toString());
        const results: any[] = [];
        readableStream
          .pipe(csvParser())
          .on("data", (data: any) => {
            results.push(data);
          })
          .on("end", () => {
            resolve(results);
          })
          .on("error", (error: Error) => {
            reject(error);
          });
      });

      return csvData;
    } catch (error: any) {
      throw new ServerError(`${ERR_MSG.PARSE_CSV_FAILED}: ${error.message}`);
    }
  }

  public async parseS3ReadStream(s3ReadStream: internal.Readable) {
    try {
      const csvData: CSVColumnDataType[] = await new Promise((resolve, reject) => {
        const results: CSVColumnDataType[] = [];
        s3ReadStream
          .pipe(csvParser())
          .on("data", (data: any) => {
            results.push(data);
          })
          .on("end", () => {
            resolve(results);
          })
          .on("error", (error: Error) => {
            reject(error);
          });
      });

      return csvData;
    } catch (error: any) {
      throw new ServerError(`${ERR_MSG.PARSE_CSV_FAILED}: ${error.message}`);
    }
  }

  public validateCSVStructure(csvData: CSVColumnDataType[]): boolean {
    const expectedColumns = ['sequence', 'fitness', 'muts'];
    const hasExpectedColumns = csvData.length > 0 && expectedColumns.every((column) => csvData[0].hasOwnProperty(column));
    const hasExpectedWildTypeSequence = csvData.some((row) => row.muts === 'WT');

    return hasExpectedColumns && hasExpectedWildTypeSequence;
  }
}

export default new FileService();
