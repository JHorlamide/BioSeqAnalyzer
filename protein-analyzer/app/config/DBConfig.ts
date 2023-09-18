import mongoose from "mongoose";
import { onError } from "./requestLogger";
import config from "./appConfig";
import { logger } from "./logger";

let count = 0;
mongoose.set("strictQuery", false);

const DBConnectWithRetry = async () => {
  const db_url = config.databaseUrl
  
  try {
    logger.info("Attempting MongoDB connection (will retry if needed)");
    await mongoose.connect(db_url);
    logger.info(`Database connected successfully to ${db_url}...`);
  } catch (error) {
    const retrySeconds = 5;
    logger.error(`MongoDB connection unsuccessful (will retry in #${count} after ${retrySeconds} seconds)`, error);
    setTimeout(DBConnectWithRetry, retrySeconds * 1000);
    onError(error);
    process.exit(1);
  }
}

export default DBConnectWithRetry;