
import dotenv from 'dotenv';
dotenv.config();

const config = {
  jwt: {
    secret: process.env.JWT_SECRETE as string,
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
    tokenExpiration: process.env.TOKEN_EXPIRATION as string
  },

  treble: {
    apiKey: process.env.TREBLLE_API_KEY,
    projectId: process.env.TREBLLE_PROJECT_ID
  },

  aws: {
    secrete: process.env.AWS_SECRET as string,
    accessKey: process.env.AWS_ACCESS_KEY_ID as string,
    bucketName: process.env.AWS_BUCKET_NAME as string,
  },

  port: process.env.PORT,
  prefix: "/api",
  node_env: process.env.NODE_ENV,
  databaseUrl: process.env.DATABASE_URL as string,
  uniprotBaseUrl: process.env.UNIPROT_BASE_URL,
  pdbBaseUrl: process.env.PDB_BASE_URL,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // Maximum file size of 5MB
  summaryCacheKey: "summary-csv-data",
  topVariantCacheKey: "top-variant-csv-data"
}

export default config;