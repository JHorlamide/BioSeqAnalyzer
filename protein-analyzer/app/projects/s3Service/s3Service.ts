/* Libraries */
import { S3 } from "aws-sdk";
import { v4 as uuidV4 } from "uuid";
import { GetObjectCommand, PutObjectCommand, S3 as S3V2 } from "@aws-sdk/client-s3";
import { GetObjectRequest } from "aws-sdk/clients/s3";

/* Application Modules */
import config from "../../config/appConfig";
import { ServerError } from "../../common/exceptions/ApiError";

class S3Service {
  private aws = config.aws;

  private s3Client = new S3();

  s3ClientV2 = new S3V2({
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    endpoint: "https://nyc3.digitaloceanspaces.com",
    region: "us-east-1",
    credentials: {
      accessKeyId: config.SPACES_KEY,
      secretAccessKey: config.SPACES_SECRET
    }
  })

  public async uploadFileToBucket(file: Express.Multer.File) {
    try {
      const bucketParams = {
        Bucket: this.aws.bucketName,
        Key: `upload/${uuidV4()}-${file.originalname}`,
        Body: file.buffer,
      };

      const data = await this.s3ClientV2.send(new PutObjectCommand(bucketParams));
      return data;
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  public async downloadFileFromBucket(file: Express.Multer.File) {
    try {
      const bucketParams = {
        Bucket: this.aws.bucketName,
        Key: `upload/${uuidV4()}-${file.originalname}`,
      };

      const response = await this.s3ClientV2.send(new GetObjectCommand(bucketParams));
      const data = await this.streamToString(response.Body);
      return data;
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  // Function to turn the file's body into a string.
  private streamToString(stream: any) {
    const chunks: any[] = [];
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk: any) => chunks.push(Buffer.from(chunk)));
      stream.on('error', (error: any) => reject(error));
      stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
  };

  public uploadFile(file: Express.Multer.File) {
    const bucketParams = {
      Bucket: this.aws.bucketName,
      Key: `upload/${uuidV4()}-${file.originalname}`,
      Body: file.buffer,
    };

    try {
      return this.s3Client.upload(bucketParams).promise();
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  public getFile(projectFileKey: string) {
    const bucketParams: GetObjectRequest = {
      Bucket: this.aws.bucketName,
      Key: projectFileKey
    }

    try {
      // Retrieve the CSV file from S3
      return this.s3Client.getObject(bucketParams).createReadStream();
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
}

export default new S3Service;
