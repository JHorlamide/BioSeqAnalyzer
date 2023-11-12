import dotenv from 'dotenv';
dotenv.config();

const config = {
  jwt: {
    secret: process.env.JWT_SECRETE as string,
    tokenExpiration: process.env.TOKEN_EXPIRATION as string
  },

  port: process.env.PORT,
  prefix: "/api",
  node_env: process.env.NODE_ENV,

  /*  Service Base URLs */
  USER_BASE_URL: process.env.USER_BASE_URL as string,
  PROTEIN_BASE_URL: process.env.PROTEIN_BASE_URL as string,
  DNA_SEQUENCE_BASE_URL: process.env.DNA_SEQUENCE_BASE_URL as string
}

export default config;