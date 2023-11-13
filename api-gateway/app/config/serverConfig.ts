import dotenv from 'dotenv';
dotenv.config();

const config = {
  jwt: {
    secret: String(process.env.JWT_SECRETE),
    tokenExpiration: String(process.env.TOKEN_EXPIRATION)
  },

  port: process.env.PORT,
  prefix: "/api",
  node_env: String(process.env.NODE_ENV),

  /*  Service Base URLs */
  USER_BASE_URL: String(process.env.USER_BASE_URL),
  PROTEIN_BASE_URL: String(process.env.PROTEIN_BASE_URL),
  DNA_SEQUENCE_BASE_URL: String(process.env.DNA_SEQUENCE_BASE_URL),
  allowedOrigin: String(process.env.ALLOWED_ORIGIN)
}

export default config;