import redis, { RedisClientType, createClient } from 'redis';
import { promisify } from "util";
import { ServerError } from '../../../common/exceptions/serverError';
import { error } from 'console';

const client = createClient();
client.on('error', err => {
  console.log('Redis Client Error', err)
});

export const getCacheData = async (cacheKey: string) => {
  try {
    const cachedData = await client.get(cacheKey) as string;
    return JSON.parse(cachedData);
  } catch (error) {
    console.error('Error retrieving cached data:', error);
    throw new ServerError("Internal Server Error");
  }
}

export const setCacheData = async (cacheKey: string, data: any, expiration = 3600): Promise<void> => {
  try {
    const serializedData = JSON.stringify(data);
    await client.set(cacheKey, serializedData);
  } catch (error) {
    console.error('Error setting cached data:', error);
    throw new ServerError('Internal Server Error');
  }
}

// class RedisCache {
//   private client: RedisClientType;
//   private getAsync: (key: string) => Promise<string | null>;
//   private setAsync: (key: string, value: string, mode: string, duration: number) => Promise<string>;

//   constructor() {
//     this.client = createClient();
//     this.getAsync = promisify(this.client.get).bind(this.client);
//     this.setAsync = promisify(this.client.set).bind(this.client);
//     // this.connectRedis()
//     //   .then(() => console.log('Redis connection established'))
//     //   .catch((err) => {
//     //     console.error('Error connecting to Redis', err);
//     //     throw new ServerError("Error connecting to redis");
//     //   });
//   }

//   async initialize(): Promise<void> {
//     this.client.on('error', err => console.log('Redis Client Error', err));
//     await this.client.connect();
//     // await this.connectRedis();
//   }

//   async getCacheData(cacheKey: string): Promise<any> {
//     try {
//       const cachedData = await this.getAsync(cacheKey) as string;
//       return JSON.parse(cachedData);
//     } catch (error) {
//       console.error('Error retrieving cached data:', error);
//       throw new ServerError("Internal Server Error");
//     }
//   }

//   async setCacheData(cacheKey: string, data: any, expiration = 3600): Promise<void> {
//     try {
//       const serializedData = JSON.stringify(data);
//       await this.setAsync(cacheKey, serializedData, 'EX', expiration);
//     } catch (error) {
//       console.error('Error setting cached data:', error);
//       throw new ServerError('Internal Server Error');
//     }
//   }

//   private async connectRedis(): Promise<void> {
//     await this.client.connect();

//     return new Promise<void>((resolve, reject) => {
//       this.client.on('ready', () => {
//         console.log('Redis connection established');
//         resolve();
//       });

//       this.client.on('error', (err) => {
//         reject(err);
//         throw new ServerError(`Error connecting to Redis: ${error}`)
//       });
//     });
//   }
// }

// const redisCache = new RedisCache();
// redisCache.initialize().catch((err) => {
//   console.error('Error connecting to Redis', err);
//   throw new ServerError("Error connecting to Redis");
// });

// export default redisCache;

  // private async connectRedis(): Promise<void> {
  //   return new Promise<void>((resolve, reject) => {
  //     this.client.on('error', (err) => {
  //       console.error('Redis Client Error', err);
  //       reject(err);
  //     });

  //     this.client.on('ready', () => {
  //       resolve();
  //     });
  //   });
  // }
