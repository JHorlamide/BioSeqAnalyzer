
import dotenv from 'dotenv';
dotenv.config();

const config = {
  jwt: {
    secret: process.env.JWT_SECRETE as string,
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
    token_expiration: process.env.TOKEN_EXPIRATION as string
  },

  treble: {
    api_key: process.env.TREBLLE_API_KEY,
    project_id: process.env.TREBLLE_PROJECT_ID
  },

  port: process.env.PORT,
  prefix: "/api",
  node_env: process.env.NODE_ENV,
  database_url: process.env.DATABASE_URL as string,
  uniprot_base_url: process.env.UNIPROT_BASE_URL,
  pdb_base_url: process.env.PDB_BASE_URL,
}

export default config;