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
  switch (process.env.NODE_ENV) {
    case "development":
      console.log({ dev })
      return dev
    case "production":
      console.log({ prod })
      return prod
    case "test":
      console.log({ test })
      return test
    default:
      break;
  }
}

export const env = getEnv();
