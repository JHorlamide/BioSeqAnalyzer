import { S3 } from "aws-sdk";
import { GetObjectRequest } from "aws-sdk/clients/s3";
import { v4 as uuidV4 } from "uuid";
import config from "../../../config/appConfig";
import { ServerError } from "../../../common/exceptions/serverError";
// import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

class S3Service {
  private aws = config.aws;
  private s3Client = new S3();

  public uploadFile(file: any) { //Express.Multer.File
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
// private s3Config = {
//   accessKeyId: this.aws.accessKey,
//   secretAccessKey: this.aws.secrete,
// };

// private s3Client2 = new S3Client(this.s3Config);
