/* Libraries */
import { createClient, RedisClientType } from "redis";

/* Application Modules */
import config from "../../config/appConfig";
import { logger } from "../../config/logger";
import { ServerError } from "../../common/exceptions/ApiError";

class RedisCache {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({ url: config.redisUrl });

    this.client.connect?.()
      .then(() => logger.info("Redis connected successfully"))
      .catch((error) => {
        logger.error(error.message);
        throw new ServerError("Error connecting to Redis");
      })
  }

  public async getCacheData(cacheKey: string): Promise<any> {
    try {
      const cachedData = await this.client.get(cacheKey) as string;
      return JSON.parse(cachedData);
    } catch (error) {
      logger.error('Error retrieving cached data: ', error);
      throw new ServerError("Internal Server Error");
    }
  }

  public async setCacheData(cacheKey: string, ttl = 3600, data: any): Promise<void> {
    try {
      const serializedData = JSON.stringify(data);
      await this.client.setEx(cacheKey, ttl, serializedData);
    } catch (error) {
      logger.error('Error setting cached data: ', error);
      throw new ServerError("Internal Server Error");
    }
  }
}

export default new RedisCache();
