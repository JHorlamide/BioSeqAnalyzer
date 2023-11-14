/* Core */
import { Readable } from "stream";

/* Libraries */
import csvParser from "csv-parser";
import { v4 as uuidV4 } from "uuid";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  DeleteObjectCommandOutput
} from "@aws-sdk/client-s3";

/* Application Modules */
import config from "../../config/appConfig";
import { ERR_MSG } from "../types/constants";
import { CSVColumnDataType } from "../types/types";
import { ServerError } from "../../common/exceptions/ApiError";
import { logger } from "../../config/logger";

class FileService {
  s3Client = new S3Client({});

  public async uploadFileToBucket(file: Express.Multer.File) {
    const bucketKey = `protein-analyzer/${uuidV4()}-${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: config.aws.bucketName,
      Key: bucketKey,
      Body: file.buffer,
    });

    try {
      const response = await this.s3Client.send(command);
      return { response, bucketKey };
    } catch (error: any) {
      logger.error(error.message)
      throw new ServerError("Unable to uploaded data to external service - please try again later");
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
      logger.error(error.message);
      throw new ServerError("Unable to fetch data from external service - please try again later");
    }
  }

  public async deleteFile(fileName: string) {
    const command = new DeleteObjectCommand({
      Bucket: config.aws.bucketName,
      Key: fileName
    });

    try {
      const response = await this.s3Client.send(command);
      return response;
    } catch (error: any) {
      logger.error(error.message);
      throw new ServerError("Unable to communicate with external service - please try again later");
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
            logger.error(error.message);
            reject(error);
          });
      });

      return csvData;
    } catch (error: any) {
      logger.error(error.message);
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

export default new FileService;
