
import dotenv from 'dotenv';
dotenv.config();

const config = {
  allowedOrigin: {
    get baseUrl() {
      if (process.env.NODE_ENV === "production") {
        return process.env.BASE_URL_LIVE as string;
      }

      return process.env.BASE_URL_DEV as string;
    }
  },

  treble: {
    apiKey: process.env.TREBLLE_API_KEY,
    projectId: process.env.TREBLLE_PROJECT_ID
  },

  aws: {
    region: process.env.AWS_REGION,
    secrete: process.env.AWS_SECRET as string,
    accessKey: process.env.AWS_ACCESS_KEY_ID as string,
    bucketName: process.env.AWS_BUCKET_NAME as string,
  },

  port: process.env.PORT,
  prefix: "/api",
  node_env: process.env.NODE_ENV,
  databaseUrl: process.env.NODE_ENV !== "test"
    ? process.env.DATABASE_URL as string
    : process.env.TEST_DATABASE_URL as string,
  uniprotBaseUrl: process.env.UNIPROT_BASE_URL,
  pdbBaseUrl: process.env.PDB_BASE_URL,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // Maximum file size of 5MB
  summaryCacheKey: "summary-csv-data",
  topVariantCacheKey: "top-variant-csv-data",
  scoreDistributionKey: "score-distribution-data",
  cached_ttl: 4600,
  redisUrl: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  SPACES_KEY: process.env.DO_SPACES_KEY as string,
  SPACES_SECRET: process.env.DO_SPACES_SECRET as string,
}

export default config;
