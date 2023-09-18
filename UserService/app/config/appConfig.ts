
import dotenv from 'dotenv';
dotenv.config();

const config = {
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
}

export default config;