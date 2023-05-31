import { createClient, RedisClientType } from "redis";
import { ServerError } from '../../../common/exceptions/serverError';
import { promisify } from "util";

console.log({ redisPort: process.env.REDIS_PORT });

// Construct the Redis URL using the environment variables
const redisUrl = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;

export const getCacheData = async (cacheKey: string) => {
  const client = createClient();

  try {
    const cachedData = await client.get(cacheKey) as string;
    return JSON.parse(cachedData);
  } catch (error) {
    console.error('Error retrieving cached data:', error);
    throw new ServerError("Internal Server Error");
  }
}

export const setCacheData = async (cacheKey: string, data: any, expiration = 3600): Promise<void> => {
  const client = createClient();

  try {
    const serializedData = JSON.stringify(data);
    await client.set(cacheKey, serializedData);
  } catch (error) {
    console.error('Error setting cached data:', error);
    throw new ServerError('Internal Server Error');
  }
}

class RedisCache {
  private client: RedisClientType;
  private getAsync: (key: string) => Promise<string | null>;
  private setAsync: (key: string,  ttl: number, value: string) => Promise<string>;

  constructor() {
    this.client = createClient({ url: redisUrl });
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.setEx).bind(this.client);

    this.client.on("connect", () => {
      console.log(`Redis connection established`);
    });

    this.client.on("error", (error) => {
      console.error(`Redis error, service degraded: ${error}`);
    });
  }

  public async getCacheData2(cacheKey: string): Promise<any> {
    try {
      const cachedData = await this.getAsync(cacheKey) as string;
      return JSON.parse(cachedData);
    } catch (error) {
      console.error('Error retrieving cached data:', error);
      throw new Error('Internal Server Error');
    }
  }

  public async setCacheData2(cacheKey: string, ttl = 3600, data: any): Promise<void> {
    try {
      const serializedData = JSON.stringify(data);
      await this.setAsync(cacheKey, ttl, serializedData);
    } catch (error) {
      console.error('Error setting cached data:', error);
      throw new Error('Internal Server Error');
    }
  }

  public async getCacheData(cacheKey: string): Promise<any> {
    try {
      const cachedData = await this.client.get(cacheKey) as string;
      return JSON.parse(cachedData);
    } catch (error) {
      console.error('Error retrieving cached data:', error);
      throw new ServerError("Internal Server Error");
    }
  }

  public async setCacheData(
    cacheKey: string,
    data: any,
    expiration = 3600): Promise<void> {
    try {
      const serializedData = JSON.stringify(data);
      await this.client.setEx(cacheKey, expiration, serializedData);
    } catch (error) {
      console.error('Error setting cached data:', error);
      throw new ServerError('Internal Server Error');
    }
  }
}

export default new RedisCache();