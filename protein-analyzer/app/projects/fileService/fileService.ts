/* Core */
import { Readable } from "stream";

/* Libraries */
import csvParser from "csv-parser";
import { v4 as uuidV4 } from "uuid";
import { GetObjectCommand, PutObjectCommand, S3, S3Client } from "@aws-sdk/client-s3";

/* Application Modules */
import config from "../../config/appConfig";
import { ERR_MSG } from "../types/constants";
import { CSVColumnDataType } from "../types/types";
import { ServerError } from "../../common/exceptions/ApiError";
import { logger } from "../../config/logger";

class S3Service {
  s3Client = new S3Client({});

  public async uploadFileToBucket(file: Express.Multer.File) {
    const bucketKey = `upload/${uuidV4()}-${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: config.aws.bucketName,
      Key: bucketKey,
      Body: file.buffer,
    });

    try {
      const uploadResponse = await this.s3Client.send(command);
      return { uploadResponse, bucketKey }
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  public async downloadAndParseFileFromBucket(fileName: string) {
    const command = new GetObjectCommand({
      Bucket: config.aws.bucketName,
      Key: fileName,
    });

    try {
      const response = await this.s3Client.send(command);
      return await this.parseS3ReadStream(response.Body as Readable);
    } catch (error: any) {
      logger.info(error.message)
      throw new ServerError(error.message);
    }
  }

  public async parseS3ReadStream(s3Stream: Readable) {
    try {
      const csvData: CSVColumnDataType[] = await new Promise((resolve, reject) => {
        const results: CSVColumnDataType[] = [];
        s3Stream
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

  public validateCSVStructure(csvData: CSVColumnDataType[]): boolean {
    const expectedColumns = ['sequence', 'fitness', 'muts'];
    const hasExpectedColumns = csvData.length > 0 && expectedColumns.every((column) => {
      return csvData[0].hasOwnProperty(column);
    });
    const hasExpectedWildTypeSequence = csvData.some((row) => row.muts === 'WT');

    return hasExpectedColumns && hasExpectedWildTypeSequence;
  }
}

export default new S3Service;
