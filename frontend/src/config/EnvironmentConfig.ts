const dev = {
  API_ENDPOINT_URL: import.meta.env.VITE_API_ENDPOINT_URL_DEV
}

const prod = {
  API_ENDPOINT_URL: import.meta.env.VITE_API_ENDPOINT_URL
};

const test = {
  API_ENDPOINT_URL: import.meta.env.VITE_API_ENDPOINT_URL_DEV
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
