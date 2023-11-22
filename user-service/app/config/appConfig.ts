
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

  jwt: {
    secret: process.env.JWT_SECRETE as string,
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
    tokenExpiration: process.env.TOKEN_EXPIRATION as string
  },

  port: process.env.PORT,
  prefix: "/api",
  node_env: process.env.NODE_ENV,
  databaseUrl: process.env.MONGO_DATABASE_URL as string,
  tempPassword: process.env.TEMP_PASSWORD as string,
  userEmail: process.env.NODEMAILER_USER as string,
  password: process.env.PASSWORD as string,
}

export default config;