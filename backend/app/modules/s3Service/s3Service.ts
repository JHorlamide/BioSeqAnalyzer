import { S3 } from "aws-sdk";
import { v4 as uuidV4 } from "uuid";
import config from "../../config/appConfig";
import { PutObjectRequest } from "aws-sdk/clients/s3";

export const s3Service = async (file: Express.Multer.File) => {
  const s3Client = new S3();
  const { aws } = config;

  const param: PutObjectRequest = {
    Bucket: aws.bucketName,
    Key: `upload/${uuidV4()}-${file.originalname}`,
    Body: file.buffer
  }

  return s3Client.upload(param).promise();
}