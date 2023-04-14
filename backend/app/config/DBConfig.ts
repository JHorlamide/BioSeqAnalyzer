import mongoose from "mongoose";
import { onError } from "./requestLogger";
import { DATABASE_URL } from "./EnvironmentConfig";
import { logger } from "./logger";

let count = 0;
mongoose.set("strictQuery", false);

const DBConnectWithRetry = async () => {
  try {
    logger.info("Attempting MongoDB connection (will retry if needed)");
    await mongoose.connect(DATABASE_URL);
    logger.info(`Database connected successfully to ${DATABASE_URL}...`);
  } catch (error) {
    const retrySeconds = 5;
    logger.error(`MongoDB connection unsuccessful (will retry in #${count} after ${retrySeconds} seconds)`, error);
    setTimeout(DBConnectWithRetry, retrySeconds * 1000);
    onError(error);
    process.exit(1);
  }
}

export default DBConnectWithRetry;