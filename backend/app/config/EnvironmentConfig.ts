
import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV;
export const DATABASE_URL = process.env.DATABASE_URL as string;
export const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION as string
export const JWT_SECRETE = process.env.JWT_SECRETE as string;
export const UNIPROT_BASE_URL = process.env.UNIPROT_BASE_URL;
export const PDB_BASE_URL = process.env.PDB_BASE_URL;
export const TREBLE_API_KEY = process.env.TREBLLE_API_KEY;
export const TREBLLE_PROJECT_ID = process.env.TEBLLE_PROJECT_ID;