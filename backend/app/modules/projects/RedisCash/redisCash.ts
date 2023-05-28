import { RedisClientType, createClient } from 'redis';
import { promisify } from "util";

class RedisCache {
  private client: RedisClientType;
  private getAsync: (key: string) => Promise<string | null>;
  private setAsync: (key: string, value: string, mode: string, duration: number) => Promise<string>;

  constructor() {
    this.client = createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
  }

  async getCacheData(cacheKey: string): Promise<any> {
    try {
      const cachedData = await this.getAsync(cacheKey);
      return JSON.parse(cachedData as string);
    } catch (error) {
      console.error('Error retrieving cached data:', error);
      throw new Error('Internal Server Error');
    }
  }

  async setCacheData(cacheKey: string, data: any, expiration = 3600): Promise<void> {
    try {
      const serializedData = JSON.stringify(data);
      await this.setAsync(cacheKey, serializedData, 'EX', expiration);
    } catch (error) {
      console.error('Error setting cached data:', error);
      throw new Error('Internal Server Error');
    }
  }
}

export default new RedisCache();
