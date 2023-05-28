import { S3 } from "aws-sdk";
import { v4 as uuidV4 } from "uuid";
import config from "../../../config/appConfig";
import { PutObjectRequest, GetObjectRequest } from "aws-sdk/clients/s3";


class S3Service {
  private s3Client = new S3();
  private aws = config.aws;

  public uploadFile(file: Express.Multer.File) {
    const param: PutObjectRequest = {
      Bucket: this.aws.bucketName,
      Key: `upload/${uuidV4()}-${file.originalname}`,
      Body: file.buffer
    }

    return this.s3Client.upload(param).promise();
  }

  public getFile(projectFileKey: string) {
    const params: GetObjectRequest = {
      Bucket: this.aws.bucketName,
      Key: projectFileKey
    }

    // Retrieve the CSV file from S3
    return this.s3Client.getObject(params).createReadStream();
  }
}

export default new S3Service;

// export const s3Service = async (file: Express.Multer.File) => {
//   const s3Client = new S3();
//   const { aws } = config;

//   const param: PutObjectRequest = {
//     Bucket: aws.bucketName,
//     Key: `upload/${uuidV4()}-${file.originalname}`,
//     Body: file.buffer
//   }

//   return s3Client.upload(param).promise();
// }
