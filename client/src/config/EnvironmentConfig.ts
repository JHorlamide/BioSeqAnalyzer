const dev = {
  CLIENT_BASE_URL: import.meta.env.VITE_CLIENT_URL,
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  USER_API_ENDPOINT_URL: import.meta.env.VITE_USER_API_ENDPOINT_URL_DEV,
  PROTEIN_API_ENDPOINT_URL: import.meta.env.VITE_PROTEIN_API_ENDPOINT_URL_DEV,
  DNA_SEQUENCE_API_ENDPOINT_URL: import.meta.env.VITE_DNA_SEQUENCE_API_ENDPOINT_URL_DEV
}

const prod = {
  CLIENT_BASE_URL: import.meta.env.VITE_CLIENT_URL,
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  USER_API_ENDPOINT_URL: import.meta.env.VITE_API_ENDPOINT_URL,
  PROTEIN_API_ENDPOINT_URL: import.meta.env.VITE_API_ENDPOINT_URL,
  DNA_SEQUENCE_API_ENDPOINT_URL: import.meta.env.VITE_API_ENDPOINT_URL,
};

const test = {
  CLIENT_BASE_URL: import.meta.env.VITE_CLIENT_URL,
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  USER_API_ENDPOINT_URL: import.meta.env.VITE_USER_API_ENDPOINT_URL_DEV,
  PROTEIN_API_ENDPOINT_URL: import.meta.env.VITE_PROTEIN_API_ENDPOINT_URL_DEV,
  DNA_SEQUENCE_API_ENDPOINT_URL: import.meta.env.VITE_DNA_SEQUENCE_API_ENDPOINT_URL_DEV
};

const getEnv = () => {
  switch (import.meta.env.VITE_NODE_ENV) {
    case "development":
      return dev
    case "production":
      return prod
    case "test":
      return test
    default:
      break;
  }
}

export const env = getEnv();
