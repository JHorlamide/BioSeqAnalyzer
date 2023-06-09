import { createClient, RedisClientType } from "redis";
import { ServerError } from '../../../common/exceptions/serverError';

// const redisUrl = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
const redisUrl = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;

class RedisCache {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({ url: redisUrl });
    this.client.connect()
      .then(() => console.log("Redis connected successfully"))
      .catch((error) => {
        console.log("Redis connection error: ", error);
        throw new ServerError("Error connecting to Redis", error);
      })
  }

  public async getCacheData(cacheKey: string): Promise<any> {
    try {
      const cachedData = await this.client.get(cacheKey) as string;
      return JSON.parse(cachedData);
    } catch (error) {
      console.error('Error retrieving cached data:', error);
      throw new ServerError("Internal Server Error", error);
    }
  }

  public async setCacheData(cacheKey: string, ttl = 3600, data: any): Promise<void> {
    try {
      const serializedData = JSON.stringify(data);
      await this.client.setEx(cacheKey, ttl, serializedData);
    } catch (error) {
      console.error('Error setting cached data:', error);
      throw new ServerError("Internal Server Error", error);
    }
  }

  private async initializeRedis() {
    try {
      await this.client.connect();
    } catch (error: any) {
      console.error(error.message);
      throw new ServerError(error.message, error);
    }
  }
}

export default new RedisCache();